import React, {
	Component,
} from 'react'
import {
	Image,
} from 'react-native'
import { connect } from 'react-redux'
import ProduceImageShow from '../components/ProductImageShow.js'
import { ShowTabBar } from '../action/TabbarHandle.js'

class ProductImageContainer extends Component {

	constructor(props) {
	  super(props);
	}

	componentWillMount() {
		const { dispatch } = this.props;
		console.log("------------------------------------ componentWillMount ");

		dispatch(ShowTabBar(false));
	}

	render() {
		return (
			<ProduceImageShow {...this.props} />
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(ProductImageContainer);