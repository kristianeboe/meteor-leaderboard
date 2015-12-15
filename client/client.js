Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
    'player': function(){
        var currentUserId = Meteor.userId();
        return PlayerList.find({}, {sort: {score:-1, name: 1} })
    },
    'selectedClass': function(){
        var playerID = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if(playerID==selectedPlayer){
            return "selected"
        }
    },
    'showSelectedPlayer': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayerList.findOne(selectedPlayer)
    }

});

Template.leaderboard.events({
    'click .player': function(){
        var playerID = this._id;
        Session.set('selectedPlayer', playerID);

    },
    'click .increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('updatePlayerScore', selectedPlayer, 5);

    },
    'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('updatePlayerScore', selectedPlayer, -5);

    },
    'click .removeBtn':function(){
        var selectedPlayer = Session.get('selectedPlayer');
        var name = PlayerList.findOne(selectedPlayer).name;
        var confirm = window.confirm("Are you sure you want to delete " + name + "?");
        if (confirm){
            Meteor.call('removePlayer', selectedPlayer);
        }
    }
});

Template.addPlayerForm.events({
    "submit .addForm": function(event){
        event.preventDefault();
        var playerNameVar = event.target.playerName.value;
        var playerScoreVar = event.target.playerScore.value ? event.target.playerScore.value : 0;
        Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);
        event.target.playerName.value = event.target.playerScore.value = "";
    }
});
