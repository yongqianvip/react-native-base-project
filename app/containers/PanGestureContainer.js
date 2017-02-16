import React, {
	Component,
} from 'react'
import {
	View,
	StyleSheet,
	PanResponder,
	Animated
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'

class PanGestureContainer extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	trans: new Animated.ValueXY({x: 100,y: 100}),//起始位置（100，100）
	    };
	    // const ox = new Animated.Value(100);
	    // const oy = new Animated.Value(100);
	    console.log(" old log ", this.state.trans.x);
	    // console.log(" new log ",Animated.add(this.state.trans.x, ox));
	    this._panResponder = PanResponder.create({
	    	onStartShouldSetPanResponder: () => true, //响应手势
	    	onPanResponderMove: Animated.event(
	    		[
	    			null,
	    			{
	    				dx: this.state.trans.x, //Animated.add(this.state.trans.x,new Animated.Value(100)),
	    				dy: this.state.trans.y //Animated.add(this.state.trans.y,new Animated.Value(100))
	    			}
	    		] // 绑定动画值
	    	),
	    	// (e,g) => {
	    	// 	console.log("34567890: ",g);
	    	// },

	    	onPanResponderRelease: ()=>{//手松开，回到原始位置
	    		Animated.spring(this.state.trans,{toValue: {x: 100, y: 100}}).start();
	       	},
	        onPanResponderTerminate:()=>{//手势中断，回到原始位置
	       		Animated.spring(this.state.trans,{toValue: {x: 100, y: 100}}).start();
	       	},
	    });
	   }

	render() {
		return (
			<View style={ styles.containerView }>
				<NavigationBar title={'手势'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) }/>
				<Animated.View style={[styles.panView, this.state.trans.getLayout()]} {...this._panResponder.panHandlers}>
	        	</Animated.View>
			</View>
		);
	}

	_backToFront() {
		if (this.props.navigator) {
			this.props.navigator.pop();
		};
	}
}

const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		backgroundColor: '#FFEFDB'
	},
	panView: {
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: 'red'
	}
})

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(PanGestureContainer);