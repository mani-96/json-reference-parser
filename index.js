function DereferenceJSON() {}

DereferenceJSON.prototype.dereference = function (json){
    try {
        this.json = json;
        if (typeof json == 'string') {
            this.json = JSON.parse(json);
        }
        this.dereferenceCache = {}
        return this.iterateJSON(this.json, this.json, [], []).value
    } 
    catch(e) {
        console.error('Failed to derefer ', e.message)
    }
}

DereferenceJSON.prototype.iterateJSON = function (obj, completeJSON, parents, processedObject) {
    let dereferenced;
    let result = {
        value: obj
    }
    if (processedObject.indexOf(obj) == -1) {
        if (obj && typeof obj === "object" && !ArrayBuffer.isView(obj)) {
          parents.push[obj];
          processedObject.push(obj);
        }
  
        if (this.isReference(obj)) {
          dereferenced = this.dereferenceReference(obj, completeJSON);
          result.value = dereferenced.value;
        } 
        else {
            for (let key of Object.keys(obj)) {
                let value = obj[key];
                if (this.isReference(value)) {
                    dereferenced = this.dereferenceReference(value, completeJSON);
                    obj[key] = dereferenced.value;
                } 
                else {
                    if (typeof value == "object" && parents.indexOf(value) == -1) {
                        dereferenced = this.iterateJSON(value, completeJSON, parents, processedObject);
                        if (obj[key] != dereferenced.value) {
                            obj[key] = dereferenced.value;
                        }
                    }
                }
            }
        }
    }
    parents.pop();
    return result;
}

DereferenceJSON.prototype.isReference = function(value) {    
    return (
        value &&
        typeof value === "object" &&
        typeof value.$ref === "string" &&
        value.$ref.length > 0 &&
        value.$ref.substr(0, 2) === "#/"
    );
}

DereferenceJSON.prototype.dereferenceReference = function(value, completeObject) {    
    let path = value.$ref.split("/").slice(1);
    if (this.dereferenceCache[path]) {
        return {
            value: this.dereferenceCache[path]
        }
    }
    let obj = path.reduce((a, v) => a[v], completeObject);
    return {
      value: obj
    };
}

module.exports = DereferenceJSON;

