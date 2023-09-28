const path = require('path');

path.join(__dirname,'var.js');

// \learning_node\lecture\var.js 형식으로 합쳐준다. (윈도우 환경)
// /learning_node/lecture/var.js (맥 환경) POSIX (맥+리눅스환경을 합친 용어)

path.join(__dirname,'..','var.js');
// 위 경우 부모 폴더로 한번 올라가기 때문에 경로는 아래와 같이
// \learning_node\var.js 이다.

// path.resolve(__dirname,'..','./var.js');
// 위와 같이 /var 앞에 . 이 있으면 현재 폴더안의 var.js 이지만

path.resolve(__dirname,'..','/var.js');
// 위와 같이 . 이 없으면 이 경우는 절대 경로로서 가장 상위 폴더의 var.js 를 나타내는 것이며
// 윈도우면 C: 가 될 것이다.

console.log(path.join(__dirname,'..','/var.js'));
console.log(path.resolve(__dirname,'..','/var.js'));

// join 의 경우 / 가 있어도 상대경로로 취급되어 / 가 무시되고
// resolve 의 경우 /가 있으면 절대 경로로 취급되어 __dirname 과 .. 과 같은 경로 지정이 무시된다.
// 그냥 무조건 최상위 폴더 하위에 var.js로 합친다.