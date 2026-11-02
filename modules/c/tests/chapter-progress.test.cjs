const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../assets/yudu-core.js'),D=require('../assets/yudu-data.js');
function walk(target){let s=C.create(D),guard=0;while(s.node!==target&&guard++<250){const n=C.current(D,s);s=C.advance(D,s,n.id==='choice'?'help':n.id==='xj-choice'?'luggage':n.choices?.[0]?.id);}assert.equal(s.node,target);return s;}
test('returning to Yudu keeps Xiang unlocked and its exact position through refresh',()=>{
 const second=walk('xj-b-letter'),replay=C.beginChapter(D,second,'yudu');assert.equal(replay.node,D.start);
 const saved=C.restore(D,JSON.stringify(replay));assert(C.canOpenChapter(D,saved,'xiangjiang'));assert(!C.canOpenChapter(D,saved,'zunyi'));
 const back=C.openChapter(D,saved,'xiangjiang');assert.equal(back.node,second.node);assert.deepEqual(back.path,second.path);assert.deepEqual(back.choices,second.choices);
 assert.equal(C.beginChapter(D,back,'xiangjiang').node,'xj-arrive');
});
test('a completed station keeps its next unlock even before that next station is first visited',()=>{
 const done=walk('end'),replay=C.beginChapter(D,done,'yudu');assert(C.canOpenChapter(D,replay,'xiangjiang'));
 assert.equal(C.openChapter(D,replay,'xiangjiang').node,'xj-arrive');
});
test('all unlocked chapters remain available when replaying the first chapter',()=>{
 const final=walk('journey-end'),back=C.restore(D,JSON.stringify(C.beginChapter(D,final,'yudu')));
 for(const ch of D.chapters){assert(C.canOpenChapter(D,back,ch.id),ch.id);assert.equal(C.chapter(D,C.openChapter(D,back,ch.id)).id,ch.id);}
});
test('old rewound saves recover the second unlock from an existing completed first choice',()=>{
 const old={...C.create(D),completed:['help']};delete old.chapterProgress;
 const migrated=C.restore(D,old);assert(C.canOpenChapter(D,migrated,'xiangjiang'));assert.equal(C.openChapter(D,migrated,'xiangjiang').choices.choice,'help');
 assert(!C.canOpenChapter(D,migrated,'zunyi'));
 const corrupt=C.create(D);corrupt.chapterProgress.snow={node:'snow-arrive',path:['river','snow-arrive']};assert(!C.canOpenChapter(D,C.restore(D,corrupt),'snow'));
});
