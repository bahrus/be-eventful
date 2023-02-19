# be-eventful [TODO]

be-eventful is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Lingo

In the example below, we provide multiple examples of saying the same thing.

The more structured  examples are useful for:

1.  Doing multiple actions in bulk with the same parameters.
2.  Overcoming issues where the event name or the element name contain the key words:  on, of, do, inc.

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-eventful='{
        "affect": "$.beScoped",
        "onClickOfButtonEDoInc": "count",
        "on": {
            "clickOfButtonEDoInc": "count",
            "clickOfButtonEDo": {
                "inc": "count"
            },
            "click$":{
                "of": "button",
                "do": {
                    "inc": "count"
                }
            }
        },
        "onClick$": {
            "of": "button",
            "do": [{
                "inc": "count"
            }]
        }
    }'>
    </script>
    <script nomodule  be-eventful='{
        "affect": "$.beScoped",
        "on": ["clickOfButtonEDoIncCount", {"clickOfButtonDo": {"inc": "count"}}, {"clickOfButton": "doIncCount"}]
    }'>
    </script>
    <script nomodule be-eventful='{
        "affect": "$.beScoped",
        "onClickOfButtonEDoHandler": "myHandler"
    }'>
        export const myHandler = ({affected, event}) => {
            affected.count++;
        }
    </script>
</div>
```

