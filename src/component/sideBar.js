import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Button, Left, Right, Text, Badge, Body, Card, CardItem } from 'native-base';

class SideBar extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {

  }
  render() {
    return (
      <Container style={{ backgroundColor: '#FFFFFF' }}>
        <Content>
          <Text>Card</Text>
          <View style={{ padding: 5, justifyContent: 'space-around', marginBottom: 20 }}>
            <Card>
              <CardItem style={{ backgroundColor: '#eee' }}>
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
        </Content>
      </Container>
    )
  }

  componentWillUnmount() {

  }
}

const styles = StyleSheet.create({

})

SideBar.propTypes = {

}
export default SideBar
