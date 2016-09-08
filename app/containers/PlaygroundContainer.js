import React, {
	Component,
} from 'react'
import { connect } from 'react-redux'
import Playground from '../components/Playground.js'

class PlaygroundContainer extends Component {

	constructor(props) {
	  super(props);
	}

	render() {
		return (
			<Playground { ...this.props } />
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(PlaygroundContainer);