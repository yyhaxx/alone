import React, { Component } from 'react';
import { View, Text, TabBarIOS, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import List from './app/creation'
import Edit from './app/edit'
import Account from './app/account'

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
        title="列表页面" 
        iconName='ios-star-outline'
        selectedIconName='ios-star'
        selected={this.state.selectedTab === 'list'}
        onPress={() => {
          this.setState({
            selectedTab: 'list'
          })
        }}
      >
        <List/>
      </Icon.TabBarItem>
      <Icon.TabBarItem 
        title="编辑页面"
        iconName='ios-card-outline'
        selectedIconName='ios-card'
        selected={this.state.selectedTab === 'edit'}
        onPress={() => {
          this.setState({
            selectedTab: 'edit'
          })
        }}
      >
        <Edit/>
      </Icon.TabBarItem>
      <Icon.TabBarItem 
        title="我的账户"
        iconName='ios-more-outline'
        selectedIconName='ios-more'
        selected={this.state.selectedTab === 'account'}
        onPress={() => {
          this.setState({
            selectedTab: 'account'
          })
        }}
      >
        <Account/>
      </Icon.TabBarItem>
    </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
})

export default App;