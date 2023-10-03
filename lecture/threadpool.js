const crypto=require('crypto');

const pass='pass';
const salt='salt';
const start=Date.now(); 

// 아래에 여덟번의 crypto 작업 수행
// 4개의 그룹씩 묶여서 돌아가는것을 시간과 출력 과정을 통해 알 수 있음

crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('1',Date.now()-start);
});
crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('2',Date.now()-start);
});
crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('3',Date.now()-start);
});
crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('4',Date.now()-start);
});
crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('5',Date.now()-start);
});
crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('6',Date.now()-start);
});
crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('7',Date.now()-start);
});
crypto.pbkdf2(pass,salt,1_000_000,128,'sha512',()=>{
    console.log('8',Date.now()-start);
});