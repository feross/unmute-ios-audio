module.exports = init

let isAudioEnabled = false

const silentAudioFile = 'data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'

let audio

function init () {
  audio = document.createElement('audio')
  audio.preload = 'auto'
  audio.src = silentAudioFile
  audio.onended = handleEnded

  window.addEventListener('mousedown', handleMousedown)
}

function handleMousedown () {
  if (isAudioEnabled) return
  audio.play().catch(() => {})
}

function handleEnded () {
  if (isAudioEnabled) return
  isAudioEnabled = true
  window.removeEventListener('mousedown', handleMousedown)

  setTimeout(() => {
    // Unload audio tag from memory
    audio.src = ''
    audio.load()
    audio = null
  }, 5000)
}
