import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AlertIOS  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import request from "../common/fetch";
import Config from "../common/config";

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
    return (
      <View style={styles.container}>
        <View style={styles.signupBox}>
          <Text style={styles.title}>快速登录</Text>
          <TextInput
            placeholder="请输入手机号"
            autoCaptialize={'none'}
            autoCorrect={false}
            keyboradType='number-pad'
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
                keyboradType='number-pad'
                style={styles.inputField}
                onChangeText={(text) => {
                  this.setState({
                    verifyCode: text
                  })
                }}
              />
            </View>
          }
          {
            this.state.codeSent ? <Button
              style={styles.btn1}
              onPress={this._submit}
              title="登录"
            /> : <Button
              title="获取验证码"
              style={styles.btn1}
              onPress={this._sendVerifyCode}
            />
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
    flex: 1,
    // height: 100,
    padding: 5,
    color: '#666',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  btn1: {
    padding: 10,
    marginTop: 10,
    // backgroundColor: 'transparent',
    borderColor: '#ee735c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee735c'
  }
})

export default Login;