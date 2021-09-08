pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

contract News {
    struct User {
        string username;
        string email;
        uint256[] postes;
        uint256[1000] votes;
        uint256 reputation;
    }

    struct Post {
        uint256[] votes;
        string title;
        User author;
        uint256 quality;
    }

    mapping(address => User) public users;
    Post[] public postes;

    function publishPost( string memory _title, uint256[] memory _votes) public {
        uint256 _quality = users[msg.sender].reputation;
        postes.push(
            Post({
            votes: _votes,
            quality: _quality,
            title: _title,
            author: users[msg.sender]
            })
        );
        users[msg.sender].postes.push(postes.length - 1);
    }

    function votePost(uint256 id, bool real) public {
        uint256 reps = 0;
        if (real == true) {
            reps = users[msg.sender].reputation;
        } else {
            reps = -users[msg.sender].reputation;
        }
        postes[id].quality = postes[id].quality + reps;
        postes[id].votes.push(reps);
        users[msg.sender].votes[id] = reps;
    }

    function getNumberPosts() public view returns (uint256) {
        return postes.length;
    }

    function getAllPosts() public view  returns (string[] memory, string[] memory, uint256[] memory)
    {
        string[] memory titles = new string[](postes.length);
        string[] memory authors = new string[](postes.length);
        uint256[] memory quality = new uint256[](postes.length);

        for (uint256 i = 0; i < postes.length; i++) {
            titles[i] = postes[i].title;
            authors[i] = postes[i].author.username;
            quality[i] = postes[i].quality;
        }

        return (titles, authors, quality);
    }

    function setUserData(address target, uint256 _reputation, string memory _username) public {
        users[target].reputation = _reputation;
        users[target].username = _username;
    }

    function getUserPosts(address addr) public view returns (uint256[] memory)
    {
        return users[addr].postes;
    }

    function getPost(uint256 id) public view returns ( string memory, string memory, uint256, uint256[] memory )
    {
        return (postes[id].title, postes[id].author.username, postes[id].quality, postes[id].votes);
    }
}
