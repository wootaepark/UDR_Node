const relationship2={
    name:'zero',
    friends:['nero','hero','xero'],
    logFriends(){
        this.friends.forEach(freind=>{
            console.log(this.name,freind);
        });
    },

}
relationship2.logFriends();