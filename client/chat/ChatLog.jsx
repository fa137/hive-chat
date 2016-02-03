/**
 * ChatLog component
 * displays the messages from database.
 */
ChatLog = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            currentUser: Meteor.user()
        }
    },
    /**
     * Auto scroll to bottom of div when new message arrives
     */
    componentDidUpdate() {
        var node = ReactDOM.findDOMNode(this);
        window.scrollTo(0, node.scrollHeight + 70);
    },
    componentDidMount() {
        let node = ReactDOM.findDOMNode(this);
        node.className = 'animated slideInDown chatlog';
        setTimeout(()=>{
            window.scrollTo(0, node.scrollHeight + 70);
        }, 100);

    },
    /**
     * Formats the date to more readable format
     * @param date
     * @returns {*}
     */
    formatDate(date){
        return moment(date).format('h:mm A');
    },
    /**
     * Gets the current and up to date avatar from db
     * @param name
     * @returns {*}
     */
    getAvatarColor(name){
        if (Meteor.users && Meteor.users.findOne({username: name})) {
            let av = Meteor.users.findOne({username: name}).profile && Meteor.users.findOne({username: name}).profile['avatarColor'];
            return av;
        } else {
            return "av-0";
        }
    },
    /**
     * Switches channel and updates the parent state
     * @param name
     * @param event
     */
    switchChannel(name, event){
        event.preventDefault();
        if (this.data.currentUser && this.data.currentUser.username != name) {
            this.props.switch(name);
        }
    },
    /**
     * Display chat messages
     * @param messages
     * @returns {Array|any|*}
     */
    displayMessages(messages) {
        return messages.map((message, id) => {
            let avatar = "avatar float-left";
            avatar += " " + this.getAvatarColor(message.from);
            let checkDM = Meteor.user() && ((message.from == Session.get("channel") && message.to == Meteor.user().username) ||
                (message.from == Meteor.user().username && message.to == Session.get("channel")));
            if ((message.to == Session.get("channel") && !message.private) || checkDM) {
                return (
                    <div className="chatbox" key={id}>
                        <div className={avatar} onClick={this.switchChannel.bind(this, message.from)}>
                            {message.from[0]}
                        </div>
                        <div className="author">
                            <a href="#" onClick={this.switchChannel.bind(this, message.from)}>{message.from}</a>
                            <time>{this.formatDate(message.createdAt)}</time>
                        </div>
                        {message.text}
                    </div>
                );
            }
        })
    },
    render(){
        return (
            <div>
                {this.displayMessages(this.props.messages)}
            </div>
        )
    }
});