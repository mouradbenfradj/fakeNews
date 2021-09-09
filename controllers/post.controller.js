const request = require('request');
const db = require("../models");
const Post = db.post;
const Vote = db.vote;
const User = db.user;

exports.addPost = async (req, res) => {
    req.session.returnTo = req.originalUrl;
    res.render("post/post");
};
exports.posts = async (req, res) => {
    //var author = req.params.id
    var posts = await Post.find({})
    res.send(posts)
};
exports.fake = async (req, res) => {
    //var author = req.params.id
    var post = await Post.findOne({_id: req.params.postId});
    var reps = 0;
    reps = req.session.user.reputation;
    post.quality -= reps;
    post.votes = reps;
    req.session.user.votes[post._id] = reps;
    var vote = new Vote({vote: reps, user: req.session.userID, post: req.params.postId});
    request.get('http://localhost:3000/getAllPosts', function (error, response, body) {
        request.post({
            url: 'http://localhost:3000/votePost/' + req.session.user.truffleAccount,
            body: {id: JSON.parse(body)[0].indexOf(post.news), real: false},
            json: true
        }, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            req.session.user.votes.push(req.params.postId);
            vote.save(async (err, result) => {
                if (err) {
                    console.error('saving vote error')
                    return res.status(500).send({message: 'saving vote error'})
                }

                delete req.session.user.roles;
                await User.findByIdAndUpdate({_id: req.session.userID}, req.session.user);
                await Post.findByIdAndUpdate({_id: req.params.postId}, post);
                res.redirect('/');
            });
        });
    });
};
exports.not_fake = async (req, res) => {
    //var author = req.params.id
    var post = await Post.findOne({_id: req.params.postId});
    var reps = 0;
    reps = req.session.user.reputation;
    post.quality += reps;
    post.votes = reps;
    var vote = new Vote({vote: reps, user: req.session.userID, post: req.params.postId});
    request.get('http://localhost:3000/getAllPosts', function (error, response, body) {
        request.post({
            url: 'http://localhost:3000/votePost/' + req.session.user.truffleAccount,
            body: {id: JSON.parse(body)[0].indexOf(post.news), real: true},
            json: true
        }, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            req.session.user.votes.push(req.params.postId);
            vote.save(async (err, result) => {
                if (err) {
                    console.error('saving vote error')
                    return res.status(500).send({message: 'saving vote error'})
                }

                delete req.session.user.roles;
                await User.findByIdAndUpdate({_id: req.session.userID}, req.session.user);
                await Post.findByIdAndUpdate({_id: req.params.postId}, post);
                res.redirect('/');
            });
        });
    });
};
exports.modifierVote = async (req, res) => {
    //var author = req.params.id
    var post = await Post.findOne({_id: req.params.postId});
    var vote = await Vote.findOne({post: req.params.postId, user: req.session.userID});
    var index = post.votes.indexOf(req.session.userID);
    if (index > -1) {
        post.votes.splice(index, 1);
        post.quality -= vote.vote;
        await Post.findByIdAndUpdate({_id: req.params.postId}, post);
        await vote.remove();
    }

    res.redirect('/');
};

exports.post = (req, res) => {
    console.log(req.body.news);
    var postData = req.body;
    postData.author = req.session.userID;

    var post = new Post(postData);
    request.post({
        url: 'http://localhost:3000/publishPost/' + req.session.user.truffleAccount,
        body: {title: postData.news, hash: postData.author},
        json: true
    }, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        post.save((err, result) => {
            if (err) {
                console.error('saving post error')
                return res.status(500).send({message: 'saving post error'})
            }
        })
        res.status(200).redirect('/');

    });


    /*request('http://127.0.0.1:5000/checknews/'+ req.body.news, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            postData.fake = JSON.parse(body);


            var post = new Post(postData)

            post.save((err, result) => {
                if (err) {
                    console.error('saving post error')
                    return res.status(500).send({ message: 'saving post error' })
                }

                res.status(200).send(post);
            })
        }*/
}


