const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js'),T=require('../assets/yudu-text.js');

const node=id=>D.nodes.find(entry=>entry.id===id);

function walk(target,picks={}){
 let state=C.create(D);
 while(state.node!==target&&state.path.length<512){
  const current=C.current(D,state);
  const next=C.advance(D,state,picks[current.id]??current.choices?.[0]?.id);
  if(next===state)break;
  state=next;
 }
 assert.equal(state.node,target);
 return state;
}

test('the grass rescue film resumes after the name reply and keeps Chenhe’s absent line as text',()=>{
 const first=node('grass-b-ask-names'),invite=node('grass-b-home-street'),reply=node('grass-b-rest-first');
 const clips=[first,invite];
 assert.equal(new Set(clips.map(clip=>clip.video)).size,1);
 assert.match(first.video,/chenhe-grass-rescue-v042\.mp4$/);
 for(const clip of clips){
  assert.equal(clip.filmId,'CD-03');
  assert(clip.nativeAudio&&clip.advanceOnEnd&&!clip.cornerRepair);
  assert(clip.captionPages.length>0);
  assert.equal(clip.captionPages.map(page=>page.text).join(''),clip.text);
  assert.equal(clip.hold,D.images[node(clip.next).scene]);
 }
 assert.equal(invite.mediaStart,4.88);
 assert.equal(invite.mediaEnd,12.25);
 assert.equal(reply.scene,'grass-rescue-breath');
 assert.equal(reply.text,'你先喘口气，回去慢慢说。');
 assert(!reply.nativeAudio&&!reply.video);
 assert.equal(T.pageFrame(first.captionPages,2.95).text,'你们俩叫什么名字？');
 assert.equal(T.pageFrame(invite.captionPages,6.68).text,'到我家坐坐。');
 assert.equal(T.pageFrame(invite.captionPages,10.08).text,'街口有家');
 assert.equal(T.pageFrame(invite.captionPages,12.08).text,'卖吃的——');
 assert.equal(invite.text,'等出去了，到我家坐坐。我家那条街，街口有家卖吃的——');
 assert(!node('grass-b-tell-names').nativeAudio);
 assert.equal(node('grass-b-tell-names').choices[0].next,'grass-b-tell-names-spoken-v034');
 assert(node('grass-b-tell-names-spoken-v034').advanceOnEnd);
 assert(node('grass-b-breath').advanceOnEnd);
});

test('CD-03 plays only on the rescue route and keeps both onward camp variants',()=>{
 for(const crossing of ['stretcher','luggage']){
  const rescue=walk('grass-b-foot',{'xj-choice':crossing,'grass-choice':'rescue'});
  assert(rescue.path.includes('grass-b-ask-names'));
  assert(rescue.path.includes('grass-b-home-street'));
  assert(rescue.path.includes('grass-b-rest-first'));
  assert.equal(rescue.choices['grass-choice'],'rescue');

  const camp=walk('grass-a-water',{'xj-choice':crossing,'grass-choice':'stay'});
  assert(!camp.path.includes('grass-b-ask-names'));
  assert(!camp.path.includes('grass-b-home-street'));
  assert(!camp.path.includes('grass-b-rest-first'));
 }
});
