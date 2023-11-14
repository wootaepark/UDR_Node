const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

const basename = path.basename(__filename); // index.js
fs.readdirSync(__dirname)
  .filter(file=>{ // 리눅스 배포시 . 은 숨김파일을 나타낸다.
    return file.indexOf('.')!==0 && file !== basename && file.slice(-3)==='.js'; 
    // 숨김파일 걸러내기, 그리고 .js로 끝나야한다. 이로서 모델이 아닌 파일이 들어가지 않도록 함
  })
  .forEach((file)=>{
    const model = require(path.join(__dirname, file));
    console.log(file,model.name);
    db[model.name] = model;
    model.initiate(sequelize); // initiate 해주고
  });

Object.keys(db).forEach(modelName=>{
  console.log(db, modelName);
  if(db[modelName].associate){
    db[modelName].associate(db); // initiate 한 것들을 다시 associate 한다. (initiate를 모두 하고 associate 해야함)
  }
})


module.exports = db;