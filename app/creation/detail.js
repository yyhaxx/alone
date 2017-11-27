import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

let width = Dimensions.get('window').width

class Detail extends Component {
  static navigationOptions = {
    title: '视频细节',
  };
  state = {  }
  constructor(props) {
    super(props);
    this._onProgress = this._onProgress.bind(this)
    this._rePlay = this._rePlay.bind(this)
    this._onEnd = this._onEnd.bind(this)
    this.state = {
      rate: 1,
      muted: true,
      resizeMode: 'contain',
      repeat: false,
      videoLoaded: false,
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,
      playing: false,
      isEnd: false
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
    console.log('error')
  }
  _rePlay() {
    this.refs.videoPlayer.seek(0)
    this.setState({
      playing: true 
    })
  }
  render() {
    const {params} = this.props.navigation.state
    return (
      <View style={styles.container}>
        <View style={styles.VideoBox}>
          <Video
            ref='videoPlayer'
            source={{uri: params.data.video}}
            style={styles.video}
            volume={5}
            paused={false}
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

          <View style={styles.progressBox}>
            <View style={[styles.progressBar, {width: width * this.state.videoProgress}]}></View>
          </View>
        </View>
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
    height: 360,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 140,
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
    top: 140,
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
  }
})

export default Detail;