import { Alert, AlertButton, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Gap } from '../../components'
import { useAppDispatch } from '../../types/redux.type'
import { userLogout } from '../../redux/action/globalAction'
import { RootStackParamList } from '../../types/route.type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { removeItemValue } from '../../utils/storeage'

const ProfileScreen = ({navigation}: {navigation: NativeStackNavigationProp<RootStackParamList>}) => {
    const dispatch = useAppDispatch();

    const handleLogout = () =>{
        dispatch(userLogout())
        removeItemValue('profile')
        navigation.reset({index:0, routes:[{name:"LoginScreen"}]})
    }
    const onPopup = () =>{
        const btn : AlertButton[] = [
            {
                onPress: handleLogout,
                text:"Yes"
            },
            {
                text:"No"
            }
        ]
        Alert.alert('Logout', 'Are you sure want to logout?',btn)
    }
  return (
    <SafeAreaView>
            <Gap height={8} />
            <TouchableOpacity onPress={()=> navigation.navigate('EditProfileScreen')} style={styles.paddingText}>
                <Text style={styles.textBlack16SemiBold}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <Gap height={8} />
            <TouchableOpacity onPress={onPopup  } style={styles.paddingText}>
                <Text style={styles.textBlack16SemiBold}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.line} />
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    line:{
        borderBottomWidth:1,
        borderBottomColor:"#9e9e9e",
        marginTop:8
    },
    textBlack16SemiBold:{
        fontWeight:'semibold',
        fontSize:18
    },
    paddingText:{
        paddingLeft:16
    }
})