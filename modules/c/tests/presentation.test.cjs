const test=require('node:test'),assert=require('node:assert/strict');
const P=require('../assets/yudu-presentation.js'),D=require('../assets/yudu-data.js');
test('spoken movies and picture dialogue use the same character name rules',()=>{
 for(const node of D.nodes.filter(n=>n.mode==='dialogue'))assert.equal(P.speaker(node)?.name,node.speaker);
 assert.equal(P.speaker({mode:'dialogue',speaker:'陆生'})?.name,'陆生');
 assert.deepEqual(P.speaker({mode:'thought',speaker:'心声'}),{name:'小满',kind:'心声'});
 for(const node of D.nodes.filter(n=>n.end||n.checkpoint||['fact','observation'].includes(n.mode)))assert.equal(P.speaker(node),null);
});
test('changed video and still URLs refresh cached media without changing data paths or embedded assets',()=>{
 assert.equal(P.media('assets/yudu/liang-home-v013.mp4'),'assets/yudu/liang-home-v013.mp4?v=017');
 assert.equal(P.media('assets/yudu/liang-home-first-v013.png'),'assets/yudu/liang-home-first-v013.png?v=017');
 assert.equal(P.media('assets/mark.svg'),'assets/mark.svg');
 assert.equal(P.media('assets/test.png',{'assets/test.png':'data:image/png;base64,x'}),'data:image/png;base64,x');
});
