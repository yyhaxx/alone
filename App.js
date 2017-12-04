import React, { Component } from 'react';
import { View, Text, TabBarIOS, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

import List from './app/creation'
import Detail from './app/creation/detail'
import Edit from './app/edit'
import Login from './app/account/login'

class App extends Component {
  static navigationOptions = {
    title: 'alone',
  };
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'list'
    }
  }

  state = { 
    goddess: 'xiaoxi',
  }
  render() {
    const {navigate} = this.props.navigation
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
        <List navigate={navigate}/>
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
        selected={this.state.selectedTab === 'login'}
        onPress={() => {
          this.setState({
            selectedTab: 'login'
          })
        }}
      >
        <Login/>
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

export default StackNavigator({
  App: {
    screen: App
  },
  Detail: {
    screen: Detail
  }
})
