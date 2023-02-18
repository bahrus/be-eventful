# be-eventful [TODO]

## Lingo

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-eventful='{
        "affectAndObserve": "$.beScoped",
        "deriveCountAsNumberFrom": "button",
        "onClickOfButtonDo": {
            "inc": "count"
        },
        "passDownCountToButton": "asTextContent"
    }'>
    </script>
</div>
```