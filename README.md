A# be-eventful [WIP]

Add event handling to a region of DOM using easy to read/write notation.

be-eventful is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Hemingway Notation

```html
<div be-scoped>
    <button>30</button>
    <script be-eventful='
        Capture parent events. //This is the default.
        Affect parent. //This is the default.
        Target beScoped:scope. //Not set by default.  //Special intervention for properties that start with be[\s] or be[A-Z].
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
        "eventListeningScope": "parent",
        "affect": "parent",
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
</div>
```