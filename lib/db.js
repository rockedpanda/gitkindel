'use strict';
const low = require('lowdb');
const MAX_TIME = 100 * 1000;
var db;

function init(dbFile) {
    // low(dbFile, {
    //     storage: require('lowdb/lib/storages/file-async')
    // });
    db = low(dbFile);
    //设置默认值
    db.defaults({ projects: [] }).write();
}

//检查项目是否存在
function isExist(name) {
  let p = db
    .get("projects")
    .find({ name: name })
    .value();
  return !!p;
}


//新增项目
function addProject(name) {
    if (isExist(userId)) {
        return false;
    }
    let p = {
        name: name,
        t: Date.now()
    }
    db.get('projects')
        .push(p)
        .write();
    return true;
}

//获取用户数量
function getSize() {
    return db.get('projects').size().value();
}

exports.init = init;
exports.isExist = isExist;
exports.addProject = addProject;
exports.getSize = getSize;