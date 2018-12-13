/**
 * Created by Administrator on 2015/10/18.
 */
var _ = require('lodash');
var async = require('async');
var permissionDao = require('../dao/permission_dao');

function Permissions() {
    this.permissionId = arguments[0] || 0;
    this.name = arguments[1] || '';
    this.parentId = arguments[2] || 0;
    this.route = arguments[3] || '';

    this.nodes = [];
}

module.exports = exports = Permissions;

exports.prototype.getFullTree = function(status, callback) {

    var self = this;

    function getPermissionTreeList(callback) {
        permissionDao.getPermissionList(status, function(err, result) {
            callback(err, result, self);
        });
    }

    async.waterfall([
        getPermissionTreeList,
        buildTreeData
    ], callback);
};

function buildTreeData(treeList, self, callback) {

    var groupList = _.groupBy(treeList, function(tree) {
        return tree.parentId;
    });

    _.mapKeys(groupList, function(value, key) {
        var parent = self;

        if (key != self.permissionId) {
            parent = _.find(treeList, function(child) {
                return child.permissionId == key;
            });
        }
        parent.nodes = value;
        
    });

    callback(undefined, self);
}