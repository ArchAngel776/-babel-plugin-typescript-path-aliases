# Babel Plugin - TypeScript path aliases
Babel plugin provide to resolving of path aliases used in tsconfig.json file(s).

## Abstract
### Introduction
Each of us - TS developers - at the specific point of a bigger project meets with unsatisfying, unesthetic issue: **really long relative dir-up chain**. Is this view similar?
```typescript
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import ModelBase from "../../../foundations/ModelBase"
import Query from "../../../../../../tools/Query"
(and 36 more imports started with "../../../../../../")
```

To protect us from this kind of unesthetic TypeScript provides a special option like **path aliases**, which can be configured int our **tsconfig.json** file(s) contained in the whole project diretory.
Typical configuration requires two fields: **baseUrl** typically pointed to current dir **"."** and **paths** which is a dictionary of path prefix aliases and their original relative pointers. Typical structure looks like:
```json
{
  "baseUrl": ".",
  "paths": {
    "@data/*": ["src/data/*"],
    "@components/*": ["src/components/*"]
  }
}
```

It allows as to replace ugly, relative module import with such a more developer freindly paths. So in the result we can replace above, previous import statement with:
```typescript
import ModelSchema from "@data/interfaces/ModelSchema"
import ModelBase from "@foundations/ModelBase"
import Query from "@tools/Query"
(and 36 more imports started with "@")
```

Chapeau bas, TypeScript creators - this feature makes me stop closing my eyes every time I open my app source module. 

### Problem
Now, we are ready to use one of the most popular compiler, well-known in Node environment. Our Babel configuration usually contains such preset and plugins like below:
```json
{
  "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ],
        [
            "@babel/preset-typescript",
            {
                "optimizeConstEnums": true
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "version": "legacy"
            }
        ],
        "@babel/plugin-transform-class-properties",
        "@babel/plugin-transform-classes"
    ]
}
```

Let's assume we have some import statement in our TypeScript module:
```typescript
import Transaction from "@components/database/Transaction"
import MongoURL from "@helpers/MongoUrl"
import Method from "@helpers/Method"
```

Now, we are trying to compile our source TS modules into ready JS code (for example by **npx babel src --out-dir build --extensions=".ts"** or another command spoiled with Babel). Everything seems be all alright. Hence, running button arrives into the action. And here we go...
```
Error: Cannot find module '@components/database/Transaction'
```

Our compiled code is failed to any running. What happend? Let's see into our bundled chunks. First look is pretty enough to take care about compiled import statement. It is supposed to be in form like that:
```javascript
var _Transaction = _interopRequireDefault(require("@components/database/Transaction"));
var _MongoURL = _interopRequireDefault(require("@helpers/MongoUrl"));
var _Method = _interopRequireDefault(require("@helpers/Method"));
```

There are no any doubts - we can clearly assume certain conclusion:
>[!NOTE]
>Code compiled by Babel as JavaScript bundle cannot read path aliases proper for TypeScript source code. It also doesn't take into account using path aliases thus, won't replace them with their relatives equivalents.

## Plugin solution
For rescue whole situation, I had a honor to create this, simple plugin - modifying Babel behaviour and compiling path aliases into their path aliases. It is really easy to use and everyone can make it ;)

### Installation
To include plugin into your project just add its as develop dependecy:
```
npm install --dev babel-plugin-typescript-path-aliases
```

Or, if using **yarn**:
```
yarn add -D babel-plugin-typescript-path-aliases
```

Just simple :)

### Usage
Plug-in from the name purpose is fully plugable. All you have to do is just put its into your .babelrc (or another Babel configuration file) into **plugins** ordered list - can be as first:
```
"plugins": [
  "babel-plugin-typescript-path-aliases"
  [
    "@babel/plugin-proposal-decorators",
    {
      "version": "legacy"
    }
  ],
  "@babel/plugin-transform-class-properties",
  "@babel/plugin-transform-classes"
]
```

It's all. Now we can compile code by Babel again and take look on the effects.

### Effect
Comparing import statements this time we can see our result:
```typescript
import Transaction from "@components/database/Transaction"
import MongoURL from "@helpers/MongoUrl"
import Method from "@helpers/Method"
```

This time above statement has become a "beautiful <3" proper CommonJS import statement:
```javascript
var _Transaction = _interopRequireDefault(require("./Transaction"));
var _MongoUrl = _interopRequireDefault(require("../../helpers/MongoUrl"));
var _Method = _interopRequireDefault(require("../../helpers/Method"));
```

It is that - we got it! Right now, you can enjoy your pretty imports in your source code without any worries about your build behaviour.
Feel free for use and share this project :)

## Issues
### Limits
Unfortunately, plugin is not absolutelly free from any limits. There are a few of that:

>[!WARNING]
>Plugin read all tsconfig.json files, but only from single file location to root project dir. It doesn't read any neasted tsconfig.json file which isn't located in one of the path's part.
>For example: file located in ~/project/src/components/database will find tsconfig.json in ~/project/src/components and in ~/project but not in ~/project/src/tools

>[!WARNING]
>Plugin ommits the "extends" field. It takes care only about paths included in local tsconfig.json file just on place.

>[!WARNING]
>Plugin pays attention on "rootDir" and "rootDirs" fields and check if file supposed to be replaced is actually contained in this scope. The same is with "include" top-scoped field.
>But it must be noticed that plugin absolutelly ommits "exclude" top-scoped field and doesn't check if file is in excluded scope (only check if it is in included scope).

It is all. The most probably above limits will be removed in the future versions.

### Report issue
If you see any unexpected issues in my plugin behavior feel free for inform me about that. I am open to improve my software as much as it is possible.
To report your doubts, please vist an [Issue section](https://github.com/ArchAngel776/babel-plugin-typescript-path-aliases/issues) and report everything what you have seen as incorect.
