var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAudioPlayer = void 0;
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _react = require("react");
var _native = require("../native");
var useAudioPlayer = exports.useAudioPlayer = function useAudioPlayer(props) {
  var soundRef = props.soundRef;
  var isExpoCLI = _native.NativeHandlers.SDK === 'stream-chat-expo';
  var playAudio = (0, _react.useCallback)((0, _asyncToGenerator2.default)(function* () {
    if (isExpoCLI) {
      var _soundRef$current;
      if ((_soundRef$current = soundRef.current) != null && _soundRef$current.playAsync) {
        yield soundRef.current.playAsync();
      }
    } else {
      var _soundRef$current2;
      if ((_soundRef$current2 = soundRef.current) != null && _soundRef$current2.resume) {
        soundRef.current.resume();
      }
    }
  }), [isExpoCLI, soundRef]);
  var pauseAudio = (0, _react.useCallback)((0, _asyncToGenerator2.default)(function* () {
    if (isExpoCLI) {
      var _soundRef$current3;
      if ((_soundRef$current3 = soundRef.current) != null && _soundRef$current3.pauseAsync) {
        yield soundRef.current.pauseAsync();
      }
    } else {
      var _soundRef$current4;
      if ((_soundRef$current4 = soundRef.current) != null && _soundRef$current4.pause) {
        soundRef.current.pause();
      }
    }
  }), [isExpoCLI, soundRef]);
  var seekAudio = (0, _react.useCallback)(function () {
    var _ref3 = (0, _asyncToGenerator2.default)(function* (currentTime) {
      if (isExpoCLI) {
        if (currentTime === 0) {
          var _soundRef$current5;
          if ((_soundRef$current5 = soundRef.current) != null && _soundRef$current5.replayAsync) {
            yield soundRef.current.replayAsync({
              positionMillis: 0,
              shouldPlay: false
            });
          }
        } else {
          var _soundRef$current6;
          if ((_soundRef$current6 = soundRef.current) != null && _soundRef$current6.setPositionAsync) {
            yield soundRef.current.setPositionAsync(currentTime * 1000);
          }
        }
      } else {
        var _soundRef$current7;
        if ((_soundRef$current7 = soundRef.current) != null && _soundRef$current7.seek) {
          soundRef.current.seek(currentTime);
        }
      }
    });
    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), [isExpoCLI, soundRef]);
  var changeAudioSpeed = (0, _react.useCallback)(function () {
    var _ref4 = (0, _asyncToGenerator2.default)(function* (speed) {
      var _soundRef$current8;
      if (!isExpoCLI) {
        return;
      }
      if ((_soundRef$current8 = soundRef.current) != null && _soundRef$current8.setRateAsync) {
        yield soundRef.current.setRateAsync(speed, true, 'high');
      }
    });
    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }(), [isExpoCLI, soundRef]);
  return {
    changeAudioSpeed: changeAudioSpeed,
    pauseAudio: pauseAudio,
    playAudio: playAudio,
    seekAudio: seekAudio
  };
};
//# sourceMappingURL=useAudioPlayer.js.map