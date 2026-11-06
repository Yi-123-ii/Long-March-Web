const test = require('node:test');
const assert = require('node:assert/strict');
const D = require('../assets/yudu-data.js');
const C = require('../assets/yudu-core.js');
const T = require('../assets/yudu-text.js');
const node = id => D.nodes.find(n => n.id === id);

function walk(crossing, target = 'zy-end') {
  let state = C.create(D);
  while (state.node !== target && state.path.length < 512) {
    const current = C.current(D, state);
    const next = C.advance(D, state, current.id === 'xj-choice' ? crossing : current.choices?.[0]?.id);
    assert.notEqual(next, state, target);
    state = next;
  }
  assert.equal(state.node, target);
  return state;
}

test('Zunyi films follow the Xiangjiang choice and converge on the original still sequence', () => {
  const stretcher = walk('stretcher').path;
  const luggage = walk('luggage').path;
  const silent = node('zy-a-lusheng');
  assert(stretcher.includes(silent.id));
  assert(!luggage.includes(silent.id));
  assert(silent.nativeAudio && silent.textAfterMovie);
  assert(!silent.captionCues && !silent.captionPages);
  assert.equal(D.images[node('zy-a-move-bag').scene], silent.hold);
  for (const id of ['zy-b-question','zy-b-advice','zy-b-paper']) {
    assert(luggage.includes(id));
    assert(!stretcher.includes(id));
  }
  for (const id of ['zy-mended','zy-depart']) {
    assert(stretcher.includes(id) && luggage.includes(id));
    assert(!node(id).nativeAudio && !node(id).plannedFilm);
  }
});

test('Chen pauses for the reply and the same film continues with source-clock subtitles', () => {
  const question = node('zy-b-question');
  const advice = node('zy-b-advice');
  const paper = node('zy-b-paper');
  assert.equal(question.video, advice.video);
  assert.equal(advice.video, paper.video);
  assert.equal(question.mediaEnd, advice.mediaStart);
  assert.equal(advice.mediaEnd, paper.mediaStart);
  assert.equal(question.hold, advice.poster);
  assert.equal(advice.hold, paper.poster);
  assert.equal(D.images[node('zy-b-fold').scene], paper.hold);
  assert.equal(node('zy-b-move-lamp').text, '');
  const answer = C.restore(D, JSON.stringify(walk('luggage','zy-b-answer')));
  assert.equal(C.advance(D, answer).node, 'zy-b-answer');
  assert.equal(C.advance(D, answer, 'not-yet').node, 'zy-b-advice');
  assert.equal(C.back(D, answer).node, 'zy-b-question');
  assert.equal(T.pageFrame(paper.captionPages, paper.mediaStart).text, advice.text);
  assert.equal(T.pageFrame(paper.captionPages, paper.duration).text, paper.text);
  assert.equal(D.storyRevision, 10);
});
