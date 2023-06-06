var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);
var db = new sqlite3.Database('./database/database.db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

db.run('CREATE TABLE IF NOT EXISTS emp(id NUMBER, token TEXT)');

// Add
app.post('/add', function(req,res){
//crypto module
  const crypto = require("crypto");
  const algorithm = "aes-256-cbc"; 
  const initVector = crypto.randomBytes(16);
  const message = req.body.token;
  const Securitykey = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  console.log("Токен: " + req.body.token);
  console.log("Зашифрований токен: " + encryptedData);
  console.log("");

  db.serialize(()=>{
    db.run('INSERT INTO emp(id,token) VALUES(?,?)', [req.body.id, encryptedData], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("Дані були записані в БД");
      console.log("ID проєкту: "+req.body.id);
      console.log("Personal Access Token: "+encryptedData);
      res.redirect('http://localhost:3000/login_form.html')
    });
  });
});





const crowdin = require('@crowdin/crowdin-api-client');

// initialization of crowdin client
const {
  projectsGroupsApi,
  uploadStorageApi,
  sourceFilesApi,
  translationsApi
} = new crowdin.default({
  token: '04e7a28c07d7734e1c64a70c7e7df80a1c8ce47c47b690ff03940126d59aa8102ff436605f371a5d',
  // organization: 'organizationName' // optional
});

// get project list
projectsGroupsApi.listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));

// You can also use async/wait. Add `async` keyword to your outer function/method
async function getProjects() {
  try {
    const projects = await projectsGroupsApi.listProjects();
    console.log(projects);
  } catch (error) {
    console.error(error);
  }
}

// Create file with json content to translate

async function createFile() {
  const projectId = 592935;
  const fileData = {
    title: 'Example123213',
    description: 'Some Tex dfdfsdft'
  };
  const storage = await uploadStorageApi.addStorage('file3.json', fileData);
  const file = await sourceFilesApi.createFile(projectId, {
    name: 'fileeeee3.json',
    title: 'Sample fileeeeeeeeeee',
    storageId: storage.data.id,
    type: 'json'
  });
  console.log(file);
}

// Download translations
async function downloadTranslations() {
  const projectId = 123;
  const fileId = 456;
  const language = 'de';
  const downloadLink = await translationsApi.buildProjectFileTranslation(
    projectId,
    fileId,
    {
      targetLanguageId: language
    }
  );
  const response = await fetch(downloadLink.data.url);
  const translations = await response.json();
  console.log(translations);
}

server.listen(3000, function(){
  console.log("server is listening on port: 3000");
});


