# be-eventful [WIP]

Add event handling to a region of DOM using easy to read/write notation.

be-eventful is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Lingo

In the example below, we provide multiple examples of saying the same thing.

The more structured examples are useful for:

1.  Doing multiple actions in bulk with the same parameters.
2.  Overcoming issues where the event name or the element name contain the key words:  on, of, do, increment.

```html
<div itemscope>
    <button>30</button>
    <script be-eventful='On click of button do increment count.'></script>
    <script be-eventful='{
        "affect": "$.beScoped",
        "On": ["clickOfButtonDoIncrementCount"]
    }'></script>
    <script be-eventful='
        {"affect": "$.beScoped"}
        On click of button do increment count.
    '></script>
    <script be-eventful='
        Set event listening scope to parent or root node.
        Affect $:beScoped.
        On click of button do increment count.
        
    '></script>
    <!-- TODO -->
    <script be-eventful='
        Affect host.
        Refer to $:beScoped. 
        On click of button do set count to count. 
    '>
    </script>
    <script be-eventful='{
        "affect": "$.beScoped", //optional?
        "onClickOfButtonDoIncrement": "count",
        "on": {
            "clickOfButtonDoIncrement": "count",
            "clickOfButtonDo": {
                "increment": "count"
            },
            "click$":{
                "of": "button",
                "do": {
                    "increment": "count"
                }
            }
        },
        "onClick$": {
            "of": "button",
            "do": [{
                "increment": "count"
            }]
        }
    }'>
    </script>
    
    
    <script be-eventful='{
        "affect": "$.beScoped",
        "on": ["clickOfButtonDoIncrementCount", {"clickOfButtonDo": {"increment": "count"}}]
    }'>
    </script>
    <!-- TODO -->
    <script nomodule be-eventful='{
        "affect": "$.beScoped",
        "onClickOfButtonEDoHandler": "myHandler"
    }'>
        export const myHandler = ({affected, event}) => {
            affected.count++;
        }
    </script>
    c
</div>
```

