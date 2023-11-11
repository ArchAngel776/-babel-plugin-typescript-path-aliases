# Babel Plugin - TypeScript path aliases
Babel plugin provide to resolving of path aliases used in tsconfig.json file.

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
