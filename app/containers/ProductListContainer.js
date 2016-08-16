import React, {
	Component,
} from 'react'
import { connect } from 'react-redux'
import ProductList from '../components/ProductList.js'
import { ShowTabBar } from '../action/TabbarHandle.js'

class ProductListContainer extends Component {

	constructor(props) {
	  super(props);
	}
	componentWillMount() {
		const { dispatch } = this.props;
		console.log("------------------------------------首页-- componentWillMount ");

		dispatch(ShowTabBar(true));
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