const path = require('path');
const fs = require('fs');

// 运行cmd命令
// const iconv = require('iconv-lite');
let cp = require('child_process');
var binaryEncoding = 'binary';
var encoding = 'cp936';
// var nwPath = 'cmd /k start npm run nw';


function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    deleteFolder(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }
}

function copyFolder(from, to) {        // 复制文件夹到指定目录
    let files = [];
    if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function (file, index) {
            var targetPath = from + "/" + file;
            var toPath = to + '/' + file;
            if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
                copyFolder(targetPath, toPath);
            } else {                                    // 拷贝文件
                fs.copyFileSync(targetPath, toPath);
            }
        });
    } else {
        fs.mkdirSync(to);
        copyFolder(from, to);
    }
}

function copyFile(from, to) {        // 复制文件夹到指定目录
    fs.createReadStream(from).pipe(fs.createWriteStream(to))
}



function getFile(path) {
    const buff = fs.readFileSync(path)
    return buff.toString()
}

function writeFile(path, data, callback = function () { }) {
    fs.writeFile(path, data, callback)
}

function mkdirsSync(filepath) {
    const dirname = path.resolve(filepath)
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
}
function mkdirSyncSingle(filepath) {
    const dir = path.resolve(filepath)
    console.log('dir:', dir)
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir); 
    }
}

function existsSync(filepath) {
    const dir = path.resolve(filepath)
    console.log('dir:', dir)
    
    const isExist = fs.existsSync(dir)
    if(isExist) {
        const files = fs.readdirSync(dir)
        console.log('files:', files)
        return (files.length > 0)
    }
    return false
}
module.exports = {
    copyFolder,
    deleteFolder,
    copyFile,
    getFile,
    writeFile,
    mkdirSyncSingle,
    mkdirsSync,
    existsSync
}