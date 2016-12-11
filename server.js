var express = require('express');
var app = express();
app.use('/node_modules',express.static('node_modules'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))
app.get('*', function(req, res) {
    res.sendfile('./index.html'); // load our public/index.html file
});
app.listen(3400, function () {
    console.log('listen on port 3400');
})
