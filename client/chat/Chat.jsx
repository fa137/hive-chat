Meteor.subscribe('messages');
Chat = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            currentUser: Meteor.user(),
            messages: Message.find({}).fetch(),
            channels: Meteor.users.find({profile: {type: 'channel'}}).fetch(),
        }
    },
    getInitialState(){
        return {
            activeRoom: Session.get("channel") || "general",
            userAvatar: 0
        }
    },
    /**
     * Switches chat room (changes the state and session)
     * @param room
     */
    setActiveRoom(room){
        this.setState({
            activeRoom: room
        });
        Session.set("channel", room);
    },
    displayChannels(rooms){
        return rooms.map((room, id)=> {
            let isActive = this.state.activeRoom == room.username;
            return (
                <Channels
                    key={room._id}
                    name={room.username}
                    active={isActive}
                    onSelect={this.setActiveRoom}
                />
            )
        });
    },
    displayDefaultHeader(){
        return(
            <h4 className="logo"><i className="fa fa-comment"></i> let's chat</h4>
        );
    },
    render(){
        return (
            <div className="expanded row">
                <div className="small-12 medium-3 large-2 column sidebar">
                    <div className="row full">
                        {this.data.currentUser ? '' : this.displayDefaultHeader()}
                        <AccountForms active={this.setActiveRoom} />
                        <h6>CHANNELS ({this.data.channels.length})</h6>
                        <ul>
                            {this.displayChannels(this.data.channels)}
                        </ul>
                        <hr/>
                        <OnlineUsers
                            onSelect={this.setActiveRoom}
                            active={this.state.activeRoom}/>
                    </div>
                </div>
                <div className="small-12 medium-9 large-10 column">
                    <div className="row expanded">
                        <ChatLog messages={this.data.messages} switch={this.setActiveRoom}/>
                        <MessageBox to={this.state.activeRoom}/>
                    </div>
                </div>
            </div>)
    }
});



