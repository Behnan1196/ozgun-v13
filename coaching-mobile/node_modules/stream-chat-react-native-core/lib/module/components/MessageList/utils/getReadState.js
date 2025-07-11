Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReadState = void 0;
var getReadState = exports.getReadState = function getReadState(message, read) {
  if (!read) {
    return 0;
  }
  var readState = Object.values(read).reduce(function (acc, readState) {
    if (!readState.last_read) {
      return acc;
    }
    if (message.created_at && message.created_at < readState.last_read) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return readState;
};
//# sourceMappingURL=getReadState.js.map