const odd = '홀수 입니다.';
const even = '짝수 입니다.';

module.exports={odd,even};


//module.exports=[odd,even];


/*module.exports={
    odd:odd,
    even:even,
}; */

// 이것은 객체이며 odd, even 뒤읜 각 'odd', 'even',은 생략이 가능하다 (최신 문법에 의해 key, value 값이 같은 경우 생략)
//modeul.exports 에 의해 다른 js 파일에서도 odd,even 변수를 쓸 수 있다.