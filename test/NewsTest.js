const News = artifacts.require("./News.sol");
contract('News', function (accounts) {
    var newsInstance;
    var account1 = web3.eth.getAccounts().then(
        function (params) {
            account1 = params[0]
        }
    );
    it("empty values", function () {
        return News.deployed().then(function name(instance) {
            return instance.getNumberPosts()
        }).then(function (params) {
            assert.equal(params[0], undefined, "nombre postes")
        })
    })
})