const Sequelize = require('sequelize');
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
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

// (위) 각 모델들은 재사용되기 때문에 편리하게 하나의 객체로 묶어놓음 (db={}), 나중에 이 객체만 연결해도 됨


// 각 모델의 initiage, associate를 한번 씩은 호출해줘야한다.
User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiage(sequelize);
User.associate(db);
Post.associate(db);
Hashtag.associate(db);


module.exports = db;