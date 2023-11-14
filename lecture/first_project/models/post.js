const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static initiate(sequelize){

        Post.init({
            
            content: {
                type : Sequelize.STRING(140),
                allowNull : false,

            
            },
            image : { // 이미지의 경우 이경우는 하나만 올리는데, 여러개를 올리는 경우 별도의 테이블로
                      // 관계를 정의해주는게 좋다. 게시글 1, 이미지 n (1:n 관계)
                type : Sequelize.STRING(200), 
                allowNull : true,


            },

           
           
        }, {
                sequelize,
                timestamps : true,
                underscored : false,
                paranoid : false,
                modelName : 'Post',
                tableName : 'posts',
                charset : 'utf8mb4',
                collate : 'utf8mb4_general_ci',

            })

    } // 테이블 정보 입력

    static associate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, {through : 'PostHashTag'});
 // 중간테이블 'PostHashTag' 있다.
    }
    // 테이블 관계 입력
}

//위 코드가 모델의 기본 꼴

module.exports = Post;