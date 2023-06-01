

```html
<div itemscope be-eventful='
    On click of button increment count of scope by 1.
    On click of numericProp itemprop pass value - 27 to scope:delta.
'>
    <button>30</button>
    <data role=button itemprop=numericProp value=12345>hello</div>
    <script be-eventful='
        On click of button trigger custom function.
    '>
        export const customFunction = ({event, scope, scopedElement}) => {

        }
    </script>
</div>
```