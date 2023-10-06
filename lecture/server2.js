const http=require('http');
const fs=require('fs').promises;

const server =http.createServer(async(req,res)=>{

    try{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); 
    const data=await fs.readFile('./server2.html');
    res.end(data);}
    
    catch(error){
        console.error(error);
        res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'}); // plain 은 일반 문자열 취급
        res.end(err.message);
    }

})

    .listen(8080);

   

server.on('listening',()=>{
    console.log('8080 포트에서 대기 중 입니다.'); 
})
server.on('error',(error)=>{
    console.log(error);
})