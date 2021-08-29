pragma solidity >=0.4.22 <0.7.0;

contract News {

    struct User {
        string username;
        string email;
        uint[] postes;
        uint[1000] votes;
        uint reputation;
    }

    struct Poste {
        bytes32 _hash;
        uint[] votes;
        string post;
        User author;
        uint quality;
    }


    mapping(address => User) public users;
    Poste[] public postes;


    function publishPoste(bytes32 __hash, string memory _post, string memory  _title) public {
        uint[] storage _votes;
        uint _quality = users[msg.sender].reputation;
        postes.push(Poste({
            _hash: __hash,
            votes: _votes,
            quality: _quality,
            post: _post,
            title: _title,
            author: users[msg.sender]
        }));
        users[msg.sender].postes.push(postes.length-1);
    }


    function votePoste(uint id, bool real) public {
        uint reps = 0;
        if (real == true){
            reps = users[msg.sender].reputation;
        }else{
            reps = -users[msg.sender].reputation;
        }
        postes[id].quality = postes[id].quality + reps;
        postes[id].votes.push(reps);
        users[msg.sender].votes[id] = reps;
    }


	function getNumberPostes() public view returns(uint){
		return postes.length;
	}



    function getAllPostes()
        public
        returns (string[] memory, string[] memory, uint[] memory , string[] memory, bytes32[] memory)
    {
        string[] memory titles = new string[](postes.length);
        string[] memory authors = new string[](postes.length);
        uint[] memory quality = new uint[](postes.length);
        string[] memory posts = new string[](postes.length);
        bytes32[] memory hashes = new bytes32[](postes.length);

        for (uint i = 0; i < postes.length; i++) {
            titles[i] = postes[i].title;
            authors[i] = postes[i].author.username;
            quality[i] = postes[i].quality;
            posts[i] = postes[i].post;
            hashes[i] = postes[i]._hash;
        }

        return (titles,authors,quality,posts,hashes);
    }


    function setUserData(address target, uint _reputation, string memory _username) public {
        users[target].reputation = _reputation;
        users[target].username = _username;
    }


	function getUserPostes(address addr) public view returns(uint[] memory){
		return users[addr].postes;
	}


	function getPoste(uint id) public view returns(string memory, string memory, uint, string memory, bytes32, uint[] memory) {
		return (postes[id].title, postes[id].author.username, postes[id].quality, postes[id].post, postes[id]._hash, postes[id].votes);
	}
}