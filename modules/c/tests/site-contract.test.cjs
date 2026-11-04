const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../../..'),mapping=require('../assets/site-integration.js'),D=require('../assets/yudu-data.js');
test('C chapters link to existing B event IDs without inventing IDs',()=>{const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'data/events.js'),'utf8'),context);const ids=context.window.LM_EVENTS.map(e=>e.id);for(const ch of D.chapters){assert(ids.includes(mapping[ch.id]),ch.id);}assert.equal(mapping.snow,'jiajin');assert.equal(mapping.grass,'grassland');assert.equal(mapping.epilogue,'huishi');});
test('public journey entry and all navigation bars reach the isolated C module directly',()=>{const redirect=fs.readFileSync(path.join(root,'journey.html'),'utf8');assert(redirect.includes('modules/c/journey.html'));for(const file of ['index.html','chronicle.html','post-office.html','inheritance.html'])assert.match(fs.readFileSync(path.join(root,file),'utf8'),/<nav[^>]*aria-label="主导航"[\s\S]*?href="modules\/c\/journey.html"/);});
test('C only writes its own save key and never clears the origin storage',()=>{const core=fs.readFileSync(path.join(__dirname,'../assets/yudu-core.js'),'utf8'),game=fs.readFileSync(path.join(__dirname,'../assets/yudu-game.js'),'utf8');assert(core.includes('longmarch-c:companion:v1'));assert(!/localStorage\s*\.\s*clear\s*\(/.test(core+game));assert(!/longmarch-b:/.test(core+game));});

test('each ending links to its own history and letter context even when the map selects the next chapter',()=>{
 const listeners={},links=Object.fromEntries(['chapter-facts','ending-history','ending-post'].map(id=>[id,{}]));links.ending={hidden:false,dataset:{chapter:'snow'}};
 const context={URL,document:{baseURI:'https://example.test/Long-March-Web/modules/c/journey.html',querySelectorAll:()=>[],getElementById:id=>links[id],addEventListener:()=>{}},window:{JourneyReturn:require('../assets/journey-return.js'),AtlasMap:{selected:()=> 'yudu'},addEventListener:(name,fn)=>{listeners[name]=fn;}}};
 vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/site-integration.js'),'utf8'),context);
 assert.equal(new URL(links['ending-history'].href).hash,'#event=jiajin');
 for(const ch of D.chapters){
  listeners['journey:station-selected']({detail:'epilogue'});listeners['journey:chapter-ended']({detail:ch.id});
  const history=new URL(links['ending-history'].href),post=new URL(links['ending-post'].href);
  assert.equal(history.pathname,'/Long-March-Web/chronicle.html');assert.equal(history.hash,'#event='+mapping[ch.id]);
  assert.equal(post.pathname,'/Long-March-Web/post-office.html');assert.equal(post.searchParams.get('event'),mapping[ch.id]);assert.equal(post.hash,'#letter-form');
  for(const url of [history,post]){assert.equal(url.searchParams.get('from'),'journey');assert.equal(url.searchParams.get('view'),'story');}
 }
 assert(fs.readFileSync(path.join(root,'post-office.html'),'utf8').includes('id="letter-form"'));
});
