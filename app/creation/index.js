import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, Image, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import request from '../common/fetch'
import Config from "../common/config";
import { setTimeout } from 'core-js/library/web/timers';

let width = Dimensions.get('window').width
let cachedRes = {
  nextPage: 1,
  items: [],
  total: 0
}

class List extends Component {

  state = {  }

  constructor(props){
    super(props)
    this._fetchMoreData = this._fetchMoreData.bind(this)
    this._renderFooter = this._renderFooter.bind(this)
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 != r2
      }
    })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoadingTail: false,
    }
  }

  _renderRow(row){
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

  componentDidMount(){
    this._fetchData(1)
  }

  _fetchData(page){
    this.setState({
      isLoadingTail: true
    })
    request.get(`${Config.api.base}${Config.api.creations}`, {
      accessToken: 'aaa',
      page: page
    }).then(data => {
      if(data.success){
        let items = cachedRes.items.slice()
        items = items.concat(data.data)
        cachedRes.items = items
        cachedRes.total = data.total
        setTimeout(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(cachedRes.items),
            isLoadingTail: false
          }) 
        }, 5000)
      }
    }).catch(e => {
      this.setState({
        isLoadingTail: false
      }) 
      console.log(e)
    })
  }

  _hasMore(){
    return cachedRes.items.length !== cachedRes.total
  }

  _fetchMoreData(){
    if(!this._hasMore() || this.state.isLoadingTail){
      return 
    }
    let page = cachedRes.page
    this._fetchData(page)
  }

  _renderFooter(){
    if(!this._hasMore()){
      return(
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多数据</Text>
        </View>
      )
    }else{
      return(
        <ActivityIndicator
          style={styles.loadingMore}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshould={20}
          renderFooter={this._renderFooter}
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
    backgroundColor: '#bbb'
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
  },
  loadingMore:{
    marginVertical: 20
  },
  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
})

export default List;