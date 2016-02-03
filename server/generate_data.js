// If there are no users, this will generate the default
// channels: Hive and General. 

if (Meteor.users.find().count() === 0) {
    Accounts.createUser(
        {
            username: 'general',
            password: 'verysecuremuchgenerated12344',
            profile: {
                type: 'channel'
            }
        }
        );
    Accounts.createUser(
        {
            username: 'hive',
            password: 'verysecuremuchgenerated12344',
            profile: {
                type: 'channel'
            }
        }
        );
}