import React from 'react';
import {
  View,
  FlatList,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Drawer, Header, Title, Content, SwipeRow, Button, Thumbnail, Left, Right, Body, ActionSheet, Text, Badge, /* Icon, */ Card, CardItem, Form, Picker, Item as FormItem } from 'native-base';

import SideBar from '../../component/sideBar';

const Item = Picker.Item;
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
class IamPmScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '产品',
    headerTitle: 'I am',
    tabBarIcon: ({ tintColor }) => (
      <Text style={{ fontFamily: 'iconfont', fontSize: 25, color: tintColor }}>&#xe60e;</Text>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  componentDidMount() {

    this.closeDrawer = () => {
      this.drawer._root.close()
    };
    this.openDrawer = () => {
      this.drawer._root.open()
    };

  }
  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Content padder>
            <SwipeRow
              leftOpenValue={175}
              stopLeftSwipe={180}
              swipeToOpenPercent={30}
              rightOpenValue={-175}
              disableLeftSwipe={false}
              left={
                <Button success onPress={() => alert('Add')}>
                  <Text>456</Text>
                </Button>
              }
              list={[1,2,3,4]}
              body={
                <View>
                  <Text>SwipeRow Body Text</Text>
                </View>
              }
              right={
                <Button danger onPress={() => alert('Trash')}>
                  <Text>123</Text>
                </Button>
              }
              onRowOpen={()=>{alert('opending')}}
              onRowClose={()=>{alert('closing')}}
            />
            <Text>Picker(iOS only)</Text>
            <View style={{ padding: 5, justifyContent: 'space-around', marginBottom: 20 }}>
              <Form>
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Item label="Wallet" value="key0" />
                  <Item label="ATM Card" value="key1" />
                  <Item label="Debit Card" value="key2" />
                  <Item label="Credit Card" value="key3" />
                  <Item label="Net Banking" value="key4" />
                </Picker>
              </Form>
            </View>
            <Text>Card</Text>
            <View style={{ padding: 5, justifyContent: 'space-around', marginBottom: 20 }}>
              <Card>
                <CardItem style={{ backgroundColor: '#eee' }}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://upload.jianshu.io/users/upload_avatars/2428275/5418c7486045?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240' }} />
                    <Body>
                      <Text>NativeBase</Text>
                      <Text note>GeekyAnts</Text>
                    </Body>
                  </Left>
                  <Text>
                    This is card item 0
                  </Text>
                </CardItem>
                <CardItem style={{ backgroundColor: '#eee' }}>
                  <Left>
                    <Button onPress={() => {
                      this.openDrawer()
                    }}><Text>openDrawer</Text></Button>
                  </Left>
                  <Text>
                    This is card item 1
                  </Text>
                </CardItem>
                <CardItem>
                  <Text>
                    card item 2
                  </Text>
                </CardItem>
                <CardItem style={{ backgroundColor: '#eee' }} >
                  <Text>
                    card item 3
                  </Text>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button><Text>left</Text></Button>
                  </Left>
                  <Body>
                    <Text style={{ backgroundColor: 'orange' }}>
                      card item 4 card item 4 card item
                    </Text>
                  </Body>
                  <Right>
                    <Button><Text>rigt</Text></Button>
                  </Right>
                </CardItem>
              </Card>
            </View>
            <Text>Buttons </Text>
            <View style={{ padding: 5, borderWidth: 1, justifyContent: 'space-around', marginBottom: 20 }}>
              {/* <Button bordered badge >
                <Badge ><Text>51</Text></Badge>
                <Icon name='woman' />
              </Button>
              <Button iconLeft>
                <Icon name='arrow-back' />
                <Text>left icon button</Text>
              </Button>
              <Button iconRight warning>
                <Text>right icon button</Text>
                <Icon name='arrow-back' />
              </Button> */}
              <View style={{flexDirection: 'row'}}>
                <Button full style={{backgroundColor: 'brown'}} light>
                  <Text>full success button</Text>
                </Button>
                <Button info full>
                  <Text>full success button</Text>
                </Button>
              </View>
              <View style={{ width: 300, backgroundColor: 'orange', padding: 10 }}>
                <Button block>
                  <Text>custom view button</Text>
                </Button>
              </View>
              <Button
                disabled>
                <Text>disabled button</Text>
              </Button>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      this.setState({ clicked: BUTTONS[buttonIndex] });
                    }
                  )}
              >
                <Text>Actionsheet</Text>
              </Button>
            </View>
            <Text>Icons</Text>
            <View style={{ padding: 5, borderWidth: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 20 }}>
              {/* <Text style={{ fontFamily: 'iconfont' }}>&#xe630;</Text>
              <Icon name='american-football' />
              <Icon name='navigate' />
              <Icon name='pie' />
              <Icon name='watch' />
              <Icon name='bonfire' />
              <Icon name='bookmarks' />
              <Icon name='umbrella' />
              <Icon name='bonfire' />
              <Icon name='bookmarks' /> */}
            </View>
            <Text>Badge</Text>
            <View style={{ padding: 5, borderWidth: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              <Badge>
                <Text>normal</Text>
              </Badge>
              <Badge primary>
                <Text>primary primary</Text>
              </Badge>
              <Badge success>
                <Text>success</Text>
              </Badge>
              <Badge info>
                <Text>info button</Text>
              </Badge>
              <Badge warning>
                <Text>warning</Text>
              </Badge>
              <Badge danger>
                <Text>danger danger</Text>
              </Badge>
            </View>
          </Content>
        </Container>
      </Drawer>
    );
  }
}
const mapstateToProps = (props) => {
  return {
    foo: props
  }
}

export default connect(mapstateToProps)(IamPmScreen)