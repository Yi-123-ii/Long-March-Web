const test=require('node:test'),assert=require('node:assert/strict');
const R=require('../assets/journey-return.js'),C=require('../assets/yudu-core.js'),D=require('../assets/yudu-data.js');
const asset='https://example.test/Long-March-Web/modules/c/assets/journey-return.js?v=017';

test('return links are restricted to the same site game entry, including repository subpaths',()=>{
 const url=R.destination('https://example.test/Long-March-Web/chronicle.html?from=journey&view=story&journeyReturn=visit-1&returnTo=https://evil.test#event=jiajin',asset,'visit-1');
 assert.equal(url.href,'https://example.test/Long-March-Web/modules/c/journey.html?resume=story');
 assert.equal(R.destination('https://evil.test/chronicle.html?from=journey',asset),null);
 assert.equal(R.destination('https://example.test/Long-March-Web/index.html?from=journey',asset),null);
 assert.equal(R.destination('https://example.test/Long-March-Web/post-office.html',asset),null);
 assert.equal(R.destination('https://example.test/Long-March-Web/post-office.html?from=journey&view=map',asset,'visit-1'),null);
 assert.equal(R.destination('https://example.test/Long-March-Web/post-office.html?from=journey&journeyReturn=old',asset,'visit-1'),null);
 assert.equal(R.destination('https://example.test/Long-March-Web/post-office.html?from=journey&journeyReturn=visit-1',asset),null);
});

test('ordinary navigation drops only the game return context and keeps the selected article',()=>{
 const url=R.ordinary('https://example.test/chronicle.html?from=journey&view=story&journeyReturn=visit-1&event=wuqi#event=wuqi');
 assert.equal(url.href,'https://example.test/chronicle.html?event=wuqi#event=wuqi');
});
test('outbound links preserve the history article and letter form while carrying return context',()=>{
 const history=R.outbound('https://example.test/Long-March-Web/chronicle.html#event=grassland');
 const letter=R.outbound('https://example.test/Long-March-Web/post-office.html?event=grassland#letter-form');
 assert.equal(history.hash,'#event=grassland');assert.equal(letter.hash,'#letter-form');assert.equal(letter.searchParams.get('event'),'grassland');
 assert.equal(letter.searchParams.get('from'),'journey');assert.equal(history.searchParams.get('view'),'story');
});
test('a returning tab restores its own original branch even if another game tab advances the shared save',()=>{
 let original=C.create(D);while(original.node!=='choice')original=C.advance(D,original,C.current(D,original).choices?.[0]?.id);
 original=C.advance(D,original,'help');while(original.node!=='end'){const n=C.current(D,original);original=C.advance(D,original,n.choices?.[0]?.id);}
 const other=C.beginChapter(D,original,'xiangjiang');
 const back=R.restore(D,C,other,JSON.stringify({version:1,view:'story',state:original}));
 assert.equal(back.state.node,'end');assert.equal(back.state.choices.choice,'help');assert.deepEqual(back.state.path,original.path);
 assert.equal(back.view,'story');assert.equal(R.restore(D,C,other,'broken'),null);
 assert.equal(R.restore(D,C,other,JSON.stringify({version:1,view:'story',state:{...original,node:'not-a-real-node'}})),null);
});
