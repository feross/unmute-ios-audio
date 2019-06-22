# unmute-ios-audio [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/unmute-ios-audio/master.svg
[travis-url]: https://travis-ci.org/feross/unmute-ios-audio
[npm-image]: https://img.shields.io/npm/v/unmute-ios-audio.svg
[npm-url]: https://npmjs.org/package/unmute-ios-audio
[downloads-image]: https://img.shields.io/npm/dm/unmute-ios-audio.svg
[downloads-url]: https://npmjs.org/package/unmute-ios-audio
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### Make Web Audio work while iOS device's mute switch is enabled

On Safari for iOS, audio is allowed to play when the device's mute switch is enabled, but only for HTML5 audio tags, and not for Web Audio. This module fixes that and adds consistency and reliability to web audio in Safari. Note that a "user activation" in the form of a `click` or `touchstart` event is still required to play audio. This package merely unmutes Web Audio even while the mute switch is enabled on the device.

This package works by playing a short, silent sound using an `<audio>` tag whenever the user interacts with the page. That's it.

Built for and used on [BitMidi](https://bitmidi.com), a free MIDI database. Works in the browser with [browserify](https://browserify.org/)!

## install

```
npm install unmute-ios-audio
```

## usage

```js
var unmuteAudio = require('unmute-ios-audio')

// Call once, at page load time
unmuteAudio()
```

## API

### `unmuteAudio()`



## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
