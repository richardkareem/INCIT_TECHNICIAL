import { StyleSheet, Text,SafeAreaView, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Button, TextInput } from '../../components'
import { getAllUserByEmail } from '../../services/authModels.service'
import { showMessage } from '../../utils/showMessage'
import Feather from "react-native-vector-icons/Feather"
import users from '../../db/users'
import db from '../../db/db'
import { connect } from 'react-redux'
import { setDataUser } from '../../redux/reducer/global'
import { storeData } from '../../utils/storeage'
import uuid from 'react-native-uuid';
import expense from '../../db/expense'
class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:"",
      password:"",
      visiblePass: true,
      loading: false
    }
  }

  handleLogin = async() =>{
    this.setState({loading: true})
    try {
      const database = await db.connectToDb();
      const user = await users.findUserByEmail(database, this.state.email);
      if(user.password != this.state.password){
        throw new Error("password / email salah")
      }
      
      user.token = uuid.v4()
      await users.updateTokenUser(database, user.id_user, user.token)
      this.props.setDataUser(user)
  
      this.props.getExpenseUser(user.id_user)
      this.props.navigation.reset({index:0, routes:[{name:"MainApp"}]})
    } catch (error) {
      showMessage(error?.message, "danger")
    } finally {
      this.setState({loading: false})
    }
  }

  onSuccess = ()=>{
    showMessage("Success Login", 'success')
    this.props.navigation.reset({index:0, routes:[{name:"MainApp"}]})
  }

  onChangeText = (key, value) =>{
    this.setState({[key]: value})
  }
 
  render(){
    const {email,password,visiblePass, loading} = this.state
    return (
      <SafeAreaView style={styles.screen}>
          <Text style={styles.txtBlack16pxSemiBold}>Login</Text>
           <TextInput 
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={t => this.onChangeText('email',t)}
            value={email}
            placeholder='johndoe@mail.com'
            styleContainer={styles.txtInput} 
            label='Email' />
             <TextInput 
            onPressIcon={()=> this.setState({visiblePass: !visiblePass})}
            icon={visiblePass ? <Feather name='eye-off' size={16} /> : <Feather name='eye' size={16} />}
            secureTextEntry={visiblePass}
            onChangeText={t => this.onChangeText('password',t)}
            value={password}
            placeholder='*********'
            styleContainer={styles.txtInput} label='Password' />
            <View style={styles.wpTextToLogin}>
            <Text style={[styles.txtBlack12pxBold]}>Don't Have Account? </Text>
            <TouchableOpacity 
            onPress={()=> this.props.navigation.navigate('RegisterScreen')}
            ><Text style={styles.txtBlack12pxBold}>Register</Text></TouchableOpacity>
          </View>
          <Button 
            onPress={this.handleLogin}
            disable={email.trim() === "" || password.trim()=== "" || loading}
            style={styles.btn}  label='Login'  />
          
      </SafeAreaView>
    )
  }
}

mapDispatchToProp = (dispatch, onProps) =>{
  return {
    setDataUser: (user)=>{
      storeData('profile', user).then(()=>{
        const newUser = {...user}
        newUser.id = user.id
        dispatch(setDataUser(newUser))
      })
    },
    getExpenseUser: (id_user)=> {
      dispatch(expense.getExpenseUser(id_user))
    }
  }
}
export default connect(null,mapDispatchToProp)(LoginScreen);

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  txtInput:{
    marginTop:8
  },
  btn:{
    marginTop:16
  },
  txtBlack12pxBold:{
    fontWeight:"bold",
    fontSize:12
  },
  txtBlack16pxSemiBold:{
    fontWeight:"bold",
    fontSize:32
  },
 
  wpTextToLogin:{
    flexDirection:"row",
    justifyContent:"center",
    columnGap: 4,
    marginTop:16

  }

})