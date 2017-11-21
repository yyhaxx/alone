import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let width = Dimensions.get('window').width

class List extends Component {

  state = {  }

  constructor(props){
    super(props)
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 != r2
      }
    })
    this.state = {
      dataSource: ds.cloneWithRows([{
        "id":"520000198105183420",
        'title': '测试内容1l7j"',
        "thumb":"https://dummyimage.com/1200x600/336d66","video":"http://112.25.17.244/youku/6775ABB2FDE4E79779E37512C/03000801005A0A281A62762AA6547A150743CC-B9B4-77C0-F149-D40AC28BFE3B.mp4?sid=051123041444412626ad2&ctype=12&ccode=050F&duration=387&expire=18000&psid=a34b1d65bea52d89fb6a5c6fc9b5c95a&ups_client_netip=df55cb84&ups_ts=1511230414&ups_userid=&utid=QsL5EWbg2yUCAWXM2DIfemsi&vid=XMzE1NDk5MDQyNA%3D%3D&vkey=A9d55e5640f1416dab12ff592a9fa9df0"
      },
      {
        "id":"110000198512045600",
        'title': '测试内容1l7j"',
        "thumb":"https://dummyimage.com/1200x600/e15e26","video":"http://112.25.17.244/youku/6775ABB2FDE4E79779E37512C/03000801005A0A281A62762AA6547A150743CC-B9B4-77C0-F149-D40AC28BFE3B.mp4?sid=051123041444412626ad2&ctype=12&ccode=050F&duration=387&expire=18000&psid=a34b1d65bea52d89fb6a5c6fc9b5c95a&ups_client_netip=df55cb84&ups_ts=1511230414&ups_userid=&utid=QsL5EWbg2yUCAWXM2DIfemsi&vid=XMzE1NDk5MDQyNA%3D%3D&vkey=A9d55e5640f1416dab12ff592a9fa9df0"
      }])
    }
  }

  renderRow(row){
    return(
      <TouchableHighlight>
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image
            source={{uri: row.thumb}}
            style={styles.thumb}
          />
          <Icon 
              name='ios-play'
              size={28}
              style={styles.play}
            />
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name="ios-heart-outline"
                size={28}
                style={styles.up}
              />
              <Text style={styles.handleText}>
                喜欢
              </Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
                name="ios-chatboxes-outline"
                size={28}
                style={styles.commentIcon}
              />
              <Text style={styles.handleText}>
                评论
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },

  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  thumb:{
    width: width,
    height: width * 0.56,
    resizeMode: 'cover'
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222'
  },
  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  play: {
    position: 'absolute',
    bottom: 60,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66'
  },
  handleText:{
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  up: {
    fontSize: 22,
    color: '#333'
  },
  commentIcon:{
    fontSize: 22,
    color: '#333'
  }
})

export default List;