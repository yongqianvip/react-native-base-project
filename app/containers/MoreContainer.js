import React, {
	Component,
} from 'react'
import { connect } from 'react-redux'
import More from '../components/More.js'

class MoreContainer extends Component {

	constructor(props) {
	  super(props);
	}

	render() {
		return (
			<More { ...this.props } />
		);
	}
}

function mapStateToProps(state) {
	const { userReducer } = state;
	return userReducer;
}

export default connect(mapStateToProps)(MoreContainer);