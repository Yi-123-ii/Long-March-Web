const test = require('node:test');
const assert = require('node:assert/strict');
const D = require('../assets/yudu-data.js');
const C = require('../assets/yudu-core.js');
const T = require('../assets/yudu-text.js');

const node = id => D.nodes.find(entry => entry.id === id);

function walk(target, picks = {}) {
  let state = C.create(D);
  while (state.node !== target && state.path.length < 512) {
    const n = C.current(D, state);
    const next = C.advance(D, state, picks[n.id] ?? n.choices?.[0]?.id);
    if (next === state) break;
    state = next;
  }
  assert.equal(state.node, target);
  return state;
}

test('Lu’s uninterrupted water film belongs only to the grass camp route', () => {
  const film = node('wuqi-water');
  assert.equal(film.filmId, 'WQ-02');
  assert(film.nativeAudio && film.advanceOnEnd);
  assert(!film.mediaEnd && !film.choices);
  assert.equal(film.captionPages.map(caption => caption.text).join(''), film.text);
  assert.equal(T.pageFrame(film.captionPages, 6).text, '碗这边缺了一块，你换一边喝。');
  assert.equal(film.hold, D.images[node('wuqi-water-drink').scene]);
  for (const crossing of ['stretcher', 'luggage']) {
    const camp = walk('wuqi-choice', {'xj-choice':crossing, 'grass-choice':'stay'});
    const rescue = walk('wuqi-choice', {'xj-choice':crossing, 'grass-choice':'rescue'});
    assert(camp.path.includes(film.id));
    assert(!rescue.path.includes(film.id));
    assert(rescue.path.includes('wuqi-cloth-answer'));
  }
  const atWarning = walk('wuqi-water-warning');
  assert.equal(C.restore(D, JSON.stringify(atWarning)).node, atWarning.node);
  const drink = C.advance(D, atWarning);
  assert.equal(C.advance(D, drink), drink);
  assert.equal(C.advance(D, drink, 'drink').node, 'wuqi-snow-route');
});

test('Chen’s sewing film pauses for Xiaoman and leaves the writing film on its own branch', () => {
  const first = node('wuqi-sew'), second = node('wuqi-sew-still');
  assert.equal(first.filmId, 'WQ-03');
  assert.equal(first.video, second.video);
  assert.equal(first.mediaEnd, second.mediaStart);
  assert.equal(first.hold, second.poster);
  for (const film of [first, second]) {
    assert(film.nativeAudio && film.advanceOnEnd);
    assert.equal(film.captionCues.map(cue => cue.text).join(''), film.text);
  }
  const hold = walk('wuqi-sew-reply');
  assert.equal(C.advance(D, hold), hold);
  const spoken = C.current(D, C.advance(D, hold, 'not-started'));
  assert.equal(spoken.voiceId, 'XM28');
  assert(spoken.advanceOnEnd);
  assert.equal(spoken.next, second.id);
  assert.equal(node(second.next).scene, 'new-cuff');
  const sew = walk('wuqi-back-yard', {'xj-choice':'luggage', 'wuqi-choice':'sew'});
  const write = walk('wuqi-back-yard', {'xj-choice':'luggage', 'wuqi-choice':'write'});
  assert(sew.path.includes('wuqi-sew-letter-wrap-v034'));
  assert(!sew.path.includes('wuqi-write-home'));
  assert(!write.path.includes(first.id) && !write.path.includes(second.id));
  assert(write.path.includes('wuqi-write-home'));
  assert.match(node('wuqi-write-home').video, /chenhe-memory-v021\.mp4$/);
});
