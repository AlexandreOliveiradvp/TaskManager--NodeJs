const express = require('express');
var bodyParser = require('body-parser');
const path =  require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/view'));

var task = ['Estudar Node js'];

app.get('/', function(req,res){
    res.render('index',{taskList:task}); 
});

app.get('/deletar/:id',function(req,res){
    task = task.filter(function(val,index){
        if(index != req.params.id){
            return val;
        }
    });
    res.render('index',{taskList:task});
});

app.post('/',function(req,res){
    task.push(req.body.taskInput);
    res.render('index',{taskList:task});
})

app.listen(5000,function(){
    console.log('Servidor Rodando!');
});