import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, Image, Dimensions, ActivityIndicator, RefreshControl, Alert, AlertIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import request from '../common/fetch'
import Config from "../common/config";

let width = Dimensions.get('window').width
let cachedRes = {
  nextPage: 1,
  items: [],
  total: 0
}

class Item extends Component {
  constructor(props) {
    super(props);
    this._up = this._up.bind(this)
    this.state = {
      up: this.props.up
    };
  }

  _up() {
    let up = !this.state.up
    let row = this.props.row
    let url = Config.api.base + Config.api.up
    let body = {
      id: row.id,
      up: up ? 'yes' : 'no',
      accessToken: 'abc'
    }
    request.post(url, body).then(data => {
      if(data && data.success){
        this.setState({
          up: up
        })
      }else{
        AlertIOS.alert('点赞失败')
      }
    }).catch(e => {
      console.log(e)
      AlertIOS.alert('点赞失败')
    })
  }

  render() {
    let row = this.props.row
    const navigate = this.props.navigate    
    return(
      <TouchableHighlight onPress={() => {navigate('Detail', {data: row})}}>
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
                name={this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                size={28}
                onPress={this._up}
                style={[styles.up, this.state.up ? null : styles.down]}
              />
              <Text style={styles.handleText} onPress={this._up}>
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
}

class List extends Component {

  state = {  }

  constructor(props){
    super(props)
    this._fetchMoreData = this._fetchMoreData.bind(this)
    this._renderFooter = this._renderFooter.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this._renderRow = this._renderRow.bind(this)
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 != r2
      }
    })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoadingTail: false,
      isRefreshing: false
    }
  }

  _renderRow(row){
    const navigate = this.props.navigate
    return <Item 
      row={row} 
      up={false}
      navigate={navigate}
    />
  }

  componentDidMount(){
    this._fetchData(1)
  }

  _fetchData(page){
    if(page != 0 ){
      this.setState({
        isLoadingTail: true
      })
    }else{
      this.setState({
        isRefreshing: true 
      })
    }
    request.get(`${Config.api.base}${Config.api.creations}`, {
      accessToken: 'aaa',
      page: page
    }).then(data => {
      if(data.success){
        let items = cachedRes.items.slice()
        if(page != 0){
          items = items.concat(data.data)
          cachedRes.nextPage += 1        
        }else{
          items = data.data.concat(items)
        }
        cachedRes.items = items
        cachedRes.total = data.total
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(cachedRes.items),
        })
        if(page != 0 ){
          this.setState({
            isLoadingTail: false,
          })
        }else{
          this.setState({
            isRefreshing: false 
          })
        } 
      }
    }).catch(e => {
      if(page != 0 ){
        this.setState({
          isLoadingTail: false,
        })
      }else{
        this.setState({
          isRefreshing: false 
        })
      } 
      console.log(e)
    })
  }

  _hasMore(){
    return cachedRes.items.length < cachedRes.total
  }

  _fetchMoreData(){
    if(!this._hasMore() || this.state.isLoadingTail){
      return 
    }
    let page = cachedRes.page
    this._fetchData(page)
  }
  _onRefresh(){
    if(!this._hasMore() || this.state.isRefreshing){
      return 
    }
    this._fetchData(0)
  }

  _renderFooter(){
    if(!this._hasMore() && cachedRes.total != 0){
      return(
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多数据</Text>
        </View>
      )
    }else if(!this.state.isLoadingTail){
      return <View style={styles.loadingMore} />
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshould={20}
          renderFooter={this._renderFooter}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff6600"
              title="拼命加载中。。。"
            />
          }  
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
    color: '#eb7566'
  },
  down: {
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