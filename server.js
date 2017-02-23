var express = require ('express');
var path = require ('path');
var bodyparser = require ('body-parser');


var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();
var morgan = require('morgan');
var port=3000;


//view engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine( 'html', require('ejs').renderFile);

//Logger
app.use(morgan('tiny'));

//set static folder

app.use(express.static(path.join(__dirname,'client')));

//Body-parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port,function(){
    console.log('server started on port   '+port);
});



