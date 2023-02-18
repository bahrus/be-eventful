# be-eventful [TODO]

## Lingo

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-eventful='{
        "affect": "$.beScoped",
        "derive": {
            "count": {
                "from": "button",
                "select": "textContent",
                "parseAs": "number"
            }
        },
        "onClickOf": "button", "do":{
            "inc": "count"
        }
    }'>
    </script>
</div>
```