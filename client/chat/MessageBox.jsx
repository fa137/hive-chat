/**
 * MessageBox component
 * is the input that is static at the bottom of chatbox.
 * It has 2 buttons for mobile navigation, 1 submit button, 1 text input
 * Displays default placeholder for not logged in users and disables the button
 */
MessageBox = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            user: Meteor.user()
        }
    },
    /**
     * Handles the input text of chat
     * @param event
     */
    handleSubmit(event){
        event.preventDefault();
        let from = this.data.user.username,
            to = this.props.to,
            text = ReactDOM.findDOMNode(this.refs.message).value.trim(),
            private = !(Session.get("channel") == "general" || Session.get("channel") == "hive");
        // TODO: needs more validation
        if (text != '') {
            Message.insert({
                from: from,
                to: to,
                private: private,
                text: text,
                createdAt: new Date()
            });
            ReactDOM.findDOMNode(this.refs.message).value = "";
            ReactDOM.findDOMNode(this.refs.message).focus();
        }
    },
    /**
     * this is displayed/available to mobile users for easily scrolling to top
     */
    scrollUp(){
        let scrollHeight = window.scrollY,
            scrollStep = Math.PI / ( 300 / 15 ),
            cosParameter = scrollHeight / 2;
        var scrollCount = 0,
            scrollMargin;
        requestAnimationFrame(step);
        function step() {
            setTimeout(function () {
                if (window.scrollY != 0) {
                    requestAnimationFrame(step);
                    scrollCount = scrollCount + 1;
                    scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                    window.scrollTo(0, ( scrollHeight - scrollMargin ));
                }
            }, 15);
        }
    },
    /**
     * this is displayed/available to mobile users for easily scrolling to bottom
     */
    scrollDown(){
        window.scrollTo(0, document.body.scrollHeight + 70);
    },
    render(){
        return (
            <div className="row expanded message-box">
                <form className="input-group" onSubmit={this.handleSubmit}>
                    <input className="input-group-field"
                           placeholder={!this.data.user ? 'Sign in ...' : ''}
                           disabled={!this.data.user} ref="message" type="text"/>
                    <div className="input-group-button">
                        <button className="button success" disabled={!this.data.user} type="submit" value="send"><i
                            className="fa fa-paper-plane"></i></button>
                    </div>
                    <div className="input-group-button show-for-small-only">
                        <button className="button secondary" type="button" value="up"
                             onClick={this.scrollUp}><i className="fa fa-arrow-up"></i></button>
                        </div>
                    <div className="input-group-button show-for-small-only">
                        <button className="button secondary" type="button" value="down"
                             onClick={this.scrollDown}><i className="fa fa-arrow-down"></i></button>
                    </div>
                </form>
            </div>);
    }
});