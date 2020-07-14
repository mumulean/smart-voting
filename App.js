App = {
  web3Host: null,votecontracts:{},customer: 0x0,

  inital: async function() {
    return await App.initialWeb3();
  },

  initalContract: function(){
    $.getJSON('voting.json',function(temp){
      App.votecontracts.Voting =  TruffleContract(temp);
      App.votecontracts.Voting.setProvider(App.web3Host);
      return App.loadTheVoter();
    });
  },

  AccountGetter: function(){
    web3.eth.getCoinbase(function(error, customer){
      if (( getCoinbase === null)){
        App.customer = customer;
        return App.initalContract();
      }
      return App.initalContract();
      }
    });
  },

  initialWeb3: async function() {
    if (typeof web3 !== 'undefined') {
      App.web3Host = web3.currentProvider;
      ethereum.enable()

    } else {
      var hostAddress= $('#votingTemplate');
      App.web3Host = new Web3.providers.HttpProvider(hostAddress);
      ethereum.enable()
    }
    return App.AccountGetter();
  },

  assist1: function(temp2){
      var votingTemplate = $('#votingTemplate');
      votingTemplate.find('.panel-title').text('Candidate 1');
      votingTemplate.find('.voter-name').text(temp2[0]);
      votingTemplate.find('.Votes').text(temp2[1]);
      votingTemplate.find('.btn-vote').attr('id',0);
      $('#votersRow').append(votingTemplate.html());
  },

  assist2: function(temp2){
      var votingTemplate = $('#votingTemplate');
      votingTemplate.find('.panel-title').text('Candidate 2');
      votingTemplate.find('.voter-name').text(temp2[2]);
      votingTemplate.find('.Votes').text(temp2[3]);
      votingTemplate.find('.btn-vote').attr('id',1);
      $('#votersRow').append(votingTemplate.html());
  },

  assist3: function(temp2){
      var votingTemplate = $('#votingTemplate');
      votingTemplate.find('.panel-title').text('Candidate 3');
      votingTemplate.find('.voter-name').text(temp2[4]);
      votingTemplate.find('.Votes').text(temp2[5]);
      votingTemplate.find('.btn-vote').attr('id',2);
      $('#votersRow').append(votingTemplate.html());
  },

  loadTheVoter: function(){
    App.votecontracts.Voting.deployed().then(function(temp){
      return temp.getNameAndVotes();
    }).then(function(temp2){
      console.log(temp2.toString());
      App.assist1(temp2);
      App.assist2(temp2);
      App.assist3(temp2);
    })
  },

  winCandidate: function(){
    App.contracts.Voting.deployed().then(function(instance){
      return instance.getNameAndVotes();
    }).then(function(candidateObject){
      console.log(candidateObject.toString());
      var winner = $('#winner');
      var winnerIndex = 0;
      for(var i = 1; i <= 6 ;i++){
        if(candidateObject[i]>winnerIndex)
          winnerIndex = i;
      }
      winner.find('.winner-name').text(candidateObject[winnerIndex-1]);
      $('#winnerCurrent').append(winner.html());
    })

  },

  Voting: function(_index){
    App.votecontracts.Voting.deployed().then(function(temp){
      return temp.votersPoll(_index,{
        gas: 1000000
        from: App.customer,
      });

    }).then(function(result){

    }).catch(function(err){
      console.error('error');
    });
  },

  authorizationVoter: function(){
    var _address =$('#address').val();

    if((_address.trim() == '')){
      return false
    }
    if((_address == 0x0)){
      return false
    },
    
  App.votecontracts.Voting.deployed().then(function(temp){
      return temp.authorizationVoter(_address,{
        from: App.customer,
        gas: 1000000
      });
    }).then(function(result){

    }).catch(function(err){
      console.error(err);
    });
  },

  $(function(){
    $(window).load(function() {
      App.inital();
    });
  });