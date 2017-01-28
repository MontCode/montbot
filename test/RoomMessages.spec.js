'use strict';

const test = require('tape');
const RoomMessages = require('../data/rooms/RoomMessages');
const TestHelper = require('./helpers/TestHelper');

test('RoomMessages tests', t => {
  t.plan(4);

  t.test('should find a message', st => {
    st.plan(1);
    const msg = 'you gotta holler i say';
    const input = TestHelper.makeInputFromString(msg);
    const res = RoomMessages.scanInput(input, 'camperbot/testing', 1);
    st.equal(res.text, '> holler back!');
    st.end();
  });

  t.test('should be silent in 0 chance tooms', st => {
    st.plan(1);
    const msg = 'you gotta holler i say';
    const input = TestHelper.makeInputFromString(msg);
    const res = RoomMessages.scanInput(input, 'camperbot/testing', 0);
    st.equal(res, null);
    st.end();
  });

  t.test('should find a message three ticks \'\'\'', st => {
    st.plan(1);
    const msg = 'mistake \'\'\' text';
    const input = TestHelper.makeInputFromString(msg);
    const res = RoomMessages.scanInput(input, 'camperbot/testing', 1);
    st.ok(res.text.includes('> :bulb: to format'));
    st.end();
  });

  t.test('should find a message for a bonfire', st => {
    st.plan(1);
    const msg = 'help for bonfire XXX';
    const input = TestHelper.makeInputFromString(msg);
    const res = RoomMessages.scanInput(input, 'camperbot/testing', 1);
    st.ok(res.text.includes('> type `bonfire name`'));
    st.end();
  });
});
