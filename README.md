# be-eventful [TODO]

be-eventful is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Lingo

In the example below, we provide multiple examples of saying the same thing.

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-eventful='{
        "affect": "$.beScoped",
        "onClickOfButtonDoInc": "count",
        "on": {
            "clickOfButtonDoInc": "count",
            "click":{
                "of": "button",
                "do": [{
                    "inc": "count",
                }]
            }
        }
    }'>
    </script>
    <script nomodule  be-eventful='{
        "affect": "$.beScoped",
        "on": ["clickOfButtonDoIncCount", "clickOfButtonDo": {"inc": "count"}]
    }'>
    </script>
    <script nomodule be-eventful='{
        "affect": "$.beScoped",
        "onClickOfButtonHandler": "myHandler"
    }'>
        export const myHandler = ({affected, event}) => {
            affected.count++;
        }
</div>
```

