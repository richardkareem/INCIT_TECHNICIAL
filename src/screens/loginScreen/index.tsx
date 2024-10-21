import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from '../../components'
import { TouchableOpacity } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/route.type'
import { getAllUserByEmail } from '../../services/authModels.service'
import { showMessage } from '../../utils/showMessage'
import Feather from "react-native-vector-icons/Feather"
const LoginScreen = ({navigation}:{navigation:NativeStackNavigationProp<RootStackParamList>}) => {
  const [form, setForm]= useState({
    email: "",
    password: ""
  })

  const [visiblePass, setVisiblePass] = useState(true)
  const [loading, setLoading] = useState(false);
  const onChange = (key : string, value: string) =>{
    setForm((prev) =>{
      return {
        ...prev,
        [key]:value
      }
    })
  }

  const handleLogin =  async() =>{
    setLoading(true)
    try {
      await getAllUserByEmail(form.email, form.password, onSuccess)
    } catch (error: Error | unknown) {
      if(error instanceof Error)
      showMessage(error.message, "danger")
    }finally{
      setLoading(false)
    }
  }

const onSuccess = () =>{
  showMessage("Success Login", 'success')
  navigation.reset({index:0, routes:[{name:"MainApp"}]})
}

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.txtBlack16pxSemiBold}>Login</Text>
      <TextInput 
      keyboardType='email-address'
      autoCapitalize='none'
       onChangeText={t => onChange('email',t)}
       value={form.email}
       placeholder='johndoe@mail.com'
       styleContainer={styles.txtInput} 
       label='Email' />
      <TextInput 
      onPressIcon={()=> setVisiblePass(prev => !prev)}
        icon={visiblePass ? <Feather name='eye-off' size={16} /> : <Feather name='eye' size={16} />}
       secureTextEntry={visiblePass}
       onChangeText={t => onChange('password',t)}
       value={form.password}
       placeholder='*********'
       styleContainer={styles.txtInput} label='Password' />
      <View style={styles.wpTextToLogin}>
        <Text style={[styles.txtBlack12pxBold]}>Dont&apos;t Have Account? </Text>
        <TouchableOpacity 
        onPress={()=> navigation.navigate('RegisterScreen')}
        ><Text style={styles.txtBlack12pxBold}>Register</Text></TouchableOpacity>
      </View>
      <Button 
      onPress={handleLogin}
      disable={form.email.trim() === "" || form.password.trim()=== "" || loading}
      style={styles.btn}  label='Login'  />
    </SafeAreaView>
  )
}

export default LoginScreen

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