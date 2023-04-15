# be-eventful

Add event handling to a region of DOM using easy to read/write notation.

be-eventful is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Hemingway Notation

```html
<div be-scoped>
    <button>30</button>
    <div data-d=9>hello</div>
</div>
<script nomodule be-eventful='
    Capture previous element sibling events. //This is the default.
    Affect previous element sibling. //This is the default.
    Target beScoped:scope. //Not set by default.  //Special intervention for properties that start with be[\s] or be[A-Z].
    On click of button increment count.
    On click of button trigger custom function.
'
>
    export const customFunction = ({event, host}) => {

    }
</script>
```

If there are no custom functions inside the script tag, leave off the nomodule attribute.

In this scenario, it may be more convenient to adorn a template element with the eventful instructions, rather than a script element.  Particularly, when combining forces with [be-derived](https://github.com/bahrus/be-derived).  That is also supported:

```html
<div be-scoped>
    <button>30</button>
    <div data-d=9>hello</div>
</div>
<template nomodule be-eventful='
    Capture previous element sibling events. //This is the default.
    Affect previous element sibling. //This is the default.
    Target beScoped:scope. //Not set by default.  //Special intervention for properties that start with be[\s] or be[A-Z].
    On click of button increment count.
'
>
</template>
```

## JavaScriptObjectNotation

```html
<div be-scoped>
    <button>30</button>
</div>
<script be-eventful='{
    "capture": "previousElementSibling",
    "affect": "previousElementSibling",
    "target": "beDecorated.scoped.scope",
    "on": {
        "click": [{
            "of": "button",
            "do": [{
                "increment": "count"
            }]
        }]
    }
}'
></script>
```