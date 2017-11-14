import React, { Component } from 'react';
import { View, Text, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'item1'
    }
  }

  state = { 
    goddess: 'xiaoxi',
  }

  render() {
    return (
    <TabBarIOS>
      <Icon.TabBarItem 
        title="item1" 
        iconName='ios-star-outline'
        selectedIconName='ios-star'
        selected={this.state.selectedTab === 'item1'}
        onPress={() => {
          this.setState({
            selectedTab: 'item1'
          })
        }}
      >
        <Text>aaa</Text>
      </Icon.TabBarItem>
      <Icon.TabBarItem 
        title="item2"
        iconName='ios-card-outline'
        selectedIconName='ios-card'
        selected={this.state.selectedTab === 'item2'}
        onPress={() => {
          this.setState({
            selectedTab: 'item2'
          })
        }}
      >
        <Text>dddd</Text>
      </Icon.TabBarItem>
      <Icon.TabBarItem 
        title="item3"
        iconName='ios-more-outline'
        selectedIconName='ios-more'
        selected={this.state.selectedTab === 'item3'}
        onPress={() => {
          this.setState({
            selectedTab: 'item3'
          })
        }}
      >
      <Text>fdsf</Text>
      </Icon.TabBarItem>
    </TabBarIOS>
    );
  }
}

export default App;