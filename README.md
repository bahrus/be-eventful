# be-eventful [TODO]

## Lingo

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-hydrated='{
        "affectAndObserve": "$.beScoped",
        "deriveCountAsNumberFrom": "button",
        "onClickOfButtonDoInc": "count",
        "passDownCountToButtonAs": "textContent"
    }'>
    </script>
</div>
```

which can be broken down to:

```html
<div itemscope>
    <button>30</button>
    <script nomodule  
        be-derived='{
            "affect": "$.beScoped",
            "countAsNumberFrom": "button"
        }' 
        be-eventful='{
            "affect": "$.beScoped",
            "clickOfButtonDoInc": "count"
        }'
        be-giving='{
            "observe": "$.beScoped",
            "countToButtonAs": "textContent"
        }'
    >
    </script>
</div>
```