const Log = require("../model/logs");

const createLog = async (userId, action, toUserId, taskId) => {
  const log = await new Log({
    fromUser: userId,
    task: taskId,
    toUser: toUserId,
    actions: action,
  });
  return await log.save();
};

module.exports = {
  createLog,
};
