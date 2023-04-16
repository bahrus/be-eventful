# be-eventful

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/be-eventful)
[![Playwright Tests](https://github.com/bahrus/be-importing/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-eventful/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-eventful.png)](http://badge.fury.io/js/be-eventful)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-eventful?style=for-the-badge)](https://bundlephobia.com/result?p=be-eventful)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-eventful?compression=gzip">

Add event handling to a region of DOM using easy to read/write notation.

be-eventful is one decorator among a triumvirate of decorators that roll up to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Hemingway Notation

```html
<div be-scoped>
    <button>30</button>
    <div data-d=9>hello</div>
</div>
<script nomodule be-eventful='
    Capture previous element sibling events. //This is the default.
    Affect previous element sibling. //This is the default.
    Target beScoped:scope. //Not set by default.  //Special intervention for properties that start with be[\s] or be[A-Z].
    On click of button increment count.
    On click of button trigger custom function.
'
>
    export const customFunction = ({event, host}) => {

    }
</script>
```

If there are no custom functions inside the script tag, leave off the nomodule attribute.

In this scenario, it may be more convenient to adorn a template element with the eventful instructions, rather than a script element.  Particularly, when combining forces with [be-derived](https://github.com/bahrus/be-derived).  That is also supported:

```html
<div be-scoped>
    <button>30</button>
    <div data-d=9>hello</div>
</div>
<template nomodule be-eventful='
    Capture previous element sibling events. //This is the default.
    Affect previous element sibling. //This is the default.
    Target beScoped:scope. //Not set by default.  //Special intervention for properties that start with be[\s] or be[A-Z].
    On click of button increment count.
'
>
</template>
```

## JavaScriptObjectNotation

```html
<div be-scoped>
    <button>30</button>
</div>
<script be-eventful='{
    "capture": "previousElementSibling",
    "affect": "previousElementSibling",
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
```

## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-importing/be-eventful.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-eventful';
</script>
```