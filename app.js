const http = require('http'); //require() is likr importing files packages

const fs = require('fs') //file system

//'/http' or './http' search for  absoute and relative paths in locally
//but "hhtp"  always looks fro a global module

const server= http.createServer((req,res)=>{ 
    console.log(req.url,req.headers,req.method);
    //process.exit() exits the sever when no loner request is there
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');              // write data 
        res.write('<head><title>node js page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    //url redirection to intial page
    if(url === '/message' && method === 'POST'){

        const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
        
        
        res.statusCode = 302; //for url redirection
        res.setHeader('Location','/');
        return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');              // write data 
    res.write('<head><title>node js page</title></head>');
    res.write('<body><h1>Hello to first node js page</h1></body>');
    res.write('</html>');
    res.end(); //no more data wil be taken ,can't use write after end()
}); //creates server
//(req,res) takes request response for a server

server.listen(3000); 
// listen()-waits for server request and keeps the server runnig.. takes port num as parameter