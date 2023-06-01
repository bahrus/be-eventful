

```html
<div itemscope be-eventful='
    On click of button increment scope:count by 1.
    ^  ^     ^  numericProp itemprop pass value - 27 to scope:delta.
    ^  ^     ^  ^           ^        ^    ^     ^ 33 ^  $0:tabIndex.
'>
    <button>30</button>
    <data role=button itemprop=numericProp value=12345></data>
    <script be-eventful='
        On click of button trigger custom function.
    '>
        export const customFunction = ({event, scope, scopedElement}) => {

        }
    </script>
</div>
```