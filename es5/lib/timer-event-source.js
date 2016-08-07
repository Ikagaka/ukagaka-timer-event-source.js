'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerEventSource = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * タイマーイベントエミッタ
 * TODO: 将来的にWebWorkerなどにして精度を担保する
 */
var TimerEventSource = exports.TimerEventSource = function (_EventEmitter) {
  (0, _inherits3.default)(TimerEventSource, _EventEmitter);

  /**
   * constructor
   */
  function TimerEventSource() {
    (0, _classCallCheck3.default)(this, TimerEventSource);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TimerEventSource).call(this));

    _this._setInitialTimers();
    return _this;
  }

  (0, _createClass3.default)(TimerEventSource, [{
    key: '_setInitialTimers',
    value: function _setInitialTimers() {
      var _this2 = this;

      var _emitSecondEvent = this._emitSecondEvent.bind(this);
      setTimeout(function () {
        return _this2._setTimers(_emitSecondEvent);
      }, 1000 - new Date().getMilliseconds());
    }
  }, {
    key: '_setTimers',
    value: function _setTimers(_emitSecondEvent) {
      var time = new Date();
      // 9.999秒とかに最初に発火された時対策 初期誤差±500msにおさえる
      this._second = time.getSeconds() - 1 + time.getMilliseconds() > 500 ? 1 : 0;
      setTimeout(_emitSecondEvent, 0);
      setInterval(_emitSecondEvent, 1000);
    }
  }, {
    key: '_emitSecondEvent',
    value: function _emitSecondEvent() {
      var _this3 = this;

      this._second++;
      setTimeout(function () {
        return _this3.emit('second_change');
      }, 0);
      if (this._second % 60 === 0) {
        // イベントが遅延する場合を考えて
        this._second = 0;
        setTimeout(function () {
          return _this3.emit('minute_change');
        }, 0);
      }
    }
  }]);
  return TimerEventSource;
}(_events.EventEmitter);
//# sourceMappingURL=timer-event-source.js.map
