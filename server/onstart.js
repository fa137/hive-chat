// Apparently this has problem with Accounts.createUser function.
// Whenever user creates an account, this getRandomAvatar() is supposed to assign a random avatar color.  


//Accounts.onCreateUser(function (options, user) {
//    // Assign random avatar color
//    function getRandomAvatar() {
//        var max = 4
//            , min = 0;
//        var avIndex = Math.floor(Math.random() * (max - min)) + min;
//        return 'av-' + avIndex;
//    }
//
//    // We still want the default hook's 'profile' behavior.
//    user.profile = options.profile || {};
//    user.profile['avatarColor'] = getRandomAvatar();
//    return user;
//});