var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config()
var cron = require('node-cron');
var axios = require('axios');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

cron.schedule('*/10 * * * *', () => {
  axios.get('https://file-metadata-a1d1.onrender.com/')
     .then(resonse => {
       console.log('Server Pinged successfully');
     })
     .catch(error => {
       console.log(error);
     });
})




app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res) => {
  const file = req.file
  if(!file){
    res.json({error:'No file selected'})
  }
  res.json({name:file.originalname,type:file.mimetype,size:file.size})
})




const port = 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
