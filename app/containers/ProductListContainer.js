import React, {
	Component,
} from 'react'
import { connect } from 'react-redux'
import ProductList from '../components/ProductList.js'

class ProductListContainer extends Component {

	constructor(props) {
	  super(props);
	}

	render() {
		return (
			<ProductList { ...this.props } />
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(ProductListContainer);