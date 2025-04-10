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