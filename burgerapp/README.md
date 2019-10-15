

## Description

    This is my version of the basic example with React from Udemy Course
    https://www.udemy.com/course/react-the-complete-guide-incl-redux

## React 

    With React version 16.10.2

## Config modified

    modules: true,
    localIdentName: '[name]__[local]__[hash:base64:5]',
    sourceMap: isEnvProduction && shouldUseSourceMap,

##  Sources modified

    Due to reserved files names in Windows 

    Aux/Aux.js was replaced to Awx/Awx.js
				
## Fixes

    Due to a NPM bug it's required to execute this

    # yarn add @babel/plugin-transform-react-jsx @babel/plugin-transform-react-jsx-self				
    # yarn add @babel/plugin-transform-react-jsx-source
