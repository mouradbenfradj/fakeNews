var createError = require('http-errors');
const express = require('express');
var path = require('path');
var favicon = require("serve-favicon");
var cookieParser = require('cookie-parser');

const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
var logger = require('morgan');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const session = require('express-session');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
const cors = require("cors");
const dbConfig = require('./config/db.config');
const db = require("./models");
const Role = db.role;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authRoutes = require('./routes/auth.routes');
var userRouter = require('./routes/user.routes');
var postRouter = require('./routes/post.routes');

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(session({
    secret: 'geeksforgeeks',
    saveUninitialized: true,
    resave: true
}));

app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "public", "ico", "favicon.ico")));
app.use(express.static(path.join(__dirname, 'public')));

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.use('/', indexRouter);
app.use('/api/auth/', authRoutes);
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/api/users', userRouter);


app.use('/truffle', express.static('public_static'));

app.get('/getAccounts', (req, res) => {
    console.log("**** GET /getAccounts ****");
    truffle_connect.start(function (answer) {
        res.send(answer);
    })
});
/*
app.post('/getBalance', (req, res) => {
    console.log("**** GET /getBalance ****");
    console.log(req.body);
    let currentAcount = req.body.account;

    truffle_connect.refreshBalance(currentAcount, (answer) => {
        let account_balance = answer;
        truffle_connect.start(function (answer) {
            // get list of all accounts and send it along with the response
            let all_accounts = answer;
            response = [account_balance, all_accounts]
            res.send(response);
        });
    });
});*/

app.post('/publishPost/:id', (req, res) => {
    let hash = req.body.hash;
    let title = req.body.title;
    //var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    truffle_connect.start(function (answer) {
        console.log(answer[req.params.id]);
        truffle_connect.publishPost(answer[req.params.id], hash, title, (answer) => {
            res.send(answer);
        });
    });
});

app.post('/votePost/:idpost', (req, res) => {
    console.log("**** GET /votePost ****");
    let id = req.body.id;
    let real = req.body.real;
    truffle_connect.start(function (answer) {
        console.log(answer[req.params.idpost]);
        truffle_connect.votePost(answer[req.params.idpost], id, real, (answer) => {
            res.send(answer);
        });
    })
});
app.get('/getNumberPosts', (req, res) => {
    //var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    truffle_connect.getNumberPosts((answer) => {
        res.send(answer);

    });
});

app.get('/getAllPosts', (req, res) => {
    //var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    truffle_connect.getAllPosts((answer) => {
        res.send(answer);
    });
});


app.post('/setUserData/:id', (req, res) => {
    console.log("**** GET /setUserData ****");
    let reputation = req.body.reputation;
    let username = req.body.username;
    truffle_connect.start(function (answer) {
        console.log(answer[req.params.id]);
        truffle_connect.setUserData(answer[req.params.id], reputation, username, (answer) => {
            res.send(answer);
        });
    })
});


app.post('/getUserPosts/:id', (req, res) => {
    console.log("**** GET /getUserPosts ****");
    truffle_connect.start(function (answer) {
        console.log(answer[req.params.id]);
        truffle_connect.getUserPosts(answer[req.params.id], (answer) => {
            res.send(answer);
        });
    })
});

app.get('/getPost/:id', (req, res) => {
    //var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    truffle_connect.getPost(req.params.id, (answer) => {
        let account_balance = answer;
        res.send(answer);

    });
});

/*
app.post('/sendCoin', (req, res) => {
    console.log("**** GET /sendCoin ****");
    console.log(req.body);

    let amount = req.body.amount;
    let sender = req.body.sender;
    let receiver = req.body.receiver;

    truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
        res.send(balance);
    });
});*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

app.listen(port, () => {

    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

    console.log("Express Listening at http://localhost:" + port);

});
