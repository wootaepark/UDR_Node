const url = require('url');

const { URL } = url;

// 위 두줄은 쓰지 않아도 된다. url은 node 내장 객체이기 때문이다.

const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?secrate1=00100100#anchor'); // 경로는 그냥 예시이다
console.log('new URL():',myURL);
console.log('url.format():', url.format(myURL));
// myURL을 문자열로 바꾸려면 format을 이용한다.