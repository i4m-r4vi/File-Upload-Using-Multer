const express = require('express')
const multer = require('multer')
const app=express()
var PORT = 3000

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

var upload=multer({storage:storage})

app.use(express.static(__dirname+'/public'));
app.use('/uploads',express.static('uploads'));

app.post('/profile-upload-single',upload.single('profile-file'),(req,res,next)=>{
    var respone= `<a href="/">Home</a><br>`
    respone+=`<p>File Upload Successfully</p><br>`
    respone+=`<img src='${req.file.path}' height="200px" width="200px" style="border-radius: 50%;" /><br>`
    console.log(JSON.stringify(req.file));
    return res.send(respone)
})

app.post('/profile-upload-multiple', upload.array('profile-files',20), (req, res, next)=>{
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for(var i=0;i<req.files.length;i++){
    response += `<img src="${req.files[i].path}" height="200px" width="200px" style="border-radius: 50%;" /><br>`
    }
     return res.send(response)
})

app.listen(PORT,()=>{
    console.log('Listening on',PORT);
})