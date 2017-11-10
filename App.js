import React, { Component } from "react";
import { Text, AppRegistry, Image, View, StyleSheet, TextInput, ScrollView, FlatList, SectionList } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  render() {
    let pic = {
      uri: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
    }
    let pic1 = {
      uri: 'https://timgmb03.bdimg.com/timg?searchbox_feed&sec=0&di=cc3d75a2cd0755bcd24faafc480744a0&src=http%3A%2F%2Ftimg01.baidu-2img.cn%2Ftimg%3Fpa%26Imgtype%3D0%26sec%3D1439619614%26di%3De1384486ba254f3caae522ad809aa30e%26quality%3D90%26size%3Db870_10000%26src%3Dhttp%3A%2F%2Fbos.nj.bpc.baidu.com%2Fv1%2Fmediaspot%2F52495dca675df719706a8bb886038501.jpeg'
    }
    return (
      <View style={{flex: 1}}>
        <Image source={pic} style={{width: 193, height: 110, marginLeft: 'auto', marginRight: 'auto'}} />
        <View style={{padding: 10}}>
          <TextInput style={{height: 40, borderColor: '#eee', borderWidth: 1}} placeholder="" onChangeText={text => this.setState({text})}/>
          <Text style={{padding: 10, fontSize: 40}}>
            {this.state.text.split('').map(word => word && '🌹').join(' ')}
          </Text>
        </View>
        <View style={styles.container}>
          <FlatList 
            data={[
              {key: 'a'},
              {key: 'b'},
              {key: 'c'},
              {key: 'd'},
              {key: 'e'},
              {key: 'f'}
            ]}
            renderItem={({item})=><Text style={styles.item}>{item.key}</Text>}
          />
        </View>
        <View style={styles.container}>
          <SectionList
            sections={[
              {title: 'D', data: ['Devin']},
              {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Joel', 'Julie']}
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text> }
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          />
        </View>
        <ScrollView>
          <Image source={pic1} style={{width: 193, height: 110, marginLeft: 'auto', marginRight: 'auto'}} />
        </ScrollView>
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
  },
  container: {
    flex: 1,
    marginBottom: 10
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
})

AppRegistry.registerComponent('App', () => App)
