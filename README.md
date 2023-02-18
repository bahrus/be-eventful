# be-eventful [TODO]

## Lingo

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-eventful='{
        "affect": "$.beScoped",
        "deriveCountAsNumberFrom": "button",
        "onClickOfButtonDo": {
            "inc": "count"
        }
    }'>
    </script>
</div>
```