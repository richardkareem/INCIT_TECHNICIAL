import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/route.type'
import { useAppSelector } from '../../types/redux.type'
import { HistoryExpenseCard } from '../../components'

const DetailHistoryScreen = () => {
  const {user} = useAppSelector(selector => selector.global)
  const data = user?.expenses
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.ct}>
        
        {data?.map((item, idx)=> <HistoryExpenseCard amount={item.amount} date={item.create_at} title={item.expense} key={idx} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailHistoryScreen

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    ct:{
      paddingHorizontal:16
    }
})