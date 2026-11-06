const test = require('node:test');
const assert = require('node:assert/strict');
const D = require('../assets/yudu-data.js');
const C = require('../assets/yudu-core.js');
const T = require('../assets/yudu-text.js');

const node = id => D.nodes.find(entry => entry.id === id);
const oldData = {...D, nodes:D.nodes.map(entry => {
  if (entry.id === 'snow-ask-home') return {...entry, choices:undefined, next:'snow-pack'};
  if (entry.id === 'snow-ready') return {...entry, choices:[{...entry.choices[0], next:'snow-path'}]};
  return entry;
})};

function walk(data, target, snowChoice) {
  let state = C.create(data);
  while (state.node !== target && state.path.length < 512) {
    const entry = C.current(data, state);
    const next = C.advance(data, state, entry.id === 'snow-choice' ? snowChoice : entry.choices?.[0]?.id);
    if (next === state) break;
    state = next;
  }
  assert.equal(state.node, target);
  return state;
}

test('both snow routes share one film and require the two player replies', () => {
  const clips = ['snow-hold-pack','snow-pack','snow-respond-name'].map(node);
  assert.equal(new Set(clips.map(clip => clip.video)).size, 1);
  for (const [index, clip] of clips.entries()) {
    assert(clip.nativeAudio && clip.advanceOnEnd);
    assert.equal(clip.captionPages.map(page => page.text).join(''), clip.text);
    assert.equal(clip.hold, D.images[node(clip.next).scene]);
    if (index) {
      assert.equal(clip.poster, clips[index - 1].hold);
      assert.equal(clip.mediaStart, clips[index - 1].mediaEnd);
    }
  }
  for (const [id, choice, next] of [['snow-ask-home','ask-pack-history','snow-pack'],['snow-nickname','ask-nickname','snow-respond-name']]) {
    const waiting = walk(D, id); waiting.settings.auto = true;
    assert.equal(C.advance(D, waiting), waiting);
    const reply=C.advance(D,waiting,choice),spoken=C.current(D,reply);
    assert(spoken.voice&&spoken.advanceOnEnd);
    assert.equal(C.advance(D,reply).node,next);
  }
  assert.equal(T.pageFrame(clips[1].captionPages, 7.5).text, '阿禾，你又给捆歪了！');
  for (const branch of ['support','call']) {
    const state = walk(D, 'snow-end', branch);
    assert(state.path.includes('snow-wet-clothes-v037'));
    assert.equal(state.choices['snow-choice'], branch);
  }
});

test('older snow saves resume past the added still without recording an action at it', () => {
  for (const branch of ['support','call']) {
    const old = walk(oldData, 'grass-arrive', branch);
    const restored = C.restore(D, JSON.stringify(old));
    assert.equal(restored.node, old.node);
    assert.deepEqual(restored.path, old.path);
    assert.deepEqual(restored.chapterProgress, old.chapterProgress);
    assert.equal(restored.choices['snow-ready'], 'climb');
    assert.equal(restored.choices['snow-choice'], branch);
    assert.equal(restored.choices['snow-wet-clothes-v037'], undefined);
  }
  const atQuestion = C.restore(D, walk(oldData, 'snow-ask-home'));
  assert.equal(C.advance(D, atQuestion), atQuestion);
});
