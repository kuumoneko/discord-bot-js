const join_voice = require('./join')
const leave_voice = require('./leave')
const now_playing = require('./nplay')
const pausing = require('./pause')
const play_music = require('./play')
const see_queue = require('./queue')
const resuming = require('./resume')
const set_loop = require('./setloop')
const shuffling = require('./shuffle')
const skipping = require('./skip')
const stopping = require('./stop')

const playing = require('./support/playing')

module.exports = {
    join_voice, leave_voice, now_playing, pausing, play_music, see_queue, resuming, set_loop, shuffling, skipping, stopping,
    playing,
}