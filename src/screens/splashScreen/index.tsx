import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/route.type'
import { getData, removeItemValue } from '../../utils/storeage'
import { useAppDispatch, useAppSelector } from '../../types/redux.type'
import { setDataUser } from '../../redux/reducer/global'



const SplashScreen = ({navigation}:{navigation: NativeStackNavigationProp<RootStackParamList>}) => {
    const {user} = useAppSelector(selector => selector.global)
    const dispatch = useAppDispatch()
    useEffect(()=>{
       const redirect = async() =>{
        const profile = JSON.parse(await getData('profile'))
        if(profile){
          if(profile?.token){
            dispatch(setDataUser(profile))
            navigation.reset({index:0, routes:[{name:"MainApp"}]})
          }else{
            removeItemValue('profile')
            navigation.reset({index:0, routes:[{name:"LoginScreen"}]})

          }
        }else{
          navigation.reset({index:0, routes:[{name:"LoginScreen"}]})
        }
       
       }
       redirect()
    },[])
  return (
    <SafeAreaView style={styles.screen}>
        <View />
      <Text style={styles.txt}>Expense App </Text>
      <Text style={styles.txt2}>Created by Richard Abdul Kareem ❤️</Text>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:32
    },
    txt:{
        fontWeight:'bold',
        fontSize:32
    },
    txt2:{
        fontWeight:'medium',
        fontSize:16,
        marginTop:64
    }
})