let port = 8080;
const express = require('express');
const app = express(); 
const bodyParser = require('body-parser')
function rawBody(req, res, next) {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function(){
        next();
    });
}
app.use(rawBody);
app.use('/', express.static(__dirname + '/'));
app.listen(port);

var solc = require('solc');

app.post('/toAbi', function (req, res) {
    if (req.rawBody) {
        let code = req.rawBody;
        const compiledCode = solc.compile(code);
        const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
        const byteCode = compiledCode.contracts[':Voting'].bytecode;
        res.send({abiDefinition: abiDefinition, byteCode: byteCode});
    } else {
        res.send("");
    }
});

console.log("Server started on port " + port + "!");
