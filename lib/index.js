'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = require('uuid');

var _sequenceViewer = require('sequence-viewer');

var _sequenceViewer2 = _interopRequireDefault(_sequenceViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSequenceViewer = function (_Component) {
  _inherits(ReactSequenceViewer, _Component);

  function ReactSequenceViewer(props) {
    _classCallCheck(this, ReactSequenceViewer);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleRef = _this.handleRef.bind(_this);

    if (props.selection && props.selection.length > 0 && props.coverage && props.coverage.length > 0) {
      console.warn("The selection and coverage options are not compatible with each other.");
    }
    // Initialize the sequence-viewer object.
    _this._seqObj = new _sequenceViewer2.default(_this.props.sequence);
    _this._div = null;
    return _this;
  }

  // Function to call the render function of sequence-viewer.
  // You can override existing props by passing an object with key value
  // pairs to override existing props.
  // e.g.
  // callRender({toolbar: false})
  // would override the existing toolbar setting.


  ReactSequenceViewer.prototype.callRender = function callRender() {
    var newProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _props = this.props,
        selection = _props.selection,
        props = _objectWithoutProperties(_props, ['selection']);

    // Read in div from private variable.


    var div = this._div;

    //Render div if it is not null.
    if (div !== null && this.props.sequence !== null) {
      var _seqObj;

      this._seqObj.render('#' + div.id, _extends({}, props, newProps));
      if (this.props.coverage.length > 0) this._seqObj.coverage(this.props.coverage);
      if (this.props.legend.length > 0) this._seqObj.addLegend(this.props.legend);
      if (selection.length > 0) (_seqObj = this._seqObj).selection.apply(_seqObj, selection);
    }
  };

  // When the component mounts, add a change listener to the document
  // and call render.  We attach the change listener here because
  // jQuery events don't bubble up through React due to its synthetic event
  // handling.  Thus, when a user toggles the charsPerLine drop down menu.
  // the event is handled by jQuery, but not seen by React when the
  // listener is attached at the component div level.
  // Attaching it to the document seems to work.


  ReactSequenceViewer.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('change', this.handleChange);
    this.callRender();
    this._seqObj.onSubpartSelected(this.props.onSubpartSelected);
    this._seqObj.onMouseSelection(this.props.onMouseSelection);
  };

  // Update the sequence-viewer object if we get a new DNA sequence.


  ReactSequenceViewer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.sequence !== nextProps.sequence) {
      this._seqObj = new _sequenceViewer2.default(nextProps.sequence);
    }
  };

  // Re-render if the component has updated.


  ReactSequenceViewer.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.callRender();
    }
  };

  // Remove the event listener when the component is unmounted.


  ReactSequenceViewer.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('change', this.handleChange);
  };

  // Function called when the user changes the charsPerLine setting via the toolbar.


  ReactSequenceViewer.prototype.handleChange = function handleChange(e) {
    var elem = e.target;
    // Check that the event was triggered by the right <select> button.
    if ((" " + elem.className + " ").indexOf(" " + this.props.seqLenClass + " ") > -1) {
      // Call render and override the charsPerLine setting with whatever the user specified.
      this.callRender({ charsPerLine: elem.value });
    }
  };

  ReactSequenceViewer.prototype.handleRef = function handleRef(div) {
    this._div = div;
  };

  // Render a div with the sequence-viwer widget in it.


  ReactSequenceViewer.prototype.render = function render() {
    var _props2 = this.props,
        id = _props2.id,
        sequence = _props2.sequence,
        className = _props2.className;
    // Create the container div and store a reference to it once it is mounted
    // in the DOM.  The componentDidMount function above will then get called
    // and render the widget.

    return _react2.default.createElement('div', { className: className, id: this.props.id, ref: this.handleRef });
  };

  return ReactSequenceViewer;
}(_react.Component);

exports.default = ReactSequenceViewer;


ReactSequenceViewer.propTypes = process.env.NODE_ENV !== "production" ? {
  id: _propTypes2.default.string,
  sequence: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  selection: _propTypes2.default.arrayOf(function (arr, key, compName, location, propFullName) {
    if (arr.length !== 3) {
      return new Error('Invalid prop `selection` supplied to `' + compName + '`. Validation failed.');
    }
  }),
  coverage: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    start: _propTypes2.default.number.isRequired,
    end: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string,
    bgcolor: _propTypes2.default.string,
    underscore: _propTypes2.default.bool,
    tooltip: _propTypes2.default.string,
    onclick: _propTypes2.default.func
  })),
  legend: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    color: _propTypes2.default.string,
    underscore: _propTypes2.default.bool
  })),
  seqLenClass: _propTypes2.default.string,
  onMouseSelection: _propTypes2.default.func,
  onSubpartSelected: _propTypes2.default.func
} : {};

ReactSequenceViewer.defaultProps = {
  id: (0, _uuid.v4)(),
  coverage: [],
  legend: [],
  selection: [],
  seqLenClass: "CPLChoice",
  onMouseSelection: function onMouseSelection(elem) {},
  onSubpartSelected: function onSubpartSelected(elem) {},
  className: ''
};
module.exports = exports['default'];