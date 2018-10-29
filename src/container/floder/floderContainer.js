
import React, { Component } from 'react';
import { 
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import BackButton from '../../common/backButton'
import PropTypes from 'prop-types';
import FloderView from '../../common/flodView';
import LinearGradient from 'react-native-linear-gradient';

class FloderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'FloderView',
    headerLeft: (<BackButton navigation={navigation}/>)
  });
  componentDidMount() {

  }
  render() {
    const { navigation } = this.props
    const { params } = navigation.state;
    return (
      <ScrollView>
        <FloderView title={'点我展开点我展开点我展开点我展开点我展开点我展点我展开点我展开点我展开点我展开点我展开点我展开点我展开点我展开'} style={{height: 40}}>
          <View style={{width: 300, height: 50, backgroundColor: 'red'}}>
            <View>

            </View>
          </View>
        </FloderView>
        <FloderView title={'点我展开'} openHeight={100}>
          <View style={{width: 300, height: 100, backgroundColor: 'red'}}>
            <View>
              <Text>司机:</Text>
              <Text></Text>
            </View>
          </View>
        </FloderView>
        <FloderView title={'点我展开'} openHeight={200}>
          <View style={{width: 300, height: 150, backgroundColor: 'red'}}>
            <View>
              <Text>司机:</Text>
              <Text></Text>
            </View>
          </View>
        </FloderView>
        <Button onPress={() => navigation.navigate('ArticleListScreen', { haha: 'hehe' })}
          title="ARTICLE LIST" />
        <LinearGradient 
          colors={['#fff', '#000']} 
          style={{ height: 150, width: 150 }} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 0.8, y: 0.8 }} 
          locations={[0, 1]} />
      </ScrollView>
    );
  }
  componentWillUnmount() {
    
  }
}

const styles = StyleSheet.create({
  
})

FloderScreen.propTypes = {

}
export default connect()(FloderScreen)