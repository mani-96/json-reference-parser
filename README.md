[![Generic badge](https://img.shields.io/badge/Build-Passing-green.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/Mintained-yes-green.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/License-MIT-orange.svg)](https://shields.io/) 

# JSON Reference Parser
This package parses the json and dereferences reference '($ref)' objects inside it


### Installation
Run below command
``` 
npm install json-reference-parser
```

### Problem
Sometimes JSON may contain $ref that referes to other object inside the JSON,
``` Javascript
{
    "theme": {
      "$ref": "#/definitions/themes"
    }
    "definitions": {
        "themes": {
            "color": "blue",
            "material": false
        }
    }
}
```

### Solution
Using this package JSON given in problem statement can be passed to dereference method which would dereference all the references inside it
``` Javascript
{
    "theme": {
            "color": "blue",
            "material": false
    }
    "definitions": {
        "themes": {
            "color": "blue",
            "material": false
        }
    }
}
```

### Usage
```
import * as DereferenceJSON from json-reference-parser
...
var dereferenceObject = new DereferenceJSON();
dereferenceObject.dereference(json)
```

