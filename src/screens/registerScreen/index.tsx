import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from '../../components'
import { TouchableOpacity } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/route.type'
import { registerUser } from '../../services/authModels.service'
import { RegisterData } from '../../types/global.type'
import { showMessage } from '../../utils/showMessage'
import Feather from "react-native-vector-icons/Feather"

const RegisterScreen = ({navigation}:{navigation:NativeStackNavigationProp<RootStackParamList>}) => {
  const [form, setForm] = useState({
    fullname: "",
    email:"",
    password:"",
    rePassword:""
  })
  const [visiblePass, setVisiblePass] = useState(true)
  const [visiblePass2, setVisiblePass2] = useState(true)
  const handleRegister = async() =>{
    try{
      await registerUser(form)
      setForm({email:"", fullname:"", password:"",rePassword:""})
      showMessage("Success Register, you can login")
      navigation.goBack()
    }catch(e : Error | unknown){
      if(e instanceof Error){
        showMessage(e.message, "danger")
      }
    }
  }

  const onChangeText = (key:keyof RegisterData, value:string) =>{
    setForm(current =>{
      return{
        ...current,
        [key]:value
      }
    })
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.txtBlack16pxSemiBold}>Register</Text>
      <TextInput 
      onChangeText={(t)=> onChangeText('fullname', t)}
      label='full name' 
      placeholder='John Doe'/>
      <TextInput 
      onChangeText={(t)=> onChangeText('email', t)}
      placeholder='john@mail.com'
      keyboardType='email-address'
      styleContainer={styles.txtInput} 
      autoCapitalize={'none'}
      label='Email' />
      <TextInput 
        onPressIcon={()=> setVisiblePass(prev => !prev)}
        icon={visiblePass ? <Feather name='eye-off' size={16} /> : <Feather name='eye' size={16} />}
      onChangeText={(t)=> onChangeText('password', t)}
      placeholder='********'
      autoCapitalize={'none'}
      secureTextEntry={visiblePass}
      styleContainer={styles.txtInput} 
      label='Password' />
      <TextInput 
      onPressIcon={()=> setVisiblePass2(prev => !prev)}
      icon={visiblePass2 ? <Feather name='eye-off' size={16} /> : <Feather name='eye' size={16} />}
      onChangeText={(t)=> onChangeText('rePassword', t)}
      placeholder='********'
      autoCapitalize={'none'}
      secureTextEntry={visiblePass2}
      styleContainer={styles.txtInput} 
      label='Password' />
      <View style={styles.wpTextToLogin}>
        <Text style={[styles.txtBlack12pxBold]}>Already Have Account? </Text>
        <TouchableOpacity 
        onPress={()=> navigation.navigate('LoginScreen')}
        ><Text style={styles.txtBlack12pxBold}>Login</Text></TouchableOpacity>
      </View>
      <Button 
      onPress={handleRegister}
      style={styles.btn}  
      label='Register'  />
    </SafeAreaView>
  )
}

export default RegisterScreen

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