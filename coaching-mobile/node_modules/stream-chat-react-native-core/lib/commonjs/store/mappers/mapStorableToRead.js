Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStorableToRead = void 0;
var _mapStorableToUser = require("./mapStorableToUser");
var mapStorableToRead = exports.mapStorableToRead = function mapStorableToRead(row) {
  var lastRead = row.lastRead,
    unreadMessages = row.unreadMessages,
    user = row.user,
    lastReadMessageId = row.lastReadMessageId;
  return {
    last_read: lastRead,
    last_read_message_id: lastReadMessageId,
    unread_messages: unreadMessages,
    user: (0, _mapStorableToUser.mapStorableToUser)(user)
  };
};
//# sourceMappingURL=mapStorableToRead.js.map