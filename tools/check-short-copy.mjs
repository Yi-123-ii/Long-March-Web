import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
let count=0;
function short(text,where){if(typeof text!=='string')return;count++;if(text.includes('。'))throw Error(`${where}：短文案含句号：${text}`);}
const game=require('../modules/c/assets/yudu-data.js');
const presentation=require('../modules/c/assets/yudu-presentation.js');
// Narrative text, letters and source-confirmed subtitles are bodies, not UI microcopy.
// Check the button text actually rendered without changing approved dialogue or caption timing.
for(const node of game.nodes){for(const key of ['title','replayLabel'])short(node[key],`${node.id}.${key}`);for(const choice of node.choices||[])short(presentation.choiceLabel(choice.label),`${node.id}.choice`);}
for(const chapter of game.chapters)for(const key of ['name','title','ending','summary','button'])short(chapter[key],`${chapter.id}.${key}`);
for(const [id,text]of Object.entries(game.memories))short(text,`memory.${id}`);
short(game.historicalNote,'journey.historicalNote');
const context={window:{}};vm.createContext(context);vm.runInContext(await readFile(path.join(root,'data/events.js'),'utf8'),context);
for(const event of context.window.LM_EVENTS){for(const key of ['title','summary','location','era'])short(event[key],`event.${event.id}.${key}`);for(const item of event.timeline)short(item.text,`event.${event.id}.timeline`);short(event.image.caption,`event.${event.id}.caption`);}
vm.runInContext(await readFile(path.join(root,'data/postal-designs.js'),'utf8'),context);
for(const items of Object.values(context.window.LM_POSTAL))for(const item of items){short(item.name,`postal.${item.id}.name`);short(item.caption,`postal.${item.id}.caption`);}
const stories=JSON.parse(await readFile(path.join(root,'data/v43-stories.json'),'utf8'));
for(const group of Object.values(stories))if(Array.isArray(group))for(const story of group)for(const key of ['name','title','identity','teaser','theme'])short(story[key],`story.${story.id}.${key}`);
// Longer writing prompts and historical/story bodies are paragraphs, with normal punctuation.
// UI script literals remain covered even for alerts that need uncommon failure conditions.
const files=['assets/js/home.js','assets/js/site.js','assets/js/site-nav.js','assets/js/chronicle.js','assets/js/storage.js','assets/js/letter-backup.js','assets/js/post-office.js','assets/js/inheritance-v43.js','modules/c/assets/yudu-game.js','modules/c/assets/journey-return.js','modules/c/assets/journey-intro.js','modules/c/assets/journey-opening.js','modules/c/assets/atlas-map.js','modules/c/assets/site-integration.js'];
for(const file of files){const source=await readFile(path.join(root,file),'utf8');for(const match of source.matchAll(/"(?:[^"\\]|\\[\s\S])*"|'(?:[^'\\]|\\[\s\S])*'/g)){const text=match[0].slice(1,-1);if(/[\u3400-\u9fff]/u.test(text)&&!(file==='assets/js/post-office.js'&&text.length>=100))short(text,`${file}:${source.slice(0,match.index).split('\n').length}`);}}
console.log(`短文案检查通过：${count} 项，覆盖纪事摘要、六组人物与实践导语、剧情按钮及界面提示；长篇剧情和原声字幕保留自然分句`);
