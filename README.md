# Babel Plugin - TypeScript path aliases
Babel plugin provide to resolving of path aliases used in tsconfig.json file.

## Abstract
Each of us - TS developers - at the specific point of a bigger project meets with unsatisfying, unesthetic issue: **really long relative dir-up chain**. Is this view similar?
```typescript
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import ModelBase from "../../../foundations/ModelBase"
import Query from "../../../../../../tools/Query"
(and 36 more imports started with ../../../../../../)
```

To protect us from this kind of unesthetic TypeScript provides a special option like **path aliases**, which can be configured int our **tsconfig.json** file(s) contained in the whole project diretory.
Typical configuration requires two fields: **baseUrl** typically pointed to current dir **"."** and **paths** which is a dictionary of path prefix aliases and their original relative pointers. Typical structure looks like:
```json
{
  ...
  "baseUrl": ".",
  "paths": {
    "@data/*": ["src/data/*"],
    "@components/*": ["src/components/*"],
    ...
  },
  ...
}
```

It allows as to replace ugly, relative module import with such a more developer freindly paths. So in the result we can replace above, previous import statement with:
```typescript
import ModelSchema from "@data/interfaces/ModelSchema"
import ModelBase from "@foundations/ModelBase"
import Query from "@tools/Query"
(and 36 more imports started with @)
```

Chapeau bas, TypeScript creators - this feature makes me stop closing my eyes every time I open my app source module. 
