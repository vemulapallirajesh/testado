var express = require('express');
var app = express();
var path = require('path');
const useragent = require('express-useragent')
const port = 3000
const bodyParser = require('body-parser')
const rewriter = require('express-rewrite')


app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extend: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(useragent.express());


app.use('/', function(req, res, next) {
    const resp = req.useragent;
    if (!resp.isBot) {
        res.render("index.html", { name: 'I am not Bot' });
        //just render /index1.html => http://localhost:3000/index1.html
    } else {
        res.render("index.html", { name: JSON.stringify(req.useragent) });
        //just render /index1.html => https://service.prerender.io/http://localhost:3000/index1.html
    }
    next();
});


// viewed at http://localhost:8080
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.use(require('prerender-node').set('prerenderToken', 'rmQiXkkmyGGzx0eqXXyP'));

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});