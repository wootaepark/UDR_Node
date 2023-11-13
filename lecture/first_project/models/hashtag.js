const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model{
    static initiate(sequelize){

        Hashtag.init({
            title:{
                type : Sequelize.STRING(15),
                allowNull : false,
                unique : true,
            },

        },
        {
            sequelize,
            timestamps : true,
            underscored : true,
            paranoid : true,
            modelName : 'Hashtag',
            tableName : 'hashtags',
            charset : 'utf8mb4',
            collate : 'utfmb4_general_ci',
        }
        
        )

    } // 테이블 정보 입력

    static associate(db){}
    // 테이블 관계 입력
}

//위 코드가 모델의 기본 꼴

module.exports = Hashtag;