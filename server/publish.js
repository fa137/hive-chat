// Publish the online users.
Meteor.publish(null, function () {
    return [
        Meteor.users.find({
            "status.online": true
        }, {
                fields: {
                    profile: 1,
                    status: 1,
                    username: 1
                }
            }), UserStatus.connections.find()
    ];
});
// Publish the offline users. I believe there is a better way to do this.
Meteor.publish(null, function () {
    return [
        Meteor.users.find({
            "status.online": false
        }, {
                fields: {
                    profile: 1,
                    status: 1,
                    username: 1
                }
            }), UserStatus.connections.find()
    ];
});
// Publish chatlogs. 
Meteor.publish("messages", function () {
    return Message.find({});
});