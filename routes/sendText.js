const fs = require('fs');
const path = require('path');
const tmpPath = path.join(__dirname, '../temp');
if(!fs.existsSync(tmpPath)){
    fs.mkdirSync(tmpPath);
}

function getLocalFilePath(p){
    console.log(p);
    var filePath = path.join(__dirname, "../temp", p.replace(/kpw/, ""));
    if (fs.existsSync(filePath)){
        return filePath;
    }else{
        return '';
    }
}


module.exports = function(req, res, next){
    var path = req.path;
    var localPath = getLocalFilePath(path);
    console.log('--',path, localPath);
    res.set("Content-Type","text/plain; charset=UTF-8");
    if(localPath){
        fs.createReadStream(localPath).pipe(res);
    }else{
        res.status(404);
        res.send('Not found: ' + path + '  ' + getLocalFilePath(localPath));
    }
};