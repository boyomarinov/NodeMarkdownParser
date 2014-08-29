# Simple Markdown parser

### Installation and usage
 - Install [NodeJS][]
 - run the following commands in the root directory:
 - 
 ```sh 
 npm install 
 ``` 
 
 - 
 ```sh 
 node parser 
 ```
 - give path to the .md file you want to parse, e.g. ./example.md
 
On success HTML file with the same name will be created in the same directory as the original.

### Code highlighting
You have the possibility to switch between currently available themes by changing the `currentTheme` property at the top of __parser.js__.
 
[NodeJS]: http://nodejs.org/