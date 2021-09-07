pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

contract News {
    struct Journalist {
        string name;
        string email;
        uint256[] articles;
        uint256[1000] votes;
        uint256 reputation;
    }

    struct Article {
        bytes32 _hash;
        uint256[] votes;
        string title;
        Journalist author;
        uint256 quality;
    }

    mapping(address => Journalist) public journalists;
    Article[] public articles;

    function publishArticle(bytes32 __hash, string memory _title) public {
        uint256[] storage _votes;
        uint256 _quality = journalists[msg.sender].reputation;
        articles.push(
            Article({
                _hash: __hash,
                votes: _votes,
                quality: _quality,
                title: _title,
                author: journalists[msg.sender]
            })
        );
        journalists[msg.sender].articles.push(articles.length - 1);
    }

    function voteArticle(uint256 id, bool real) public {
        uint256 reps = 0;
        if (real == true) {
            reps = journalists[msg.sender].reputation;
        } else {
            reps = -journalists[msg.sender].reputation;
        }
        articles[id].quality = articles[id].quality + reps;
        articles[id].votes.push(reps);
        journalists[msg.sender].votes[id] = reps;
    }

    function getNumberArticles() public view returns (uint256) {
        return articles.length;
    }

    function getAllArticles()
        public
        returns (
            string[] memory,
            string[] memory,
            uint256[] memory,
            bytes32[] memory
        )
    {
        string[] memory titles = new string[](articles.length);
        string[] memory authors = new string[](articles.length);
        uint256[] memory quality = new uint256[](articles.length);
        bytes32[] memory hashes = new bytes32[](articles.length);

        for (uint256 i = 0; i < articles.length; i++) {
            titles[i] = articles[i].title;
            authors[i] = articles[i].author.name;
            quality[i] = articles[i].quality;
            hashes[i] = articles[i]._hash;
        }

        return (titles, authors, quality, hashes);
    }

    function setJournalistData(
        address target,
        uint256 _reputation,
        string memory _name
    ) public {
        journalists[target].reputation = _reputation;
        journalists[target].name = _name;
    }

    function getUserArticles(address addr)
        public
        view
        returns (uint256[] memory)
    {
        return journalists[addr].articles;
    }

    function getArticle(uint256 id)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            bytes32,
            uint256[] memory
        )
    {
        return (
            articles[id].title,
            articles[id].author.name,
            articles[id].quality,
            articles[id]._hash,
            articles[id].votes
        );
    }
}
