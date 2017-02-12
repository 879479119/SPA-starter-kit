# spa-starter-kit
A set of server and spas built with redux + react-router + webpack + es6 + express
---
## Preview:

![as](http://7xsm7w.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20161101220523.png)
![as](http://7xsm7w.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20161101220449.png)
![as](http://7xsm7w.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20161101220417.png)
![as](http://7xsm7w.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20161101220505.png)


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
    │  │      bootstrap.min.css
    │  │      jquery.min.js
    │  │      react-dom.min.js
    │  │      react.min.js
    │  │      redux.min.js
    │  ├─fonts
    │  │      glyphicons-halflings-regular.woff
    │  └─js                                        #built bundle files
    │          data.bundle.js
    │          music.bundle.js
    ├─routes                                       #back end main route files 
    │      data.js
    │      index.js
    │      music.js
    │      route.json
    │      video.js
    ├─src                                          #front end source code
    │  └─single_pages                              #single page applications
    │      │  index.jsx
    │      │  main.less
    │      ├─dataCenter                            #route "/data" folder
    │      │  └─index.jsx
    |      |     ...
    │      ├─musicCenter                           #route "/music" folder
    │      │  └─index.jsx
    |      |     ...
    │      └─videoCenter                           #route "/video" folder
    │          │  config.jsx                      
    │          │  index.jsx                        #application entry
    │          │  main.less
    │          │  store.jsx                        #configure of Redux store  
    │          ├─actions
    │          │      common.jsx
    │          │      index.jsx
    │          │      pagination.jsx
    │          ├─components                        #components that can be re used
    │          │  │  show.jsx
    │          │  ├─fun-cell
    │          │  │      fun-cell.jsx
    │          │  │      fun-cell.less
    │          │  ├─pagination
    │          │  │      index.jsx
    │          │  └─rank-list
    │          │          index.jsx
    │          │          main.less
    │          ├─containers                        #container of the page
    │          │  ├─field
    │          │  │      index.jsx
    │          │  ├─frame                          #application framework
    │          │  │  │  index.jsx
    │          │  │  │  main.less
    │          │  │  └─sub-lists
    │          │  │          main.jsx
    │          │  └─main                           #index container
    │          │      │  animation.jsx
    │          │      │  fun.jsx
    │          │      │  index.jsx
    │          │      │  main.less
    │          │      │  rank.jsx
    │          │      ├─actions
    │          │      │      fun.jsx
    │          │      │      index.jsx
    │          │      │      rank.jsx
    │          │      └─reducers
    │          │              fun.jsx
    │          │              rank.jsx
    │          ├─reducers
    │          │      common.jsx
    │          │      index.jsx
    │          │      pagination.jsx
    │          └─utils                              #common tools
    │              │  number.jsx
    │              └─fetch
    │                    action.jsx
    │                    index.jsx
    ├─static                                        #static source files for back end
    │      fun_images.json
    └─views                                         #diffirent template for status
            error.jade
            index.jade
            layout.jade
```
**In fact there is a gameCenter in built** Make with :heart:
have been optimized with quaternary tree ^_^ 