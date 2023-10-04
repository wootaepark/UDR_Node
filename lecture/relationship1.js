var relationship1={
    name:'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function(){
        var that=this; // 여기서는 relationship1을 가리키는 this
        this.friends.forEach(function(friend){
            console.log(that.name,friend);
           // console.log(this.name,friend)
            
        });

    },
};
relationship1.logFriends();