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
 - when prompted, type the filepath to a `.md` file you want to parse, e.g. __./example.md__ for a file in the same directory as __parser.js__.
 
On success HTML file with identical name will be created in the same directory as the original.

### Code highlighting
You have the possibility to switch between currently available themes by changing the `currentTheme` property at the top of __parser.js__.
 
[NodeJS]: http://nodejs.org/