const db = require("../models");
const Post = db.post;
const Vote = db.vote;

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
    var arr = post.votes;
    if (arr)
        post.votes.push(req.session.userID);
    else
        post.votes = [req.session.userID];
    if (post.quality)
        post.quality -= 1;
    else
        post.quality = -1;

    var vote = new Vote({vote: -1, user: req.session.userID, post: req.params.postId});
    vote.save((err, result) => {
        if (err) {
            console.error('saving vote error')
            return res.status(500).send({message: 'saving vote error'})
        }
    });
    await Post.findByIdAndUpdate({_id: req.params.postId}, post);
    res.redirect('/');
};
exports.not_fake = async (req, res) => {
    //var author = req.params.id
    var post = await Post.findOne({_id: req.params.postId});
    var arr = post.votes;
    if (arr)
        post.votes.push(req.session.userID);
    else
        post.votes = [req.session.userID];
    if (post.quality)
        post.quality += 1;
    else
        post.quality = 1;
    var vote = new Vote({vote: 1, user: req.session.userID, post: req.params.postId});
    vote.save((err, result) => {
        if (err) {
            console.error('saving vote error')
            return res.status(500).send({message: 'saving vote error'})
        }
    });
    await Post.findByIdAndUpdate({_id: req.params.postId}, post);
    res.redirect('/');
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
    post.save((err, result) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({message: 'saving post error'})
        }

        res.status(200).redirect('/');
    })

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


