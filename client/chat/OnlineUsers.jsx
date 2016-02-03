/**
 * OnlineUsers component
 * Displays the users online+offline and updates the app state
 */
OnlineUsers = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return {
			currentUser: Meteor.user(),
			onlineUsers: Meteor.users.find({"status.online": true}).fetch(),
			offlineUsers: Meteor.users.find({"status.online": false}).fetch()
		}
	},
	/**
	 * switches channel and updates the parent state
	 * @param name of the channel
	 * @param event
     */
	switchChannel(name, event){
		event.preventDefault();
		if (this.data.currentUser && this.data.currentUser.username != name) {
			this.props.onSelect(name);
		}
	},
	/**
	 * Checks personal messages and updates to database when they are read
	 * Has options to let user know how many messages are not read yet.
	 * Automatically pushes the notification with "jello" animation.
	 * Hides the count if there are no messages. Increases mobile performance.
	 * @param from
	 * @returns {XML}
     */
	checkDMs(from){
		if (Meteor.user()) {
			let dms = Message.find({to: Meteor.user().username, from: from}).fetch();
			let dmCount = dms.length;
			// check if user is logged in
			if (this.data.currentUser) {
				let setQuery = "profile.read." + from;
				if (this.data.currentUser.username != from
					&& Session.get("channel") != from) {
					// showing unread messages
					if (this.data.currentUser.profile != undefined &&
						this.data.currentUser.profile['read'] != undefined
						&& _.has(this.data.currentUser.profile['read'], from)) {
						dmCount = dmCount - this.data.currentUser.profile['read'][from]['count'];
					}
					if (dmCount > 0) {
						return (
							<span className="badge success animated jello float-right">{dmCount}</span>
						)
					}
				}
				else {
					if (this.data.currentUser.profile == undefined
						|| this.data.currentUser.profile.read == undefined
						|| this.data.currentUser.profile.read[from] == undefined
						|| this.data.currentUser.profile.read[from]['count'] == undefined
						|| this.data.currentUser.profile.read[from]['count'] != dms.length) {
						// setting up initial data
						let update = {};
						update[setQuery] = {
							count: dms.length
						}

						Meteor.users.update({_id: Meteor.userId()}, {
							$set: update
						});
						dmCount = 0;
						console.log("here");
					}
				}
			}
		}
	}
	,
	/**
	 * Offline user list
	 * @param users
	 * @returns {Array|any|*}
     */
	displayOfflineUsers(users)
	{
		return users.map(user=> {
			// hiding global channels
			if (user.username != 'general' && user.username != 'hive') {
				let activeClass = this.props.active == user.username ? 'active animated fadeInLeft' : 'animated fadeInLeft';
				return (
					<li className={activeClass} key={user._id}>
						<a onClick={this.switchChannel.bind(this, user.username)}>
							@{user.username} {this.checkDMs(user.username)}
						</a>
					</li>
				)
			}
		});
	}
	,
	/**
	 * Displays online user list
	 * @param users
	 * @returns {Array|any|*}
     */
	displayOnlineUsers(users)
	{
		return users.map(user=> {
			let activeClass = this.props.active == user.username ? 'active animated fadeInLeft' : 'animated fadeInLeft';
			return (
				<li className={activeClass} key={user._id}>
					<a onClick={this.switchChannel.bind(this, user.username)}>
						@{user.username} {this.checkDMs(user.username)}
					</a>
				</li>
			)
		});
	}
	,
	/**
	 * Displays offline user list based on permission
	 * @returns {XML}
     */
	offlineData(){
		if(this.data.currentUser)
			return(
				<div>
					<hr />
					<h6>OFFLINE ({this.data.offlineUsers.length - 2})</h6>
				<ul>
				{this.displayOfflineUsers(this.data.offlineUsers)}
				</ul>
				</div>
			)
	},
	render()
	{
		return (
			<div className="user-list">
				<h6>ONLINE ({this.data.onlineUsers.length})</h6>
				<ul>
					{this.displayOnlineUsers(this.data.onlineUsers)}
				</ul>
				{this.offlineData()}

			</div>
		);
	}
});