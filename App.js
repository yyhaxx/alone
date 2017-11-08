import React, { Component } from "react";
import { Text, AppRegistry, Image, View, StyleSheet } from "react-native";

export default class App extends Component {
  render() {
    let pic = {
      uri: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
    }
    return (
      // <Text>Helle Word</Text> 
      <View style={{flex: 1}}>
        <Image source={pic} style={{width: 193, height: 110}} />
        <Greeting name="xiaoxi"></Greeting>
        <Blink text="污污污污污污污污污污污污～"/>
        <Text style={styles.red}>1</Text>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}}/>
          <View style={{flex: 2, backgroundColor: 'skyblue'}}/>
          <View style={{flex: 3, backgroundColor: 'steelblue'}}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
        </View>
      </View>
    );
  }
}

class Greeting extends Component {
  render() {
    return (
      <Text style={{backgroundColor: 'skyblue'}}>污污污污污污污污污污污污～</Text>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: true
    };
    setInterval(() => {
      this.setState(previousState => {
        return {
          showText: !previousState.showText
        }
      })
    }, 100)
  }
  
  render() {
    let display = this.state.showText ? this.props.text : ' ';    
    return (
      <Text>{display}</Text>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  }
})

AppRegistry.registerComponent('App', () => App)
