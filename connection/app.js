const contract = require('truffle-contract');
/*

const metacoin_artifact = require('../build/contracts/MetaCoin.json');
var MetaCoin = contract(metacoin_artifact);
*/

const news_artifact = require('../build/contracts/News.json');
var News = contract(news_artifact);

module.exports = {
    start: function (callback) {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        //MetaCoin.setProvider(self.web3.currentProvider);
        News.setProvider(self.web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        self.web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                console.log("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            self.accounts = accs;
            self.account = self.accounts[2];

            callback(self.accounts);
        });
    },

    votePost: function (sender, id, real, callback) {
        var self = this;

        News.setProvider(self.web3.currentProvider);

        var meta;
        News.deployed().then(function (instance) {
            meta = instance;
            return meta.votePost(id, real, {from: sender});
        }).then(function () {
            self.getPost(id, function (answer) {
                callback(answer);
            });
        }).catch(function (e) {
            console.log(e);
            callback("ERROR 404");
        });
    },
    setUserData: function (target, reputation, username, callback) {
        var self = this;

        News.setProvider(self.web3.currentProvider);

        var meta;
        News.deployed().then(function (instance) {
            meta = instance;
            return meta.setUserData(target, reputation, username, {from: sender});
        }).then(function () {
            self.getUserPosts(function (answer) {
                callback(answer);
            });
        }).catch(function (e) {
            console.log(e);
            callback("ERROR 404");
        });
    },


    getUserPosts: function (addr, callback) {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        News.setProvider(self.web3.currentProvider);

        var meta;
        News.deployed().then(function (instance) {
            meta = instance;
            return meta.getUserPosts(addr);
        }).then(function (value) {
            callback(value);
        }).catch(function (e) {
            console.log(e);
            callback("Error 404");
        });
    },
    getAllPosts: function (callback) {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        News.setProvider(self.web3.currentProvider);

        var meta;
        News.deployed().then(function (instance) {
            meta = instance;
            return meta.getAllPosts();
        }).then(function (value) {
            callback(value);
        }).catch(function (e) {
            console.log(e);
            callback("Error 404");
        });
    },
    getNumberPosts: function (callback) {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        News.setProvider(self.web3.currentProvider);

        var meta;
        News.deployed().then(function (instance) {
            meta = instance;
            return meta.getNumberPosts();
        }).then(function (value) {
            callback(value);
        }).catch(function (e) {
            console.log(e);
            callback("Error 404");
        });
    },

    getPost: function (id, callback) {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        News.setProvider(self.web3.currentProvider);

        var meta;
        News.deployed().then(function (instance) {
            meta = instance;
            return meta.getPost.call(id);
        }).then(function (value) {
            callback(value);
        }).catch(function (e) {
            console.log(e);
            callback("Error 404");
        });
    }/*,


    refreshBalance: function (account, callback) {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        MetaCoin.setProvider(self.web3.currentProvider);

        var meta;
        MetaCoin.deployed().then(function (instance) {
            meta = instance;
            return meta.getBalance.call(account, {from: account});
        }).then(function (value) {
            callback(value.valueOf());
        }).catch(function (e) {
            console.log(e);
            callback("Error 404");
        });
    },
    sendCoin: function (amount, sender, receiver, callback) {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        MetaCoin.setProvider(self.web3.currentProvider);

        var meta;
        MetaCoin.deployed().then(function (instance) {
            meta = instance;
            return meta.sendCoin(receiver, amount, {from: sender});
        }).then(function () {
            self.refreshBalance(sender, function (answer) {
                callback(answer);
            });
        }).catch(function (e) {
            console.log(e);
            callback("ERROR 404");
        });
    }*/
}
