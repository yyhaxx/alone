import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, AlertIOS, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import request from "../common/fetch";
import Config from "../common/config";
import Button from 'react-native-button';
import CountdownView from 'rn-countdown';

class Login extends Component {
  state = {  }
  constructor(props) {
    super(props);
    this._sendVerifyCode = this._sendVerifyCode.bind(this)
    this._showVerifyCode = this._showVerifyCode.bind(this)
    this._submit = this._submit.bind(this)
    this.state = {
      codeSent: false,
      phoneNumber: '',
      verifyCode: ''
    };
  }
  _sendVerifyCode(){
    let phoneNumber = this.state.phoneNumber;
    if (!phoneNumber) {
      return AlertIOS.alert('手机号不能为空')
    }
    let body = {
      phoneNumber: phoneNumber,
    }

    let signupURL = Config.api.base + Config.api.signup

    request.post(signupURL, body).then(data => {
      if (data && data.success) {
        this._showVerifyCode()
      }else{
        AlertIOS.alert('获取验证码失败')
      }
    }).catch(e => {
      AlertIOS.alert('获取验证码失败')
    })
  }
  _showVerifyCode(){
    this.setState({
      codeSent: true
    })
  }
  _submit(){

  }
  render() {
    const style = this.state.hasText ? {backgroundColor: 'rgb(59, 197, 81)', borderWidth: 0} : {};
    const title = this.state.hasText ? {color: '#fff'} : {};
    return (
      <View style={styles.container}>
        <View style={styles.signupBox}>
          <Text style={styles.title}>快速登录</Text>
          <TextInput
            placeholder="请输入手机号"
            autoCaptialize={'none'}
            autoCorrect={false}
            keyboardType='number-pad'
            style={styles.inputField}
            onChangeText={(text) => {
              this.setState({
                phoneNumber: text
              })
            }}
          />
          {
            this.state.codeSent && <View
              style={styles.verifyCodeBox}
            >
              <TextInput
                placeholder="请输入验证码"
                autoCaptialize={'none'}
                autoCorrect={false}
                keyboardType='number-pad'
                style={styles.codeInputField}
                onChangeText={(text) => {
                  this.setState({
                    verifyCode: text
                  })
                }}
              />
              {
                this.state.countingDone ? <Button
                  style={styles.countBtn}
                  onPress={
                    this._sendVerifyCode
                  }
                >获取验证码</Button> : <CountdownView
                  ref={r => this.countdown = r}
                  time={60}
                  title="发送验证码"
                  overTitle="重新发送"
                  style={[styles.countdown, style]}
                  titleStyle={[styles.countdownTitle, title]}
                  countingTitleTemplate="发送中({time})"
                  countingStyle={styles.countingdown}
                  countingTitleStyle={styles.countingTitle}
                  shouldStartCountdown={this.shouldStartCountdown}
                  onNetworkFailed={this.handleNetworkFailed}
                />
              }
            </View>
          }
          {
            this.state.codeSent ? <Button
              style={styles.btn}
              onPress={this._submit}
            >登录</Button>: <Button
              style={styles.btn}
              onPress={this._sendVerifyCode}
            >获取验证码</Button>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9'
  },
  signupBox: {
    marginTop: 30,
  },
  title: {
    marginBottom: 20,
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },
  inputField: {
    // flex: 1,
    height: 40,
    padding: 10,
    color: '#666',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10
  },
  btn: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'red',
    borderColor: '#ee735c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee735c'
  },
  verifyCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ebebeb',
    width: Dimensions.get('window').width,
    backgroundColor: '#fff'
  },
  codeInputField: {
    width: Dimensions.get('window').width * 0.6,
    height: 40,
    lineHeight: 40,
    color: '#666',
    fontSize: 16,
  },
  countdown: {
    borderRadius: 15,
    backgroundColor: '#777',
  },
  countingdown: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth
  },
  countdownTitle: {color: '#ccc'},
  countingTitle: {color: '#ccc'}
})

export default Login;