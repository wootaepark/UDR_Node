console.log(this);  // 이경우 this 는 전역이 아니다. (global)
console.log(this===module.exports);  // 이경우는 true이다.

function a(){  // 함수 내부의 경우 this는 global 이다.
    console.log(this===global);
}
a();

// 따라서 아래와 같이 사용 가능
// this.odd = odd;
// this.even = even; // 거의 쓰이지 않는다. (햇갈림)