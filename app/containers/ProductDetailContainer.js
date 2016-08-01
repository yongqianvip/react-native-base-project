import React, {
	Component,
} from 'react'
import {
	Image,
} from 'react-native'
import { connect } from 'react-redux'
import ProductDetail from '../components/ProductDetail.js'

class ProductDetailContainer extends Component {

	constructor(props) {
	  super(props);
	}

	render() {
		return (
			<ProductDetail {...this.props} />
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(ProductDetailContainer);