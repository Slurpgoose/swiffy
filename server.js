const express = require('express');
const bcrypt = require('bcrypt');

//define app
const app = express();

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/logout', (req, res) => {
        req.session.destroy()
        res.redirect('/')
})

app.get('/login', (req, res) => {
        res.render('login', {
            content: 'Login!',
            content2: 'Welcome Back User',
            formid : '/login',
        });
})

app.post('/login', (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){
    db.users.count({ where: { email: username, password: hash} })
    .then((count) => {
        if (count==1){
            req.session.user = username;
            res.redirect('/home')
        }
        else {
            res.redirect('/login')
            }
        })
    })
})

app.get('/signup', (req, res) => {
    if (req.session.user != undefined) {
        res.redirect('/home')
    }
    else {
        res.render('login', {
            content: 'SignUp',
            content2: 'Sign up to see photos and videos from your friends.',
            formid : '/signup',
        });
    }
})

app.post('/signup', (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){ // the hash allows the password to be private 
        db.users.create({email:username, password: hash})
            .then(() => {
                req.session.username = username;
                res.redirect('/home')
            }).error((e) => {
                console.log(e);
                res.redirect('/signup');
            })
        });
})

app.get('/home', (req, res) => {
    res.render('home', {
        content: 'Logged In!',
        content2: 'Welcome Back User',
        formid : '/login',
    });
})

app.listen(4000, function(){
    console.log('Server Running on 4000...');
});