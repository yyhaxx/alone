import React, { Component } from 'react';
import { View, Text } from 'react-native';

const element = (
  <h1>
    Hello
  </h1>
)
class App extends Component {
  constructor(props){
    super(props)
    this.state = {time: 0}
  }

  timesPuls(){
    let times = this.state.time
    times++
    this.setState({
      time: times
    })
  }

  state = { 
    goddess: 'xiaoxi',
  }

  componentWillMount(){
    console.log('componendstWillMount')
  }

  componentDidMount(){
    console.log('componendstDidMount')
  }

  render() {
    return (
      <View style={{marginTop: 40}}>
        <View>        
          <Text> Hello world!a </Text>          
        </View>
        <View>
          <Text onPress={this.timesPuls.bind(this)}> 点我 </Text>
          <Text> 你点了我 {this.state.time} </Text>
        </View>
      </View>
    );
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate')
    return true
  }

  componentWillUpdate(){
    console.log('componentWillUpdate')
  }

  componentDidUpdate(){
    console.log('componendstDidUpdate')
  }

}

export default App;