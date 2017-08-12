# HelloWorldSp

This project has been initially generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.7.

This aims to be a seed project to create an angular application hosted on a SharePoint online site.

## App generation

This app has been generated thanks to: 

    ng new hello-world-sp --style scss --routing true

## Change from the angular 4 template

Here we will use a trick to host the application on SharePoint online, we will integrate our angular app 
into a SharePoint Wiki page in ASP.NET.

This template is already configured for you in index.aspx.

Then we needed to change the way the default angular cli build the app to include the ASP.NET page.

1. Add those package as dev dependencies (in package.json)
```sh
angular2-template-loader
awesome-typescript-loader
browser-sync
browser-sync-webpack-plugin
css-loader
extract-text-webpack-plugin
file-loader
html-loader
html-webpack-plugin
ngc-webpack
node-sass
postcss-loader
replace-webpack-plugin
rimraf
sass-loader
sourcemap-istanbul-instrumenter-loader
string-replace-webpack-plugin
style-loader
to-string-loader
tslint-loader
web-app-manifest-loader
webpack
webpack-dev-server
webpack-merge
webpack-notifier
webpack-visualizer-plugin
write-file-webpack-plugin
xml2js
```
2. Create the webpack configuration in webpack folder
3. Add commands in package.json: 
```json
"scripts": {
    "cleanup": "rimraf target/{aot,www}",
    "clean-www": "rimraf target//www/app/{src,target/}",
    "webpack:dev": "yarn run webpack-dev-server -- --config webpack/webpack.dev.js --progress --inline --hot --profile --port=9060",
    "webpack:build:main": "yarn run webpack -- --config webpack/webpack.dev.js --progress --profile",
    "webpack:build": "yarn run cleanup && yarn run webpack:build:main",
    "webpack:prod:main": "yarn run webpack -- --config webpack/webpack.prod.js --progress --profile",
    "webpack:prod": "yarn run cleanup && yarn run webpack:prod:main && yarn run clean-www",
    "webpack-dev-server": "node --max_old_space_size=4096 node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    "webpack": "node --max_old_space_size=4096 node_modules/webpack/bin/webpack.js"
}
```
4. Add src/postcss.config.js