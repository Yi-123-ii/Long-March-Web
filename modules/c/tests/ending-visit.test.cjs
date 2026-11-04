const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const R=require('../assets/journey-return.js'),base='https://example.test/Long-March-Web/',script=base+'modules/c/assets/journey-return.js?v=023';
const source=name=>fs.readFileSync(path.join(__dirname,'../assets',name),'utf8');
function storage(entries=[]){const map=new Map(entries);return {getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};}

test('only the two visible station-ending actions create a return visit, never map or ordinary links',()=>{
 const callbacks={},session=storage(),links=Object.fromEntries(['chapter-facts','ending-history','ending-post','ending','story-screen'].map(id=>[id,{id}]));
 links.ending.hidden=false;links.ending.dataset={chapter:'snow'};links['story-screen'].hidden=false;
 const context={URL,Date,Math,sessionStorage:session,CustomEvent:class{constructor(type){this.type=type;}},document:{baseURI:base+'modules/c/journey.html',querySelectorAll:()=>[],getElementById:id=>links[id],addEventListener:(name,fn)=>callbacks[name]=fn},window:{JourneyReturn:R,AtlasMap:{selected:()=> 'yudu'},crypto:{randomUUID:()=> 'visit-1'},addEventListener(){},dispatchEvent:event=>{assert.equal(event.type,'journey:leaving-site');session.setItem(R.KEY,'saved snapshot');}}};
 vm.createContext(context);vm.runInContext(source('site-integration.js'),context);
 assert.equal(new URL(links['chapter-facts'].href).searchParams.get('from'),null);
 const click=a=>callbacks.click({target:{closest:()=>a}});
 click(links['ending-history']);assert.equal(session.getItem(R.VISIT_KEY),'visit-1');assert.equal(new URL(links['ending-history'].href).searchParams.get('journeyReturn'),'visit-1');
 click(links['chapter-facts']);assert.equal(session.getItem(R.VISIT_KEY),null);assert.equal(new URL(links['chapter-facts'].href).searchParams.get('from'),null);
 links.ending.hidden=true;click(links['ending-post']);assert.equal(session.getItem(R.VISIT_KEY),null);assert.equal(new URL(links['ending-post'].href).searchParams.get('from'),null);
});

function visit(href,token='visit-1'){
 const events={},session=storage(token?[[R.VISIT_KEY,token],[R.KEY,'snapshot']]:[]),classes=new Set(),nodes=[];
 const links=['chronicle.html','post-office.html?event=jiajin#letter-form','index.html','journey.html'].map(p=>({href:base+p,target:''}));
 const body={append:el=>nodes.push(el),classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)}};
 const context={URL,location:{href},sessionStorage:session,MutationObserver:class{observe(){}},document:{currentScript:{src:script},head:{append(){}},body,createElement:tag=>({tag,append(){},setAttribute(){},remove(){this.removed=true;}}),querySelector:()=>null,querySelectorAll:selector=>selector==='a[href]'?links:[],addEventListener:(type,fn)=>events[type]=fn},window:{addEventListener:(type,fn)=>events[type]=fn}};
 vm.createContext(context);vm.runInContext(source('journey-return.js'),context);
 return {events,session,classes,nodes,links,click:a=>events.click?.({target:{closest:()=>a}})};
}
test('normal entry from home has no return banner despite a saved unfinished visit',()=>{
 for(const href of [base+'chronicle.html',base+'post-office.html',base+'chronicle.html?from=journey&view=map']){
  const v=visit(href);assert.equal(v.nodes.length,0);assert.equal(v.classes.has('c-game-visitor'),false);
 }
});
test('a direct ending visit carries between history and mail, but home exit and browser back remove the banner',()=>{
 const v=visit(base+'chronicle.html?from=journey&view=story&journeyReturn=visit-1');assert.equal(v.nodes.length,1);
 v.click(v.links[1]);assert.equal(v.session.getItem(R.VISIT_KEY),'visit-1');assert.equal(new URL(v.links[1].href).searchParams.get('journeyReturn'),'visit-1');
 v.click(v.links[2]);assert.equal(v.session.getItem(R.VISIT_KEY),null);assert.equal(v.session.getItem(R.KEY),null);
 v.events.pageshow();assert(v.nodes[0].removed);assert(!v.classes.has('c-game-visitor'));assert.equal(new URL(v.links[1].href).searchParams.get('journeyReturn'),null);
});
