import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types/route.type'
import { useAppDispatch, useAppSelector } from '../../../types/redux.type'
import { CardExpense, Gap } from '../../atoms'
import PieChartComponent from '../pieChartComponent'
import HistoryExpenseComponent from '../historyExpenseComponent'
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { getAllExpense } from '../../../redux/action/expense'
import { toggleisFiltering } from '../../../redux/reducer/global'
import { toIdr } from '../../../utils/helper'
const DashboardUser = () => {
    const dispatch = useAppDispatch()
    const {user, expenseByCategory, expenseByCategoryDummy, isFiltering} = useAppSelector(selector => selector.global)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const byCategory = isFiltering ? expenseByCategoryDummy : expenseByCategory
    const [loading, setLoading] = useState(false)
    const handleRefresh = () =>{
        dispatch(getAllExpense(setLoading))
        dispatch(toggleisFiltering(false))
      }
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.layout}>
        <View style={styles.wpHeader}>
          <View>
            <Text style={styles.textBlack16Regular}>Hello</Text>
            <Text style={styles.textBlack16Regular}>{user?.fullname}</Text>
          </View>
          <View style={{flexDirection:"row", alignItems:"center", columnGap:8}}>
            {isFiltering && (
              <TouchableOpacity onPress={handleRefresh}>
                <Text>Reset</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={()=> navigation.navigate('FilterExpenseScreen')}>
              <Ionicons name='filter' size={24} />
            </TouchableOpacity>
          </View>
          
        </View>
        
        <Gap height={24} />
        <Text style={styles.textBlack16Regular}>Total Balance</Text>
        <Gap height={8} />
        {user?.expenses?.length > 0 ? (
           <View style={{flexDirection:"row", columnGap:16}}>
           <CardExpense title='outcome' amount={toIdr(Number(user?.totalExpenses || 0))} />
         </View>
        ):<Text style={styles.textBlack16Regular}>No Data</Text> 
        }
       
        <Gap height={24} />
        <Text style={styles.textBlack16Regular}>Expense Chart</Text>
        <Gap height={8} />
          {byCategory?.length > 0 ? (
            <>
              <PieChartComponent 
              data={byCategory} 
              />
            </>

        ):(
          <Text style={styles.textBlack16Regular}>No Data</Text> 
        )
        }
       <Gap height={24} />
       {user?.expenses && <HistoryExpenseComponent />}
       

      </ScrollView>
      <TouchableOpacity 
      onPress={()=> navigation.navigate("InputScreen")}
      style={styles.wpIconFloat}>
          <AntDesign name='plus' size={24}  />
      </TouchableOpacity>
    </>
  )
}

export default DashboardUser

const styles = StyleSheet.create({
    wpHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
      },
      layout:{
        paddingHorizontal:16
      },
      textBlack16Regular :{
        fontWeight:"regular",
        fontSize:18
      },
      wpIconFloat:{
        width:64, 
        height:64, 
        borderRadius:100, 
        backgroundColor:"#99da99", 
        justifyContent:"center", 
        alignItems:"center", 
        position:"absolute", 
        right:16, 
        bottom:16
        
      }
})