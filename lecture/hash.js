// sha512 알고리즘을 통해 '비밀번호' ,'다른비밀번호' 라는 문자열을 해시화 한 예제 

const crypto=require('crypto');

console.log('base 64 : ',crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex : ',crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64 : ',crypto.createHash('sha512').update('다른비밀번호').digest('base64'));