const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const exec = require('child_process').exec;

var AdmZip = require('../lib/adm-zip/adm-zip.js');

function unZipToDir(filePath, dirPath){
    var zip = new AdmZip(filePath);    
    zip.extractAllTo(dirPath, true);
    // console.log('OK');
}

module.exports = function(req, res, next){
    var p = req.path;
    var localPath = p.replace('/kpw/','');
    var gitUrl = 'https://github.com/'+localPath+'/archive/master.zip';
    console.log('--',p, localPath);
    fetch(gitUrl).then(function(r){
        console.log(r);
        console.log(r.headers.raw());
        let info = localPath.split('/').filter(function(x){return !!x;});
        let username = info[0];
        let projectName = info[1];
        let zipPath = path.join(__dirname,'../temp',localPath.replace(/[\\/]/g,'_')+'.zip');
        const dest = fs.createWriteStream(zipPath);
        r.body.pipe(dest).on('close',function(){
            let userPath = path.join(__dirname,'../temp',username);
            if(!fs.existsSync(userPath)){
                fs.mkdirSync(userPath);
            }
            let projectPath = path.join(__dirname,'../temp',username, projectName);
            if(fs.existsSync(projectPath)){
                fs.renameSync(projectPath, path.join(userPath, projectName+'_'+Date.now()));
            }
            unZipToDir(zipPath, userPath);
            fs.renameSync(path.join(userPath, projectName+'-master'), projectPath);
            /*fs.renameSync(zipPath, path.join(userPath, 'master.zip'));
            exec(`unzip master.zip`,{cwd: userPath, windowsHide: true},function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('解压成功');
                    fs.unlinkSync(path.join(userPath, 'master.zip'));
                    fs.renameSync(path.join(userPath, projectName+'-master'), projectPath);
                }
            })*/
        });
    });
    res.set("Content-Type","text/plain; charset=UTF-8");
    res.send('OK '+localPath);
};