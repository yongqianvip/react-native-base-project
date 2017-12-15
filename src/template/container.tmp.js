
import React, { Component } from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import BackButton from '../common/backButton.js'
import PropTypes from 'prop-types';

class Screen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: (<BackButton navigation={navigation}/>)
  });
  componentDidMount() {

  }
  render() {
    return (
      <View>

      </View>
    );
  }
  componentWillUnmount() {
    
  }
}

const styles = StyleSheet.create({
  
})

Screen.propTypes = {

}
export default connect()(Screen)