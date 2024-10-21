import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Button, Gap, TextInput } from '../../components'
import { useAppDispatch, useAppSelector } from '../../types/redux.type'
import { userData } from '../../types/global.type'
import { updateUserProfile } from '../../redux/action/globalAction'
import Feather from "react-native-vector-icons/Feather"
import { showMessage } from '../../utils/showMessage'
const EditProfileScreen = () => {
  const {user} = useAppSelector(selector => selector.global)
  const dispatch = useAppDispatch()
  const [profileLs, setProfleLs] = useState<userData>()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState({
    password1: "",
    password2: ""
  })
  const [visiblePass, setVisiblePass] = useState(true)
  const [visiblePass2, setVisiblePass2] = useState(true)

  useEffect(()=>{
    setProfleLs(user)
  },[])
  const handleChangeProfile = () =>{
    if(password.password1 !== password.password2){
      showMessage("password not same", 'danger')
      return
    }
    if(profileLs){
      dispatch(updateUserProfile(profileLs, setLoading))
    }
  }

  const onChangeText = (key: string, value: string) =>{
      setProfleLs(prev =>{
        if(prev){
          return{
            ...prev,
            [key]: value
          }
        }
       })
  }
  const onChangePassword = (key: string, value: string) =>{
    setPassword(prev =>{
      return{
        ...prev,
        [key]:value
      }
    })
  }
  return (
    <SafeAreaView style={styles.screen}>
      {profileLs ? (
        <View style={styles.wp}>
        <TextInput 
        onChangeText={(t)=> onChangeText('fullname', t)} 
        label='Full Name' 
        styleContainer={styles.txtInput} 
        value={profileLs.fullname} />
        <TextInput 
        editable={false}
        selectTextOnFocus={false}
        label='email' value={profileLs.email}  styleContainer={styles.txtInput}  />
        <TextInput 
        onPressIcon={()=> setVisiblePass(prev => !prev)}
        icon={visiblePass ? <Feather name='eye-off' size={16} /> : <Feather name='eye' size={16} />}
      onChangeText={(t)=> onChangePassword('password1', t)}
      placeholder='********'
      autoCapitalize={'none'}
      secureTextEntry={visiblePass}
      styleContainer={styles.txtInput} 
      label='Password' />
      <TextInput 
      onPressIcon={()=> setVisiblePass2(prev => !prev)}
      icon={visiblePass2 ? <Feather name='eye-off' size={16} /> : <Feather name='eye' size={16} />}
      onChangeText={(t)=> onChangePassword('password2', t)}
      placeholder='********'
      autoCapitalize={'none'}
      secureTextEntry={visiblePass2}
      styleContainer={styles.txtInput} 
      label='Password' />
      <Gap height={16} />
      <Button disable={loading} loading={loading}  label='Save' onPress={handleChangeProfile} />
        </View>
      ):null}
    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:"#fff"
  },
  wp:{
    paddingHorizontal:16,
    marginTop:16
  },
  txtInput:{
    marginTop:8
  },
})