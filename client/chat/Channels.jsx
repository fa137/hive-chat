/**
 * Channels component
 * displays the channel list in the sidebar
 */
Channels = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired
	},
	/**
	 * Passing the state to parent to change channel
	 */
	handleClick(){
		this.props.onSelect(this.props.name);
	},
	render(){
		let activeClass = this.props.active ? 'active' : null;
		return (
			<li className={activeClass}>
				#<a onClick={this.handleClick}>{this.props.name}</a>
			</li>
		)
	}
});