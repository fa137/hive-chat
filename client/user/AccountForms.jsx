AccountForms = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return {
			currentUser: Meteor.user()
		}
	},
	getInitialState(){
		return {
			avatars: false,
			errors: ""
		}

	},
    /**
     * toggles the avatar menu
     * @param e event
     */
	toggleAvatar(e){
		e && e.preventDefault();
		this.setState({
			avatars: !this.state.avatars
		});
	},
    /**
     * updates database with the new avatar
     * @param e event
     */
	changeAvatar(e){
		if (this.data.currentUser) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.avatarColor": "av-" + e.target.value}});
            this.toggleAvatar();
		}
	},
    /**
     * displays the avatar menu
     * @returns {XML}
     */
	showAvatars(){
		let currentAvatar = this.data.currentUser.profile.avatarColor;
		return (
			<div className="row text-center">
				<div>chose your avatar color</div>
				<label className="avatar av-0 float-left">
					<input type="radio" name="av" checked={currentAvatar == 'av-0'} value="0"
					       onChange={this.changeAvatar}/>
				</label>
				<label className="avatar av-1 float-left">
					<input type="radio" name="av" checked={currentAvatar == 'av-1'} value="1"
					       onChange={this.changeAvatar}/>
				</label>
				<label className="avatar av-2 float-left">
					<input type="radio" name="av" checked={currentAvatar == 'av-2'} value="2"
					       onChange={this.changeAvatar}/>
				</label>
				<label className="avatar av-3 float-left">
					<input type="radio" name="av" checked={currentAvatar == 'av-3'} value="3"
					       onChange={this.changeAvatar}/>
				</label>
				<label className="avatar av-4 float-left">
					<input type="radio" name="av" checked={currentAvatar == 'av-4'} value="4"
					       onChange={this.changeAvatar}/>
				</label>
				<label className="avatar av-5 float-left">
					<input type="radio" name="av" checked={currentAvatar == 'av-5'} value="5"
					       onChange={this.changeAvatar}/>
				</label>
			</div>
		)
	},
    /**
     * displays data to logged in users.
     * @returns {XML}
     */
	loggedIn(){
		return (
			<div>
				<div className="row username">
					<div className="float-left">Hi, {this.data.currentUser.username}!</div>
					<div className="float-right">
						<div onClick={this.toggleAvatar} className="options float-left"><i className="fa fa-cogs"></i></div>
						<div onClick={this.logout} className="options logout float-left"><i className="fa fa-sign-out"></i></div>
					</div>
				</div>
				{this.state.avatars ? this.showAvatars() : null}
			</div>
		)
	},
    /**
     * registration handing with Accounts.create
     * @param e
     */
	register(e){
		e.preventDefault();
		let vm = this;
		let error = false;
		let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
		let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
		if (username == "" || password == "") {
			error = "Username/Password Missing"
		}
		Accounts.createUser({
			username: username,
			password: password
		}, function (err) {
			if (err) {
				vm.setState({
					errors: err.reason
				});
			}
		});
		if (error) {
			this.setState({
				errors: error
			});
		} else {
			// reset to nothing if there are no errors
			this.setState({
				errors: ""
			});
		}
	},
    /**
     * handling login with Meteor.loginWithPassword
     * @param e
     */
	login(e){
		e.preventDefault();
		let vm = this;
		let error = false;
		let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
		let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
		if (username == "" || password == "") {
			error = "Username/Password Missing"
		}else{
            Meteor.loginWithPassword(username, password, function (err) {
                if (err) {
                    vm.setState({
                        errors: err.reason
                    });
                }
            });
        }
		if (error) {
			this.setState({
				errors: error
			});
		} else {
			// reset to nothing if there are no errors
			this.setState({
				errors: ""
			});
		}
	},
    /**
     * logs out the the current user
     * @param e
     */
	logout(e){
		e.preventDefault();
		Meteor.logout();
		this.props.active("general");
	},
	defaultHandler(e){
		e.preventDefault();
		this.login(e);
	},
    /**
     * displays login/register form to new/logged out users
     * @returns {XML}
     */
	loggedOut(){
		return (
			<form onSubmit={this.defaultHandler}>
				<h5 className="float-left">Hello...</h5>
				<div className="account-errors float-right">{this.state.errors}</div>
				<input type="text" ref="username" placeholder="username"/>
				<input type="password" ref="password" className="input-group-field" placeholder="password"/>
				<div className="text-right">
					<input className="button small secondary" type="submit" value="sign in" onClick={this.login}/>
					<input className="button small success" type="submit" value="sign up" onClick={this.register}/>
				</div>
			</form>
		)
	},
	render() {
		// Just render a placeholder container that will be filled in
		return (
			<div className="new-user small-12">
				{this.data.currentUser ? this.loggedIn() : this.loggedOut() }
			</div>
		);
	}
});

