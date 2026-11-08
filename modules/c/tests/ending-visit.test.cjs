const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const R=require('../assets/journey-return.js'),base='https://example.test/Long-March-Web/',script=base+'modules/c/assets/journey-return.js?v=023';
const source=name=>fs.readFileSync(path.join(__dirname,'../assets',name),'utf8');
function storage(entries=[]){const map=new Map(entries);return {getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};}

test('only visible station-ending actions or the map facts entry create a return visit',()=>{
 const callbacks={},session=storage(),links=Object.fromEntries(['chapter-facts','ending-history','ending-post','ending','story-screen'].map(id=>[id,{id}]));
 links.ending.hidden=false;links.ending.dataset={chapter:'snow'};links['story-screen'].hidden=false;
 const context={URL,Date,Math,sessionStorage:session,CustomEvent:class{constructor(type){this.type=type;}},document:{baseURI:base+'modules/c/journey.html',querySelectorAll:()=>[],getElementById:id=>links[id],addEventListener:(name,fn)=>callbacks[name]=fn},window:{JourneyReturn:R,AtlasMap:{selected:()=> 'yudu'},crypto:{randomUUID:()=> 'visit-1'},addEventListener(){},dispatchEvent:event=>{assert.equal(event.type,'journey:leaving-site');session.setItem(R.KEY,'saved snapshot');}}};
 vm.createContext(context);vm.runInContext(source('site-integration.js'),context);
 assert.equal(new URL(links['chapter-facts'].href).searchParams.get('from'),null);
 const click=a=>callbacks.click({target:{closest:()=>a}});
 click(links['ending-history']);assert.equal(session.getItem(R.VISIT_KEY),'visit-1');assert.equal(new URL(links['ending-history'].href).searchParams.get('journeyReturn'),'visit-1');
 click(links['chapter-facts']);assert.equal(session.getItem(R.VISIT_KEY),null);assert.equal(new URL(links['chapter-facts'].href).searchParams.get('from'),null);
 links.ending.hidden=true;click(links['ending-post']);assert.equal(session.getItem(R.VISIT_KEY),null);assert.equal(new URL(links['ending-post'].href).searchParams.get('from'),null);
 links['story-screen'].hidden=true;click(links['chapter-facts']);
 assert.equal(session.getItem(R.VISIT_KEY),'visit-1');assert.equal(session.getItem(R.KEY),'saved snapshot');
 assert.equal(new URL(links['chapter-facts'].href).searchParams.get('view'),'map');
 assert.equal(new URL(links['chapter-facts'].href).searchParams.get('journeyReturn'),'visit-1');
});

function visit(href,token='visit-1',withArticle=false){
 const events={},session=storage(token?[[R.VISIT_KEY,token],[R.KEY,'snapshot']]:[]),classes=new Set(),nodes=[];
 const links=['chronicle.html','post-office.html?event=jiajin#letter-form','index.html','journey.html'].map(p=>({href:base+p,target:''}));
 const body={append:el=>nodes.push(el),classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)}};
 const articleEvents={},redirects=[],article={addEventListener:(type,fn)=>articleEvents[type]=fn};
 const context={URL,location:{href,replace:url=>redirects.push(url)},sessionStorage:session,MutationObserver:class{observe(){}},document:{currentScript:{src:script},head:{append(){}},body,createElement:tag=>({tag,children:[],append(...items){this.children.push(...items);},setAttribute(){},remove(){this.removed=true;}}),querySelector:selector=>withArticle&&selector==='#event-dialog'?article:null,querySelectorAll:selector=>selector==='a[href]'?links:[],addEventListener:(type,fn)=>events[type]=fn},window:{addEventListener:(type,fn)=>events[type]=fn}};
 vm.createContext(context);vm.runInContext(source('journey-return.js'),context);
 return {events,session,classes,nodes,links,articleEvents,redirects,click:a=>events.click?.({target:{closest:()=>a}})};
}

test('article close and Escape never navigate to the game; the explicit bottom link returns to the saved map',()=>{
 for(const href of [base+'chronicle.html#event=wuqi',base+'chronicle.html?from=journey&view=story&journeyReturn=visit-1#event=wuqi',base+'chronicle.html?from=journey&view=map&journeyReturn=visit-1#event=wuqi']){
  const v=visit(href,'visit-1',true);assert.equal(v.articleEvents.close,undefined);assert.equal(v.redirects.length,0);
  assert.equal(v.articleEvents.click,undefined);assert.equal(v.articleEvents.cancel,undefined);
 }
 const v=visit(base+'chronicle.html?from=journey&view=map&journeyReturn=visit-1#event=wuqi','visit-1',true);
 assert.equal(v.nodes[0].children[0].textContent,'继续浏览长征纪事板块');
 assert.equal(v.nodes[0].children[1].textContent,'返回游戏地图');
 assert.equal(v.nodes[0].children[1].href,base+'modules/c/journey.html?resume=map');
 assert.equal(v.session.getItem(R.KEY),'snapshot');
});
test('normal entry from home has no return banner despite a saved unfinished visit',()=>{
 for(const href of [base+'chronicle.html',base+'post-office.html',base+'chronicle.html?from=journey&view=map']){
  const v=visit(href);assert.equal(v.nodes.length,0);assert.equal(v.classes.has('c-game-visitor'),false);
 }
});

test('dismissing the bottom hint preserves progress without changing article close behavior',()=>{
 const v=visit(base+'chronicle.html?from=journey&view=map&journeyReturn=visit-1#event=zunyi','visit-1',true);
 const dock=v.nodes[0];dock.children[2].onclick();
 assert(dock.removed);assert(!v.classes.has('c-game-visitor'));
 assert.equal(v.session.getItem(R.VISIT_KEY),'visit-1');assert.equal(v.session.getItem(R.KEY),'snapshot');
 assert.equal(v.articleEvents.click,undefined);assert.equal(v.articleEvents.close,undefined);
 assert.deepEqual(v.redirects,[]);
});
test('a direct ending visit carries between history and mail, but home exit and browser back remove the banner',()=>{
 const v=visit(base+'chronicle.html?from=journey&view=story&journeyReturn=visit-1');assert.equal(v.nodes.length,1);
 v.click(v.links[1]);assert.equal(v.session.getItem(R.VISIT_KEY),'visit-1');assert.equal(new URL(v.links[1].href).searchParams.get('journeyReturn'),'visit-1');
 v.click(v.links[2]);assert.equal(v.session.getItem(R.VISIT_KEY),null);assert.equal(v.session.getItem(R.KEY),null);
 v.events.pageshow();assert(v.nodes[0].removed);assert(!v.classes.has('c-game-visitor'));assert.equal(new URL(v.links[1].href).searchParams.get('journeyReturn'),null);
});
