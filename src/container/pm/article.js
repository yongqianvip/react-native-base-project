import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BackButton from '../../common/backButton.js'
import { action_getPMArticleList, getPMActiveNewsAction } from '../../action/pmarticle.js'
import { Fetch } from '../../action/index.js'
import * as API from '../../constant/api.js'
const { height, width } = Dimensions.get('window')
import Gif from '../../../assets/0.gif'
import LinearGradient from 'react-native-linear-gradient';


class ArticleScreen extends React.Component {
  constructor(props) {
    super(props)
    this._renderRow = this._renderRow.bind(this)
  }
  static navigationOptions = ({ navigation }) => ({
    title: '123',
    headerTitle: '产品经理',
    gesturesEnabled: true,
    headerLeft: (<BackButton navigation={navigation} />),
    style: {
      backgroundColor: 'white'
    }
  });
  componentDidMount() {
    setTimeout(() => {

      this.props.getArticleList({ type: 'active' })
    }, 3000);
  }

  _renderRow({ item }) {
    return (
      <View key={item.id} style={{ flex: 1, backgroundColor: 'white', paddingBottom: 10 }}>
        <ImageLoad style={{ width, height: width / 2 }} source={{ uri: item.imageList[0] }} placeholderSource={Gif} />
        <Text style={{ fontSize: 18, padding: 8 }}>{item.title}</Text>
        <Text style={{ fontSize: 14, padding: 8 }}>{item._event_date}</Text>
        <LinearGradient colors={['#999', '#fff']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ height: 8 }} />
        <View></View>
      </View>
    )
  }
  _keyExtractor = (item, index) => {
    return item.id
  }
  request(){
    this.props.getArticleList({ type: 'active' })

  }
  render() {
    const { navigation, activeNews } = this.props
    console.log("====== ", activeNews.get('news').toJS());
    const { params } = navigation.state;
    return (

      <View>
        <Button
          onPress={this.request.bind(this)}
          title={`模式`} />

        <FlatList
          style={{ backgroundColor: 'white', flex: 1, paddingTop: 10 }}
          data={activeNews.get('news').toJS() || [{ key: 'a' }, { key: 'b' }]}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderRow} />
      </View>

    );
  }
}
const mapstateToProps = (state) => {
  const { pmArticle } = state;
  return {
    activeNews: pmArticle.get('active')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    getArticleList: (body) => {
      console.log('=======dispatch=============================');
      console.log(dispatch);
      console.log('====================================');
      dispatch(Fetch({
        url: API.GET_ACTIVE_LIST,
        requestType: 'get',
        body,
        success: (data) => {
          console.log('=====jieguo ===============================');
          console.log(data);
          console.log('====================================');
          dispatch(getPMActiveNewsAction(data))
        },
        fail: (failure) => {
        }
      }))
    }
  }
}

export default connect(mapstateToProps, mapDispatchToProps)(ArticleScreen)