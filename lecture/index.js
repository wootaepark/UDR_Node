const {odd, even}=require('./var'); // 구조 분해 할당 시에는 왼쪽의 변수명이 속성명과 동일해야 한다. (커스터마이징 불가)
const checkNumber=require('./func'); // 변수명은 마음대로 가능하다, 넘겨져 오는것은 module.exports 로 정해져 있기 때문

function checkStringOddOrEven(str){
    if(str.length % 2){
        return odd;

    }else {
        return even;
    }

}
console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));