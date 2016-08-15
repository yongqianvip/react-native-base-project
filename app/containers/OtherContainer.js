import React, {
	Component,
} from 'react'
import { connect } from 'react-redux'
import Other from '../components/Other.js'

class OtherContainer extends Component {

	constructor(props) {
	  super(props);
	}

	render() {
		return (
			<Other { ...this.props } />
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(OtherContainer);