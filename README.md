# graphview
Browser extension adapted from OpenFiche


## implementation ideas
- [force graph package](https://github.com/vasturiano/force-graph)

## names
- graphite

## development
- Download [Node](https://nodejs.org/en/download)

- clone the repository

- run `npm install` in the repository

- run `npm run build` to create a build of the extension
    - this will create a dist folder with the build

- go to the extension tab on your chromium browser
    - enable developer mode
    - load unpacked and put the generated dist folder from `npm run build`

> in the future, the extension will additionally be ported to safari with the [Xcode's command line utility](https://developer.apple.com/documentation/safariservices/converting-a-web-extension-for-safari)



ADD A CONTROL F FEATURE
The bug with large graphs and dragging now has an error log, noting it here before I forget.
```js
background.js:39 Updated graph data stored in chrome.storage.local.
background.js:39 Updated graph data stored in chrome.storage.local.
background.js:39 Updated graph data stored in chrome.storage.local.
react-force-graph-2d-B3ZqMBk3.js:67 Uncaught Error: node not found: https://www.google.com/search?q=react+force+graph+breaks+with+lots+of+nodes+and+edges&oq=react+force+graph+breaks+with+lots+of+nodes+and+edges&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU0NjVqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8_1340240345
    at Lg (react-force-graph-2d-B3ZqMBk3.js:67:18492)
    at A (react-force-graph-2d-B3ZqMBk3.js:67:19233)
    at D3.x.links (react-force-graph-2d-B3ZqMBk3.js:67:19838)
    at X.update (react-force-graph-2d-B3ZqMBk3.js:94:11623)
    at react-force-graph-2d-B3ZqMBk3.js:54:1311
    at x (react-force-graph-2d-B3ZqMBk3.js:53:55302)
    at N (react-force-graph-2d-B3ZqMBk3.js:53:55592)
    at w (react-force-graph-2d-B3ZqMBk3.js:53:55531)
react-force-graph-2d-B3ZqMBk3.js:67 Uncaught Error: node not found: https://www.google.com/search?q=react+force+graph+breaks+with+lots+of+nodes+and+edges&oq=react+force+graph+breaks+with+lots+of+nodes+and+edges&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU0NjVqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8_1340240345
    at Lg (react-force-graph-2d-B3ZqMBk3.js:67:18492)
    at A (react-force-graph-2d-B3ZqMBk3.js:67:19233)
    at D3.x.links (react-force-graph-2d-B3ZqMBk3.js:67:19838)
    at X.update (react-force-graph-2d-B3ZqMBk3.js:94:11623)
    at react-force-graph-2d-B3ZqMBk3.js:54:1311
    at x (react-force-graph-2d-B3ZqMBk3.js:53:55302)
    at N (react-force-graph-2d-B3ZqMBk3.js:53:55592)
    at w (react-force-graph-2d-B3ZqMBk3.js:53:55531)
react-force-graph-2d-B3ZqMBk3.js:67 Uncaught TypeError: Cannot create property 'vx' on string 'https://github.com/vasturiano/react-force-graph/issues/202_1340240345'
    at x (react-force-graph-2d-B3ZqMBk3.js:67:18957)
    at react-force-graph-2d-B3ZqMBk3.js:67:20745
    at Map.forEach (<anonymous>)
    at Object.A [as tick] (react-force-graph-2d-B3ZqMBk3.js:67:20725)
    at l (react-force-graph-2d-B3ZqMBk3.js:94:6434)
    at X.tickFrame (react-force-graph-2d-B3ZqMBk3.js:94:6177)
    at X.<computed> [as tickFrame] (react-force-graph-2d-B3ZqMBk3.js:54:1848)
    at m (react-force-graph-2d-B3ZqMBk3.js:94:24555)
x @ react-force-graph-2d-B3ZqMBk3.js:67
(anonymous) @ react-force-graph-2d-B3ZqMBk3.js:67
A @ react-force-graph-2d-B3ZqMBk3.js:67
l @ react-force-graph-2d-B3ZqMBk3.js:94
tickFrame @ react-force-graph-2d-B3ZqMBk3.js:94
X.<computed> @ react-force-graph-2d-B3ZqMBk3.js:54
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
requestAnimationFrame
m @ react-force-graph-2d-B3ZqMBk3.js:94
```