// Technique inspired by:
// https://github.com/goldfire/howler.js/issues/753
// https://stackoverflow.com/questions/21122418/ios-webaudio-only-works-on-headphones/46839941#46839941

module.exports = init

const AudioContext = window.AudioContext || window.webkitAudioContext

const silentAudioFile = 'data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'

let isHtmlAudioEnabled = false
let isWebAudioEnabled = false

let audio
let context
let source

function init () {
  audio = document.createElement('audio')
  audio.preload = 'auto'
  audio.src = silentAudioFile
  audio.addEventListener('ended', handleAudioEnded)

  window.addEventListener('mousedown', handleMousedown)
}

function handleMousedown () {
  if (!isHtmlAudioEnabled) {
    audio.play().catch(() => {})
  }
  if (!isWebAudioEnabled) {
    context = new AudioContext()
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
