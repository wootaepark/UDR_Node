//const value = require('./var');
// 노드 기본 제공 함수 require
// . 경로는 ..이 부모 였듯이, .은 자신과 동일한 폴더 위치를 뜻한다.

//console.log(value);

// 구조분해 할당

/* const odd = value.odd;
const even= value.even; 원래 이렇게 할 수 있는 것을 아래와 같이 구조 분해 할당을 통해 사용 가능*/


const {odd, even}=require('./var');

function checkOddOrEven(number){
    if(number % 2 ){
        return odd;
    }else{
        return even;
    }

}

module.exports = checkOddOrEven;

//module.exports!==exports ==={};