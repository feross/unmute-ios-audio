// Technique inspired by:
// https://github.com/goldfire/howler.js/issues/753
// https://stackoverflow.com/questions/21122418/ios-webaudio-only-works-on-headphones/46839941#46839941

module.exports = init

let isHtmlAudioEnabled = false
let isWebAudioEnabled = false

let audio
let context
let source

// This will return a seven samples long 8 bit mono WAVE file.
function createSilentAudioFile (context) {
  const arrayBuffer = new ArrayBuffer(10)
  const dataView = new DataView(arrayBuffer)

  dataView.setUint32(0, context.sampleRate, true)
  dataView.setUint32(4, context.sampleRate, true)
  dataView.setUint16(8, 1, true)

  const missingCharacters = window.btoa(String.fromCharCode(...new Uint8Array(arrayBuffer))).slice(0, 13)

  return `data:audio/wav;base64,UklGRisAAABXQVZFZm10IBAAAAABAAEA${missingCharacters}AgAZGF0YQcAAACAgICAgICAAAA=`
}

function init () {
  if (window.webkitAudioContext) {
    context = new window.webkitAudioContext() // eslint-disable-line new-cap

    audio = document.createElement('audio')
    audio.preload = 'auto'
    audio.src = createSilentAudioFile(context)
    audio.addEventListener('ended', handleAudioEnded)

    window.addEventListener('mousedown', handleMousedown)
  }
}

function handleMousedown () {
  if (!isHtmlAudioEnabled) {
    audio.play().catch(() => {})
  }
  if (!isWebAudioEnabled) {
    source = context.createBufferSource()
    source.buffer = context.createBuffer(1, 1, 22050) // .045 msec of silence
    source.connect(context.destination)
    source.addEventListener('ended', handleWebAudioEnded)
    source.start()
  }
}

function handleAudioEnded () {
  if (isHtmlAudioEnabled) return
  isHtmlAudioEnabled = true
  audio.removeEventListener('ended', handleAudioEnded)
  audio = null
  maybeCleanup()
}

function handleWebAudioEnded () {
  if (isWebAudioEnabled) return
  isWebAudioEnabled = true
  source.removeEventListener('ended', handleWebAudioEnded)
  source.disconnect(context.destination)
  source = null
  context.close()
  context = null
  maybeCleanup()
}

function maybeCleanup () {
  if (!isHtmlAudioEnabled || !isWebAudioEnabled) return
  window.removeEventListener('mousedown', handleMousedown)
}
