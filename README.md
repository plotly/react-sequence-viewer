# react-sequence-viewer

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

##Description

A [React](https://facebook.github.io/react/) wrapper around the [BioJS](https://biojs.net/) [sequence-viewer](https://github.com/calipho-sib/sequence-viewer)
component.

## Installation

```
npm install --save react-sequence-viewer
```

## Usage

The following code renders a sequence-viewer component in the HTML
element with an ID of 'sequence-viewer1'.

**ES6**

```jsx
import React from 'react';
import {render} from 'react-dom';
import ReactSequenceViewer from 'react-sequence-viewer';

const mySeq = 'CAGTCGATCGTAGCTAGCTAGCTGATCGATGC';

render(React.createClass({
    render() {
        return (
            <ReactSequenceViewer sequence={mySeq} />
        );
    }
}),document.getElementsById('#sequence-viewer1'));
```

```jsx
import React from 'react';
import {render} from 'react-dom';
import ReactSequenceViewer from 'react-sequence-viewer';

const mySeq = 'CAGTCGATCGTAGCTAGCTAGCTGATCGATGC';
const options = {
    showLineNumbers: true,
    toolbar: false,
    search: false,
    title: "my sequence",
    badge: true,
};

render(React.createClass({
    render() {
        return (
            <ReactSequenceViewer sequence={mySeq} {...options} />
        );
    }
}),document.getElementsById('#sequence-viewer1'));
```

## Properties / Options

Please see the [Sequence Viewer documentation](https://cdn.rawgit.com/calipho-sib/sequence-viewer/master/examples/index.html)
for more details on the options below.


| Name | Description | Type | Required | Comment |
|:-----|:------------|------|----------|:--------|
| id | The ID to use for the Sequence Viewer container element | String | No |  |
| className | HTML class name to apply to the Sequence Viewer div container | String | No |  |
| sequence | The sequence to render. | String | Yes |  |
| selection | A region to highlight | Array | No | Not compatible with `coverage` |
| coverage | Advanced sequence hightlighting | Array[Objects] | No | Not compatible with `selection` |
| legend | Adds a legend to the sequence  |  Array[Objects] | No |  |
| onMouseSelection | Event handler for sequence selection with the mouse | function | No |  |
| onSubpartSelected | Event handler for sequence selected via the search box | function | No |  |

[build-badge]: https://img.shields.io/travis/FlyBase/react-sequence-viewer/master.png?style=flat-square
[build]: https://travis-ci.org/FlyBase/react-sequence-viewer

[npm-badge]: https://img.shields.io/npm/v/react-sequence-viewer.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-sequence-viewer

[coveralls-badge]: https://img.shields.io/coveralls/FlyBase/react-sequence-viewer/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/FlyBase/react-sequence-viewer
