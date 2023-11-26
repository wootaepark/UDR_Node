const Hashtag = require('../models/hashtag');
const Post = require('../models/post');
exports.afterUploadImage = (req,res) => {
    console.log(req.file); // 뭐가 들어있는지 보고 싶으면 찍어보기
    res.json({url : `/img/${req.file.filename}`});  // 이미지 업로드 종료시 이미지의 url 을  프론트로 보냄

    // 프론트 에서는 게시글 업로드 시 url을 다시 보낸다.
};

exports.uploadPost = async (req,res,next) =>{

    //req.body.content, req.bdoy.url 이 프런트에서 넘어옴 


    try{

        const post = await Post.create({
            content : req.body.content,
            img : req.body.url,
            UserId: req.user.id, // 아래 주석 방법으로도 가능 (아래는 쿼리를 두번 날림) 
           
        }); 
        // await post.adduser(req.user.id);


         // 게시글 #해시태그1 #해시태그2 -> 여기서 해시태그만 추출해보기
         const hashtags = req.body.content.match(/#[^\s#]*/g); // 정규 표현식 이용 해시태그만 추출
         if(hashtags){
            const result = await Promise.all(hashtags.map((tag)=>{
                return Hashtag.findOrCreate({// 시퀄라이즈에서 제공 (findOrCreate)
                    where : {title : tag.slice(1).toLowerCase()}
                    // tag.slice(1)을 통해 #을 제거한다. 대문자가 있으면 모두 소문자로 만듬
                });
            }));
            console.log('result',result); // result에 해시태그 정보가 담겨있음
            await post.addHashtags(result.map(r=>r[0]));
            // 게시글 post 와 result 를 연결시켜준다. (다대다 관계 형성)
            
         }
         res.redirect('/');
       
      
    }catch(error){
        console.error(error);
        next(error);
    }
};