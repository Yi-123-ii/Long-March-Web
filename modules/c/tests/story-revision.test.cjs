const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js'),R=require('../assets/journey-return.js');
const legacy={...D,storyRevision:9,nodes:D.legacyStory.nodes};
function walk(data,decisions,until='journey-end'){
 let s=C.create(data),guard=0;
 while(s.node!==until&&guard++<512){const n=C.current(data,s);s=C.advance(data,s,decisions[n.id]||n.choices?.[0]?.id);}
 assert.equal(s.node,until);return s;
}
test('all 32 real legacy paths migrate without losing decisions, bookmarks or unlocks',()=>{
 for(const choice of ['hand','help'])for(const crossing of ['stretcher','luggage'])for(const snow of ['support','call'])for(const grass of ['stay','rescue'])for(const wuqi of ['sew','write']){
  const picks={choice,'xj-choice':crossing,'snow-choice':snow,'grass-choice':grass,'wuqi-choice':wuqi};
  const before=walk(legacy,picks),after=C.restore(D,{...before,choices:{choice:'forged'},settings:{voice:.37,ambient:.24,auto:false}});
  assert.equal(after.node,before.node);assert.equal(after.storyRevision,13);
  for(const [id,pick]of Object.entries(picks))assert.equal(after.choices[id],pick);
  for(const ch of D.chapters){assert.equal(after.chapterProgress[ch.id].node,before.chapterProgress[ch.id].node);assert(C.canOpenChapter(D,after,ch.id));}
  assert.equal(after.settings.voice,.37);assert.equal(after.settings.ambient,.24);
  assert.deepEqual(C.restore(D,after).path,after.path);
 }
});
test('a rewound old save keeps a later station position and works through the history return snapshot',()=>{
 const picks={choice:'help','xj-choice':'luggage','snow-choice':'call','grass-choice':'stay','wuqi-choice':'write'};
 const middle=walk(legacy,picks,'wuqi-write-letter'),rewound=C.beginChapter(legacy,middle,'yudu');
 const migrated=C.restore(D,rewound);assert.equal(migrated.node,'river');
 assert.equal(C.openChapter(D,migrated,'wuqi').node,'wuqi-write-letter');
 const returned=R.restore(D,C,C.create(D),JSON.stringify({version:1,view:'story',state:middle}));
 assert.equal(returned.state.node,'wuqi-write-letter');assert.equal(returned.state.choices['xj-choice'],'luggage');
});
test('legacy migration does not accept a fabricated cross-branch path or fabricated future bookmark',()=>{
 const old=walk(legacy,{choice:'help','xj-choice':'luggage'},'zy-b-letter');
 const corrupt={...old,path:old.path.map(id=>id==='xj-news-b'?'xj-news-a':id)};
 assert.equal(C.restore(D,corrupt).node,D.start);
 const fresh=C.create(legacy);fresh.chapterProgress.snow={node:'snow-arrive',path:['river','snow-arrive']};
 assert(!C.canOpenChapter(D,C.restore(D,fresh),'snow'));
});
test('approved words replace the old incoherent replies and remaining film slots stay static',()=>{
 const n=id=>D.nodes.find(n=>n.id===id);
 assert.equal(n('name').choices[0].label,'我叫小满。');
 assert.equal(n('ask-home').choices[0].label,'梁叔，您家里这时候都忙些什么？');
 assert.equal(n('xj-loss').speaker,'转运同志');assert(n('xj-loss').text.includes('梁叔回去帮我们抬担架，在江边中了弹。我们没能把他救回来。'));
 assert.equal(n('snow-a-help-yudu').text,'你之前在于都也是这么说的。');
 assert.equal(n('wuqi-cloth-answer').text,'你说卖吃的那家吗？早搬了。');
 const pending=D.nodes.filter(n=>n.plannedFilm);assert.equal(pending.length,1);
 for(const node of pending){assert(!node.nativeAudio);assert(!node.video);assert(D.images[node.scene]);}
 assert.equal(D.nodes.filter(n=>n.choices?.length===2).length,5);
});
