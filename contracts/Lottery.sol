pragma solidity ^0.4.21;

contract Lottery {
    address public manager;
    address[] public players;                   //an array (dynamic) of palyers addressies
    

    //@dev: Constructor
    constructor () public {
        manager = msg.sender;                   //address of person who created the contract
    }
    
    //@dev: enter and coolect players addressies
    function enter() public payable {           
       require(msg.value >.01 ether);           //glogal function.validate boolen expresion
       players.push(msg.sender);                //and add the player's address to the players array
    }
    
    //@dev: create random number generator
    function random() private view returns(uint) {
        /*Current block difficulty
         *current time
         *address of players */
        
        //SHA3 / keccak256 Algorithm
        return uint(keccak256(block.difficulty, now, players));
    }
    
    //@dev: pick the random winer player
    //@pre : call rand() % players.length 
    //@pos: random number index ( 0 - players.length) winner created
    function pickWinner() public restricted {
        uint index = random()%players.length;
        players[index].transfer(this.balance);  // transfer all to given index address
        //lastWinner = players[index];          //tell who was the last winner
        players = new address[](0);             // creates a brand new empty dynamic array of type address
    }
    
    //@dev: function modifier
    modifier restricted() {
        require(msg.sender == manager);         //Only manager can call pickWinner
        _;                                      // ' _; ' run rest of the code of the function
    }
    
    //@dev: return ALL players 
    function getPlayers() public view returns(address[]) {
        return players;
    }

}

