import { Alert, AlertButton, AlertOptions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../types/route.type'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, CardExpense, Gap, HistoryExpenseCard, HistoryExpenseComponent } from '../../components'
import { useAppDispatch } from '../../types/redux.type'
import { deleteExpensesByEmail } from '../../redux/action/expense'
import { ExpenseType, userData } from '../../types/global.type'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// type ListUserScreenRouteProp = RouteProp<RootStackParamList, 'ListUsersScreen'>
type ListUserScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'ListUsersScreen'> & RouteProp<RootStackParamList, 'ListUsersScreen'>
const ListUsersScreen = (props: ListUserScreenRouteProp ) => {
  const {route} = props
  const data = route?.params?.user
  const expenses = data?.expenses
  const [localExpenses, setLocalExpenses] = useState(expenses)
  const dispatch = useAppDispatch()
  const totalExpense = useMemo(() =>{
      return localExpenses && localExpenses?.length > 0  ? localExpenses.map(item => Number(item.amount)).reduce((acc, prev) => acc + prev) : 0
    
  },[localExpenses?.length]) 
  const popAlert = (item: ExpenseType, idx:number) =>{
    
    const handleDelete = () =>{
      const expensesFilter = expenses?.filter((item, i) => i !== idx)
      const newData = {
        ...data,
        expenses: expensesFilter
      }
      const handleFilterLocalData = () =>{
        setLocalExpenses(expensesFilter)
      }
      if(data?.email){
        
        dispatch(deleteExpensesByEmail(data?.email, newData, handleFilterLocalData))
      }
    }
    const btnAlert : AlertButton[]  = [{
      isPreferred:true,
      onPress: handleDelete,
      text:"yes"
    },
    {
      isPreferred: true,
      onPress: () => {console.log("no")},
      text:"No"
    }
  ]
    const options : AlertOptions = {
      cancelable: true,
  
    }
    Alert.alert("Delete Expense", "are you sure want to delete?", btnAlert, options )
  }
  return (
    <View style={styles.screnn}>
      
      <ScrollView>
        <Gap height={16} />
        <Text style={styles.textBlackBold16px}>User&apos;s name: {data?.fullname}</Text>
        <Gap height={8} />
        <Text style={styles.textBlackBold16px}>Expense Total : {totalExpense}</Text>
        <Gap height={8} />
        <Text style={styles.textBlackBold16px}>List Expense</Text>

        {localExpenses && localExpenses?.length > 0 ? localExpenses?.map((item, idx) => {
          return(
            <HistoryExpenseCard 
            type='admin'
            onpress={()=> popAlert(item, idx)}
            title={item.category} 
            amount={item.amount} 
            date={item.create_at} 
            key={idx} />
          )
        }): <Text style={[styles.textBlackBold16px,{ textAlign:"center", marginTop:64}]}>No Expense</Text>}
      </ScrollView>
    </View>
  )
}

export default ListUsersScreen

const styles = StyleSheet.create({
  screnn:{
    paddingHorizontal:16
  },
  textBlackBold16px:{
    fontWeight:"bold",
    fontSize:16
  }
})