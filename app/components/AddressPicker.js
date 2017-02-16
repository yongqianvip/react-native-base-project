import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Picker,
    TouchableOpacity,
    Modal,
    Dimensions,
    Animated
} from 'react-native';
import PCA from '../constants/pca.json'
import Button from '../common/Button.js'
const { width, height } = Dimensions.get('window')
const pickersViewHeight = 244;
const showTimeLength = 300;

class AddressPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerTop: new Animated.Value(height),
            selectedProvince: PCA[0].name,
            selectedCity: PCA[0].city[0].name,
            selectedDistrict: PCA[0].city[0].district[0]
        }
    }
    componentDidMount() {
        Animated.timing(this.state.pickerTop, {
            toValue: height - pickersViewHeight,
            duration: showTimeLength
        }).start();
    }

    _actionHandler() {
        Animated.timing(this.state.pickerTop, {
            toValue: height,
            duration: showTimeLength
        }).start();
    }

    render() {
        let cityArray = [];
        let districtArray = [];
        const provinces = PCA.map((item,index) => {
            if (item.name == this.state.selectedProvince) {
                cityArray = item.city;
                districtArray = cityArray[0].district;
            };
            return <Picker.Item key={index} label={ item.name } value={ item.name } />
        })
        const citys = cityArray.map((item,index) => {
            if (item.name == this.state.selectedCity) {
                districtArray = item.district;
            };
            return <Picker.Item key={index} label={ item.name } value={ item.name } />
        })
        const districts =  districtArray.map((item,index) => {
            return <Picker.Item key={index} label={ item } value={ item } />
        })

        // this.props.valueChange(selectedAddress.replace(/\s+/g,''));
        const selectedAddressObj = {
            province: this.state.selectedProvince.replace(/\s+/g,''),
            city: this.state.selectedCity.replace(/\s+/g,''),
            district: this.state.selectedDistrict.replace(/\s+/g,'')
        }
        return (

            <View style={ styles.container} >
                <Animated.View style={ [styles.pickerstyle,{ top: this.state.pickerTop }] }>
                    <View style={ styles.barView }>
                        <Button style={ {width: 100,height: 40, margin: 2} } title={ '取消' } onClick={ ()=>{
                            this._actionHandler();
                            this.cancleMoveTimer = setTimeout(()=>{
                                this.props.cancle();
                            },showTimeLength);
                        }}/>
                        <Button style={ {width: 100,height: 40, margin: 2} } title={ '确定' } onClick={ ()=>{
                            this._actionHandler();
                            this.sureMoveTimer = setTimeout(()=>{
                                this.props.sureAndCloseWithResult(selectedAddressObj);//selectedAddress.replace(/\s+/g,''));
                            },showTimeLength);

                        }}/>
                    </View>
                    <View style={ styles.pickersView }>
                        <View style={ styles.picker }>
                            <Picker
                                selectedValue={this.state.selectedProvince}
                                onValueChange={(value) => {
                                    this.setState({selectedProvince: value});
                                    PCA.map((item) => {
                                        if (value == item.name) {
                                            this.setState({
                                                selectedCity: item.city[0].name,
                                                selectedDistrict: item.city[0].district[0]
                                            })
                                        };
                                    })
                                }
                            }>
                                { provinces }
                            </Picker>
                        </View>
                        <View style={ styles.picker }>
                            <Picker
                                selectedValue={this.state.selectedCity}
                                onValueChange={(value) => {
                                    PCA.map((item) => {
                                        if (this.state.selectedProvince == item.name) {
                                            item.city.map((itemC) => {
                                                if (value == itemC.name) {
                                                    this.setState({
                                                        selectedDistrict: itemC.district[0]
                                                    })
                                                };

                                            })
                                        };
                                    })
                                    this.setState({selectedCity: value});
                                }
                            }>
                                { citys }
                            </Picker>
                        </View>
                        <View style={ styles.picker }>
                            <Picker
                                selectedValue={this.state.selectedDistrict}
                                onValueChange={(value) => this.setState({selectedDistrict: value})}
                                >
                                { districts }
                            </Picker>
                        </View>
                    </View>
                </Animated.View>
            </View>
        )
    }

    componentWillUnmount() {
        console.log("___________ clearTimeout ----------");
        this.cancleMoveTimer && clearTimeout(this.cancleMoveTimer);
        this.sureMoveTimer && clearTimeout(this.sureMoveTimer);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height
    },
    pickerstyle: {
        height: pickersViewHeight,
    },
    barView: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 44,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    pickersView: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },

    picker: {
        flex: 1,
    }
})

AddressPicker.propTypes = {
    sureAndCloseWithResult: React.PropTypes.func.isRequired,
}


export default AddressPicker
