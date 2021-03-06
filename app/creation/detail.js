import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Image, ListView, TextInput, Modal, AlertIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import Button from 'react-native-button';
import request from '../common/fetch';
import Config from "../common/config";

let width = Dimensions.get('window').width
let cachedRes = {
  nextPage: 1,
  items: [],
  total: 0
}

class Detail extends Component {
  static navigationOptions = {
    title: '视频详情',
  };
  state = {  }
  constructor(props) {
    super(props);
    this._onProgress = this._onProgress.bind(this)
    this._rePlay = this._rePlay.bind(this)
    this._onEnd = this._onEnd.bind(this)
    this._pause = this._pause.bind(this)
    this._resume = this._resume.bind(this)
    this._onError = this._onError.bind(this)
    this._hasMore = this._hasMore.bind(this)
    this._fetchMoreData = this._fetchMoreData.bind(this)
    this._renderFooter = this._renderFooter.bind(this)
    this._renderHeader = this._renderHeader.bind(this)
    this._focus = this._focus.bind(this)
    this._setModalVisible = this._setModalVisible.bind(this)
    this._blur = this._blur.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this._submit = this._submit.bind(this)
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 != r2
      }
    })
    this.state = {
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false,
      videoLoaded: false,
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,
      playing: false,
      isEnd: false,
      paused: false,
      videoOk: true,
      dataSource: ds.cloneWithRows([]),
      animationType: 'none',
      modalVisible: false,
      isSending: false,
      content: ''
    };
  }
  _onLoadStart(){
    console.log('start')
  }
  _onLoad(){
    console.log('load')
  }
  _onProgress(data){
    let duration = data.playableDuration
    let currentTime = data.currentTime
    let percent = Number((currentTime / duration).toFixed(2))
    let newState = {
      videoTotal: duration,
      currentTime: Number(data.currentTime.toFixed(2)), 
      videoProgress: percent
    }
    if (!this.state.videoLoaded) {
      newState.videoLoaded  = true
    }
    if (!this.state.playing && !this.state.isEnd) {
      newState.playing = true
    }
    this.setState(newState)
  }
  _onEnd(){
    this.setState({
      videoProgress: 1,
      playing: false,
      isEnd: true
    })
  }
  _onError(e){
    console.log(e)
    this.setState({
      videoOk: false
    })
  }
  _rePlay() {
    this.refs.videoPlayer.seek(0)
    this.setState({
      playing: true 
    })
  }
  _pause() {
    if (!this.state.paused) {
      this.setState({
        paused: true
      })
    }
  }
  _resume() {
    if (this.state.paused) {
      this.setState({
        paused: false
      })
    }
  }
  componentDidMount() {
    this._fetchData()
  }
  _fetchData(page){
    this.setState({
      isLoadingTail: true
    })
    request.get(`${Config.api.base}${Config.api.comment}`, {
      accessToken: 'aaa',
      creation: '123',
      page: page
    }).then(data => {
      if(data.success){
        let items = cachedRes.items.slice()
        items = items.concat(data.data)
        cachedRes.nextPage += 1        
        cachedRes.items = items
        cachedRes.total = data.total
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(cachedRes.items),
        })
        this.setState({
          isLoadingTail: false,
        })
      }
    }).catch(e => {
      this.setState({
        isLoadingTail: false,
      })
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
  _focus(){
    this._setModalVisible(true)
  }
  _setModalVisible(isVisible){
    this.setState({
      modalVisible: isVisible
    })
  }
  _blur(){

  }
  _closeModal(){
    this._setModalVisible(false)
  }
  _submit(){
    if (!this.state.content) {
      return AlertIOS.alert('留言不能为空')
    }
    if (this.state.isSending) {
      return AlertIOS.alert('正在评论中！')
    }
    this.setState({
      isSending: true
    }, () => {
      let body = {
        accessToken: 'abc',
        creation: '123',
        content: this.state.content
      }
      let url = Config.api.base + Config.api.comment
      request.post(url, body).then(data => {
        if(data && data.success){
          let items = cachedRes.items.slice()
          let content = this.state.content
          items = [{
            content: this.state.content,
            replyBy: {
              nickname: 'yyhaxx',
              avatar: 'http://dummyimage.com/640x640/b418e3'
            }
          }].concat(items)
          cachedRes.items = items
          cachedRes.total += 1
          this.setState({
            content: '',
            isSending: false,
            dataSource: this.state.dataSource.cloneWithRows(
              cachedRes.items
            )
          })
          this.setState({
            modalVisible: false
          })
        }
      }).catch(e => {
        console.log(e)
        this.setState({
          isSending: false,
        })
        AlertIOS.alert('留言失败')
      })
    })
  }
  _renderHeader(){
    const {params} = this.props.navigation.state
    return(
      <View
        style={styles.listHeader} 
      >
        <View
          style={styles.infoBox}
        >
          <Image 
            style={styles.avatar}
            source={{uri: params.data.author.avatar}}
          />
          <View
            style={styles.descBox}
          >
            <Text style={styles.nickname}>{params.data.author.nickname}</Text>
            <Text style={styles.title}>{params.data.title}</Text>
          </View>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.comment}>
            <TextInput
              placeholder='说出你的看法'
              style={styles.content}
              multiline={true}
              onFocus={this._focus}
            />
          </View>
        </View>
        <View
          style={styles.commentArea}
        >
          <Text
            style={styles.commentTitle}
          >
            精彩评论
          </Text>
        </View>
      </View>
    )
  }
  _renderRow(row){
    return (
      <View 
        key={row.id}
        style={styles.replyBox}
      >
        <Image 
          style={styles.replyAvatar}
          source={{uri: row.replyBy.avatar}}
        />
        <View
          style={styles.reply}
        >
          <Text style={styles.replyNickname}>{row.replyBy.nickname}</Text>
          <Text style={styles.replyContent}>{row.content}</Text>
        </View>
      </View>
    )
  }
  render() {
    const {params} = this.props.navigation.state
    return (
      <View style={styles.container}>
        <View style={styles.videoBox}>
          <Video
            ref='videoPlayer'
            source={{uri: params.data.video}}
            style={styles.video}
            volume={5}
            paused={this.state.paused}
            rate={this.state.rate}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={this.state.repeat}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onProgress={this._onProgress}
            onEnd={this._onEnd}
            onError={this._onError}
          />
          {
            !this.state.videoOk && <Text style={styles.failText}>
              视频出错了
            </Text>
          }
          {
            !this.state.videoLoaded && <ActivityIndicator
              style={styles.loading}
            />
          }
          {
            this.state.videoLoaded && !this.state.playing && <Icon
              onPress={this._rePlay}
              name='ios-play'
              style={styles.playIcon}
              size={48}
            />
          }
          {
            this.state.videoLoaded && this.state.playing && <TouchableOpacity
              onPress={this._pause}
              style={styles.pauseBtn}
            >
              {
                this.state.paused ? <Icon
                  onPress={this._resume}
                  name='ios-play'
                  style={styles.resumeIcon}
                  size={48}
                /> : <Text></Text> 
              }
            </TouchableOpacity>
          }
          <View style={styles.progressBox}>
            <View style={[styles.progressBar, {width: width * this.state.videoProgress}]}></View>
          </View>
        </View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}  
        onEndReached={this._fetchMoreData}
        onEndReachedThreshould={20}
        renderFooter={this._renderFooter}
        renderHeader={this._renderHeader}
        />
        <Modal
          animationType={'fade'}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
        >
          <View
            style={styles.modalContainer}
          >
            <Icon
              onPress={this._closeModal}
              name='ios-close-outline'
              style={styles.closeIcon}
            />
            <View style={styles.commentBox}>
              <View style={styles.comment}>
                <TextInput
                  placeholder='说出你的看法'
                  style={styles.content}
                  multiline={true}
                  onFocus={this._focus}
                  onBlur={this._blur}
                  defaultValue={this.state.content}
                  onChangeText={(text) => {
                    this.setState({
                      content: text
                    })
                  }}
                />
              </View>
            </View>
            <Button
              style={styles.submitBtn}
              onPress={this._submit}
            >
              评论
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  videoBox: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc',
  },
  progressBar: {
    width: 1,
    height: 2, 
    backgroundColor: '#ff6600'
  },
  playIcon: {
    position: 'absolute',
    top: 80,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 6,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },
  pauseBtn: {
    width: width,
    height: 360,
    position: 'absolute',
    left: 0,
    top: -15
  },
  resumeIcon: {
    position: 'absolute',
    top: 80,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 6,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66',
    alignSelf: 'center'
  },
  failText: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: width,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#fff'
  },
  infoBox: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },
  descBox: {
    flex: 1
  },
  nickname: {
    fontSize: 18
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },
  replyBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  replyAvatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },
  replyNickname: {
    color: '#666' 
  },
  replyContent: {
    color: '#666',
    marginTop: 4
  },
  reply: {
    flex: 1
  },
  loadingMore:{
    marginVertical: 20
  },
  loadingText: {
    color: '#777',
    textAlign: 'center'
  },
  listHeader: {
    marginTop: 10,
    width: width
  },
  commentBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: width
  },
  content:{
    paddingLeft: 3,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 80
  },
  commentArea: {
    width: width,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalContainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  closeIcon: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#ee753c'
  },
  submitBtn: {
    width: width - 20,
    padding: 16,
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ee735c',
    borderRadius: 4,
    color: '#ee753c',
    fontSize: 18
  }
})

export default Detail;