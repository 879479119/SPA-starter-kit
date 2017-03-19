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

### Preview:
![overview](http://7xsm7w.com1.z0.glb.clouddn.com/SPA-tool.png)


```
 dir
    ├─bin
    │  www.sh                                  #npm start
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
    │      ├─musicCenter                           #route "/music" folder
    │      └─videoCenter                 #configure of Redux store  
    │          ├─actions
    │          ├─components                        #components that can be re used
    │          ├─containers                        #container of the page
    │          ├─reducers
    │          └─utils                              #common tools
    │              └─fetch
    ├─static                                        #static source files for back end
    │      fun_images.json
    └─views                                         #diffirent template for status
            error.jade
            index.jade
```
**In fact there is a gameCenter in built** Make with :heart:
