Meteor.startup(function () {
    if (Session.get("channel") == undefined) {
        // setting up default channel
        Session.set("channel", "general");
    }
    // Bootstrapping the app to Chat component
    ReactDOM.render(<Chat />, document.getElementById("chat"));
});