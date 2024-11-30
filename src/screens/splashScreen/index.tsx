/* eslint-disable react-hooks/exhaustive-deps */
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route.type';
import { getData, removeItemValue } from '../../utils/storeage';
import { useAppDispatch } from '../../types/redux.type';
import services from '../../db/services';
import { setDataUser } from '../../redux/reducer/global';
import expense from '../../db/expense';

const SplashScreen = ({navigation}:{navigation: NativeStackNavigationProp<RootStackParamList>}) => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
       const redirect = async() =>{
        dispatch(services.initialTableAndValue());
        const profile = await getData('profile');
        if(profile){
          if(profile?.token){
            dispatch(setDataUser({
              email: profile.email,
              full_name: profile.full_name,
              id_user: profile.id_user,
              role: profile.role,
              token: profile.token,
              password: '',
            }));
            dispatch(expense.getExpenseUser(profile?.id_user));
            navigation.reset({index:0, routes:[{name:'MainApp'}]});
          }else{
            removeItemValue('profile');
            navigation.reset({index:0, routes:[{name:'LoginScreen'}]});

        }
        }else{
          navigation.reset({index:0, routes:[{name:'LoginScreen'}]});
        }

       };
       redirect();
    },[]);
  return (
    <SafeAreaView style={styles.screen}>
        <View />
      <Text style={styles.txt}>Expense App </Text>
      <Text style={styles.txt2}>Created by Richard Abdul Kareem ❤️</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:32,
    },
    txt:{
        fontWeight:'bold',
        fontSize:32,
    },
    txt2:{
        fontWeight:'medium',
        fontSize:16,
        marginTop:64,
    },
});
