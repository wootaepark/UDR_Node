const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            email:{
                type: Sequelize.STRING(40),
                allowNull : true,
                unique : true,
                
            },

            nick : {
                type : Sequelize.STRING(15),
                allowNull : false,
                unique : true,
            },

            password : {
                type : Sequelize.STRING(100), // 비밀번호는 암호화 되면 길어지기 때문에 넉넉하게
                allowNull : true,

            },

            provider : {
                type : Sequelize.ENUM('local','kakao'), // local 아니면 kakao 둘중 하나만 적게끔 제한을 둔다.
                allowNull : false,
                defaultValue : 'local',

            },
            snsId : {
                type : Sequelize.STRING(50),
                allowNull : true,
            },// 이메일이 없는 경우 snsId로 가입





        },
        {
            sequelize,
            timestamps : true, // createdAt, updatedAt
            underscored : false, // _ 를 쓰는가 안 쓰는가의 차이 
            modelName : 'User', // js 에서 쓰는 모델
            tableName : 'users', // db에서 쓰는 테이블 명
            paranoid : true, // deletedAt 이 추가 (유저 삭제 시간) , softdelete (추후 복구 가능도록)
            charset : 'utf8',
            collate : 'utf8_general_ci', // 저장된 문자를 어떤 식으로 정렬할 지

        }
        
        )

    } // 테이블 정보 입력

    static associate(db){
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User,{ // 팔로워
            foreignKey : 'followingId',
            as: 'Followers',
            through : 'Follow'
        })
        db.User.belongsToMany(db.User,{ // 팔로잉
            foreignKey : 'followerId',
            as: 'Followings',
            through : 'Follow'
        })
    }
    // 테이블 관계 입력
}

//위 코드가 모델의 기본 꼴

module.exports = User;