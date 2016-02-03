Meteor.users.allow({
    update: function (userId, docs, fields, modifier) {
        return true;
    }
});