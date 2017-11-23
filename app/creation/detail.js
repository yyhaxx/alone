import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
// const NativeVideo = Video.default()

let width = Dimensions.get('window').width

class Detail extends Component {
  static navigationOptions = {
    title: '视频细节',
  };
  state = {  }
  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      muted: true,
      resizeMode: 'contain',
      repeat: false
    };
  }
  _onLoadStart(){
    console.log('start')
  }
  _onLoad(){
    console.log('load')
  }
  _onProgress(data){
    console.log(data)
    console.log('progress')
  }
  _onEnd(){
    console.log('end')
  }
  _onError(e){
    console.log(e)
    console.log('error')
  }
  render() {
    const {params} = this.props.navigation.state
    console.log(params)
    return (
      <View style={styles.container}>
        <View style={styles.VideoBox}>
          <Video
            ref='VideoPlayer'
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
})

export default Detail;