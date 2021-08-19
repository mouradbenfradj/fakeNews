exports.posts = async (req, res) => {
    //var author = req.params.id
    var posts = await Post.find({})
    res.send(posts)
}

exports.post = (req, res) => {
    console.log(req.body.news);
    var postData = req.body;
    postData.author = req.userId;

    var post = new Post(postData);
    post.save((err, result) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({ message: 'saving post error' })
        }

        res.status(200).send(post);
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


