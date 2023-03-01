# be-eventful [WIP]

Add event handling to a region of DOM using easy to read/write notation.

be-eventful is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Hemingway Notation

```html
<div be-scoped>
    <button>30</button>
    <script be-eventful='
        Set event listening realm to parent. //This is the default.
        Affect parent instance. //This is the default.
        Affect be scoped:scope of said instance.
        Set home in on path to be scoped:scope.  //Not set by default.  //Special intervention for properties that start with be[space].
        On click of button do increment count.
    '
    ></script>
</div>
```

## JavaScriptObjectNotation

```html
<div be-scoped>
    <button>30</button>
    <script be-eventful='{
        "eventListeningRealm": "parent",
        "elementToAffect": "parent",
        "homeInOnPath": "beDecorated.beScoped.scope",
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
</div>
```