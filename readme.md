# Nexus UI Framework
---
#### Features and Usage
*what:*
- JS centric UI
    - Rich theme for building full web pages
    - Cross compatible Widgets and components from the sources you are most familiar with
- Includes components like themes, Forms, Trees, Lists, Menus, Toolbars, Panels, Charts, Animations, Wizywigs, Image Editor, Desktop capabilities, Dashboards, Admin Panels
- Includes common utilities like In18, Dates and time stamps, 
- Data Handling Package
    - Offers data filtering, sorting, connections (sockets), caching, data driven styling, querying, 
- Responsiveness (Better on larger screen) with minimized views for mobile
- Accessability for handicaps
- Apps Templates

*why:*
- Open Source, community driven and open for commercial use
- Common toolchain people are use to (webpack, gulp, sass and more)
- Theme Support and customizable to your liking
- Build Custom with required features
- Event driven and triggers
- 

#### Installation


---
#### Developers - stack

*Front End - Tool chain*
- Package Manager - Download packages and its dependencies
    - NodeJs - even though it's a server-side v8 javascript engine, it has an amazing package management toolkit, npm
        - Can run scripts such as gulpfiles or other cli 
        - Define Project Dependencies of node modules
        - Project structure and metainfo
        - refer a repo
        - 
- Tanscompilers - compile es6 to es5 for better dev support, and keeping all the browser
    - Typescript, coffeescript => Babel (https://babeljs.io/docs/setup/#gulp)
- Bundlers
    - Browserify or Webpack (https://webpack.github.io/docs/what-is-webpack.html)
- Automation / task runners
    - Gulp or Grunt (https://github.com/gulpjs/gulp/tree/master/docs)

*Front End - Tool Chain Process*
- Use Gulp for automation
    - Webpack bundling of css and js, preprocessing of css and js, compression, minifinations,  
- JS Compiling
    - Concat
    - Uglify
- CSS Compiling
    - UnCSS
    - Minify

*Front End - Vendors*
- Jquery
- Foundation
- gsap for animations
- d3, google charting charting

*Front End - custom*
- API to compose other libraries, speccially vendors
- 
---
#### Structure
*Files*

*Application*

*Components*
- Froundation Base Components
- 

---
### Extras
Nexus UI
-es6 - babel, core, polyfill
-jquery
-underscore

-foundation/boostrap support modularity
-View modularity - react/angular/polymerjs

components
- tables
- charts
- desktops

-mocha/some other testing framework

- themes
    - paper 


- API/Background
    - common APIs
    - Common Data model 
        - Entity -> parent association and attributes
    - Common Handlers
    - Common properties