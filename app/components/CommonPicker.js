import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Animated
} from 'react-native';
import PCA from '../constants/pca.json'
import PropTypes from 'prop-types';
import Picker from 'react-native-picker';
const { width, height } = Dimensions.get('window')

class CommonPicker extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let data = [];
        for(var i=0;i<100;i++){
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            selectedValue: [59],
            onPickerConfirm: data => {
                this.props.onPickerConfirm(data);
            },
            onPickerCancel: data => {
                this.props.onPickerCancel(data);
            },
            onPickerSelect: data => {
                this.props.onPickerSelect(data);
            }
        });
        Picker.show();
    }
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0, 0, 0, 0.3)',height}} >
            </View>
        )
    }
}

CommonPicker.propTypes = {
    onPickerConfirm: PropTypes.func.isRequired,
    onPickerCancel: PropTypes.func.isRequired,
    onPickerSelect: PropTypes.func.isRequired,
}
export default CommonPicker
