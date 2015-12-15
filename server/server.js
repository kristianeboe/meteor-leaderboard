Meteor.publish("thePlayers", function(){
    var currentUserId = this.userId;
    return PlayerList.find({createdBy: currentUserId})
});

Meteor.methods({
    'insertPlayerData':function(playerName, playerScore){
        var currentUserId = Meteor.userId();
        PlayerList.insert({
            name:playerName,
            score:playerScore,
            createdBy:currentUserId
        });

    },
    'removePlayer':function(playerId){
        var currentUserId = Meteor.userId();
        PlayerList.remove({_id: playerId, createdBy: currentUserId });

    },
    'updatePlayerScore':function(playerId, points){
        var currentUserId = Meteor.userId();
        PlayerList.update({ _id: playerId, createdBy: currentUserId},
                            {$inc: {score: points} });
    }
});
