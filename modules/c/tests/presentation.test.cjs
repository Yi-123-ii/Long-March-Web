const test=require('node:test'),assert=require('node:assert/strict');
const P=require('../assets/yudu-presentation.js'),D=require('../assets/yudu-data.js');
test('short action labels do not rewrite the approved dialogue, question marks or film captions',()=>{
 const original=D.nodes.find(n=>n.id==='grass-a-tell-name').choices[0].label;
 assert.equal(original,'我叫小满。你呢？');assert.equal(P.choiceLabel(original),'我叫小满，你呢？');
 assert.equal(P.choiceLabel('我叫小满。'),'我叫小满');assert.equal(P.choiceLabel('阿禾？'),'阿禾？');
 assert.equal(D.nodes.find(n=>n.id==='reach').text,'别站在岸上了。来，跟上我们。');
});
test('spoken movies and picture dialogue use the same character name rules',()=>{
 for(const node of D.nodes.filter(n=>n.mode==='dialogue'))assert.equal(P.speaker(node)?.name,node.speaker);
 assert.equal(P.speaker({mode:'dialogue',speaker:'陆生'})?.name,'陆生');
 assert.deepEqual(P.speaker({mode:'thought',speaker:'心声'}),{name:'小满',kind:'心声'});
 for(const node of D.nodes.filter(n=>(n.end||n.checkpoint||['fact','observation'].includes(n.mode))&&!n.narration))assert.equal(P.speaker(node),null);
 for(const node of D.nodes.filter(n=>n.narration))assert.equal(P.speaker(node)?.name,node.narration.speaker||'小满');
});

test('lookahead buffers one upcoming film, respects route choices and stops at chapter boundaries',()=>{
 const C=require('../assets/yudu-core.js');let state=C.create(D);
 assert.equal(P.upcomingFilm(D,C,state).id,'reach');
 while(!C.current(D,state).end){
  const n=C.current(D,state),film=P.upcomingFilm(D,C,state);
  if(film){assert(film.nativeAudio);assert.equal(film.chapter,n.chapter);}
  if(n.choices?.length>1||n.checkpoint)assert.equal(film,null);
  const next=C.advance(D,state,n.choices?.[0].id);if(next===state)break;state=next;
 }
 const data={nodes:[{id:'start',chapter:'a',routes:[{choice:'branch',equals:'b',next:'film-b'}],next:'film-a'},
  {id:'film-a',chapter:'a',nativeAudio:true},{id:'film-b',chapter:'a',nativeAudio:true}]};
 assert.equal(P.upcomingFilm(data,C,{node:'start',choices:{branch:'b'}}).id,'film-b');
 assert.equal(P.upcomingFilm(data,C,{node:'start',choices:{}}).id,'film-a');
});
test('changed video and still URLs refresh cached media without changing data paths or embedded assets',()=>{
 assert.equal(P.media('assets/yudu/liang-home-v013.mp4'),'assets/yudu/liang-home-v013.mp4?v=023');
 assert.equal(P.media('assets/yudu/liang-home-first-v013.png'),'assets/yudu/liang-home-first-v013.png?v=023');
 assert.equal(P.media('assets/mark.svg'),'assets/mark.svg');
 assert.equal(P.media('assets/test.png',{'assets/test.png':'data:image/png;base64,x'}),'data:image/png;base64,x');
});
