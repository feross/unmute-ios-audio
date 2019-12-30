# unmute-ios-audio [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/unmute-ios-audio/master.svg
[travis-url]: https://travis-ci.org/feross/unmute-ios-audio
[npm-image]: https://img.shields.io/npm/v/unmute-ios-audio.svg
[npm-url]: https://npmjs.org/package/unmute-ios-audio
[downloads-image]: https://img.shields.io/npm/dm/unmute-ios-audio.svg
[downloads-url]: https://npmjs.org/package/unmute-ios-audio
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### Enable/unmute WebAudio on iOS, even while mute switch is on

On Safari for iOS, audio is allowed to play when the device's mute switch is enabled, but only for HTML5 audio tags, and not for Web Audio. This module fixes that and adds consistency and reliability to web audio in Safari. Note that a "user activation" in the form of a `click` or `touchstart` event is still required to play audio. This package merely unmutes Web Audio even while the mute switch is enabled on the device.

This package works by playing a short, silent sound using an `<audio>` tag and an `AudioContext` whenever the user interacts with the page. That's it.

Built for and used on [BitMidi](https://bitmidi.com), a free MIDI database. Works in the browser with [browserify](https://browserify.org/)!

## install

```
npm install unmute-ios-audio
```

## usage

```js
const unmuteAudio = require('unmute-ios-audio')

// Call once, as early as possible in the page lifecycle
unmuteAudio()
```

## API

### `unmuteAudio()`

Enable/unmute the WebAudio API on iOS, even while the mute switch is on.

Call this function as early as possible so that the user event handlers can be registered and you don't miss any user interactions which could have been used to unmnute the audio.

## thanks

The techniques used within this package were inspired by:

  - [howler.js issue 753](https://github.com/goldfire/howler.js/issues/753)
  - [iOS WebAudio only works on headphones](https://stackoverflow.com/questions/21122418/ios-webaudio-only-works-on-headphones/46839941#46839941)

## license

MIT. Copyright (c) [Feross Aboukhadijeh](https://feross.org).
