# spa-starter-kit
A set of server and spas built with redux + react-router + webpack + es6 + express

#### Three Single-page-applications

There are several pages provides 

+ **static pages**
+ some pages **using proxy data**
+ a **Danmu player** (offline now)
+ a **Music player** with dynamic lyric


**Steps**：

+ `git clone git@github.com:879479119/SPA-starter-kit.git`

+ `npm install`

+ run `npm start` to start express server

+ run `npm run webpack` in another window

***Attention**: sometimes the dev-server does't build bundles,and you can manually start `webpack --wacth`*

### Preview:
![overview](http://7xsm7w.com1.z0.glb.clouddn.com/SPA-tool.png)

project running on port `3000`, and there is **No Homepage** page
+ Bilibili-data-page: [/video](http://127.0.0.1:3000/video)
+ Danmu-show-page: [/data](http://127.0.0.1:3000/data)
+ Audio-player-page: [/music](http://127.0.0.1:3000/music)
+ Tank-game-page: [/game](http://127.0.0.1:3000/game)

```
 dir
    │  .gitignore                                  #git repository ignored files
    │  app.js                                      #back-end entry file
    │  config.js                                   #web router configure
    │  LICENSE                                     #MIT license
    │  package.json                                #standard npm file
    │  webpack.config.js                           #webpack entry for both build and production
    ├─bin
    │      www.sh                                  #npm start
    ├─output
    │  ├─external                                  #external files manually add
    │  ├─fonts
    │  │      glyphicons-halflings-regular.woff
    │  └─js                                        #built bundle files
    ├─routes                                       #back end main route files 
    ├─src                                          #front end source code
    │  └─single_pages                              #single page applications
    │      │  index.jsx
    │      │  main.less
    │      ├─dataCenter                            #route "/data" folder
    │      │  └─index.jsx
    │      ├─musicCenter                           #route "/music" folder
    │      │  └─index.jsx
    │      └─videoCenter                 #configure of Redux store  
    │          ├─actions
    │          ├─components                        #components that can be re used
    │          │  ├─fun-cell
    │          │  ├─pagination
    │          │  └─rank-list
    │          ├─containers                        #container of the page
    │          │  ├─field
    │          │  ├─frame
    │          │  └─main                           #index container
    │          ├─reducers
    │          └─utils                              #common tools
    │              └─fetch
    ├─static                                        #static source files for back end
    │      fun_images.json
    └─views                                         #diffirent template for status
            error.jade
            index.jade
            layout.jade
```
**In fact there is a gameCenter in built** Make with :heart: