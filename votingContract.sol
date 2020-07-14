pragma solidity ^0.5.0;

contract votingContract{

  struct Voters{
      uint weightOfVote;
      bool ifVoted;
  }

  struct Candidates{
      string name;
      uint numberOfVote;
  }

    mapping(address => Voters) voters;
    Candidates[] public candidatesArr;
    address public theowner;

    constructor(string memory _can1, string memory _can2, string  memory _can3) public{
        candidatesArr.push(Candidates({name : _can1,numberOfVote : 0}));
        candidatesArr.push(Candidates({name : _can2,numberOfVote : 0}));
        candidatesArr.push(Candidates({name : _can3,numberOfVote : 0}));
        theowner = msg.sender;
    }

    //confirm the voters who can vote

    function grantToVoters(address _address) public {
        require(msg.sender == theowner && !voters[_address].ifVoted);
        voters[_address] = Voters({weightOfVote : 1, ifVoted : false});
    }

    //after authorization,the candidate could click poll only once

    function votersPoll(uint _index) public{
        candidatesArr[_index].numberOfVote += voters[msg.sender].weightOfVote;
        if(voters[msg.sender].weightOfVote <= 0){
          return;
        }
        voters[msg.sender].weightOfVote = 0;
        voters[msg.sender].ifVoted = true;
    }

    //count the number of votes with the relevant candidate

    function getNameAndVotes() public view returns (string memory, uint, string memory, uint, string memory, uint){
      return(candidatesArr[0].name, candidatesArr[0].numberOfVote,candidatesArr[1].name, candidatesArr[1].numberOfVote, candidatesArr[2].name, candidatesAr[2].numberOfVote);
    }

    //function getVotes(uint _index) public view returns(uint){
        //return candidatesArr[_index].numberOfVote;
    //}

}
