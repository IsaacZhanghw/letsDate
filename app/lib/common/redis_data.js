
function RedisData(redisClient) {
    this.redisClient = redisClient;
}

function getRedisObj(preName, userID, callback) {
    this.redisClient.get(preName + userID, function(err, _results) {
        callback(err, _results);
    });
}

function setRedisObj(preName, userID, objValue, clearTime) {
    this.redisClient.set(preName + userID, objValue);
    if (clearTime !== 0) {
        this.redisClient.expire(preName + userID, clearTime);
    }
}

module.exports = exports = RedisData;

exports.prototype.getRedisObj = getRedisObj;
exports.prototype.setRedisObj = setRedisObj;