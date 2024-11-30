/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/route.type';
import { useAppDispatch, useAppSelector } from '../../../types/redux.type';
import { CardExpense, Gap } from '../../atoms';
import HistoryExpenseComponent from '../historyExpenseComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { toIdr } from '../../../utils/helper';
import PieChartComponent from '../pieChartComponent';
import expenseDb from '../../../db/expense';
import { toggleisFiltering } from '../../../redux/reducer/global';
import { ExpenseType } from '../../../types/global.type';
const randomColor  = require('randomcolor');

const DashboardUser = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch  = useAppDispatch();
    const {expense, user, isFiltering} = useAppSelector(state => state.global);
    const [amount, setAmount] = useState(0);
    const [dataChart, setDataChart] = useState<ExpenseType[]>([]);

    useEffect(() =>{
      console.log('render dashboard user with user: ', user);
      if(expense.length > 0){
        setAmount(expense.map(item =>  Number(item.amount)).reduce((acc, prev) => acc + prev));
      }
      setDataChart(groupingChart());
    },[expense]);

    const groupingChart = () =>{
      return expense.reduce((acc: ExpenseType[], curr) =>{
        const found = acc.find((i) => i.category === curr.category);
        if(found){
          found.amount += curr.amount;
        }else{
          acc.push({
            amount: curr.amount,
            category: curr.category,
            create_at:curr.create_at,
            expense: curr.expense,
            id: curr.id,
            id_category:curr.id_category,
          });
        }
        return acc;
      },[]);
    };
    const handleRefresh = () =>{
      dispatch(expenseDb.getExpenseUser(user.id_user));
      dispatch(toggleisFiltering(false));
    };

  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.layout}>
        <View style={styles.wpHeader}>
          <View>
            <Text style={styles.textBlack16Regular}>Hello</Text>
            <Text style={styles.textBlack16Regular}>{user?.full_name}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', columnGap:8}}>
            {isFiltering && (
              <TouchableOpacity onPress={handleRefresh}>
                <Text>Reset</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={()=> navigation.navigate('FilterExpenseScreen')}>
              <Ionicons name="filter" size={24} />
            </TouchableOpacity>
          </View>

        </View>

        <Gap height={24} />
        <Text style={styles.textBlack16Regular}>Total Balance</Text>
        <Gap height={8} />
        {expense.length > 0 ? (
           <View style={{flexDirection:'row', columnGap:16}}>
           <CardExpense title="outcome" amount={toIdr(amount)} />
         </View>
        ) : <Text style={styles.textBlack16Regular}>No Data</Text>
        }

        <Gap height={24} />
        <Text style={styles.textBlack16Regular}>Expense Chart</Text>
        <Gap height={8} />
          {dataChart?.length > 0 ? (
            <>
              <PieChartComponent
              data={dataChart.map(item =>{
                return{
                  name: item.category,
                  population: Number(item.amount),
                  color: randomColor(),
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                };
              })}
              />
            </>

        ) : (
          <Text style={styles.textBlack16Regular}>No Data</Text>
        )
        }
       <Gap height={24} />
       {expense.length > 0 && <HistoryExpenseComponent />}


      </ScrollView>
      <TouchableOpacity
      onPress={()=> navigation.navigate('InputScreen')}
      style={styles.wpIconFloat}>
          <AntDesign name="plus" size={24}  />
      </TouchableOpacity>
    </>
  );
};

export default DashboardUser;

const styles = StyleSheet.create({
    wpHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
      },
      layout:{
        paddingHorizontal:16,
      },
      textBlack16Regular :{
        fontWeight:'regular',
        fontSize:18,
      },
      wpIconFloat:{
        width:64,
        height:64,
        borderRadius:100,
        backgroundColor:'#99da99',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:16,
        bottom:16,

      },
});
