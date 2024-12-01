/* eslint-disable react-hooks/exhaustive-deps */
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/route.type';
import { useAppDispatch, useAppSelector } from '../../../types/redux.type';
import { Button, CardExpense, Gap, TextInput } from '../../atoms';
import HistoryExpenseComponent from '../historyExpenseComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { toIdr } from '../../../utils/helper';
import PieChartComponent from '../pieChartComponent';
import expenseDb from '../../../db/expense';
import { toggleisFiltering } from '../../../redux/reducer/global';
import { ExpenseType } from '../../../types/global.type';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
const WIDTHSCREEN = Dimensions.get('window').width
const DashboardUser = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch  = useAppDispatch();
    const {expense, user, isFiltering, category} = useAppSelector(state => state.global);
    const [amount, setAmount] = useState(0);
    const [dataChart, setDataChart] = useState<ExpenseType[]>([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [valueCategory] = useState('')
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
            color: curr.color,
          });
        }
        return acc;
      },[]);
    };
    const handleRefresh = () =>{
      dispatch(expenseDb.getExpenseUser(user.id_user));
      dispatch(toggleisFiltering(false));
    };
    const renderInput = () =>{
      return(
        <View>
          <Gap height={8} />
          <Text>Add Expense</Text>
          <Gap height={8} />
          <TextInput placeholder='Your Expense' label='Expense'  />
          <Gap height={8} />
          <View style={{flexDirection:"row", alignItems:"center", gap: 8}}>  
                <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={category.map(item => {
                    return{
                        label: item.category_name,
                        value: item.id,
                    };
                })}
                containerStyle={styles.containerDropdownStyle}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!valueCategory && !isFocus ? 'select Category' : isFocus ?  '...' : valueCategory}
                searchPlaceholder="Search..."
                value={valueCategory}
                onFocus={() => {
                    // onFocusDropdown();
                    setIsFocus(true);
                  }}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                // setValueCategory(item.label);
                // handleChange('category', item?.value?.toString() || "0");
                setIsFocus(false);
                }}
                 />
                 <TouchableOpacity style={{flexDirection:"row", alignItems:"center", gap:4}} onPress={()=>{navigation.navigate('AddNewCategoryScreen')}}>
                    <View style={{width:50, height:50, borderRadius:100, backgroundColor:"green"}} />
                    <Text>Add New Category</Text>
                 </TouchableOpacity>
            </View>
            <Gap height={8} />
          <TextInput placeholder='IDR' label='Amount'  />
          <Gap height={8} />
          <Text>Date</Text>
          <Gap height={16} />
          <Button label='Date' onPress={() => setIsDateOpen(true)} />
            <DatePicker 
            modal
            mode='date'
            open={isDateOpen}
            date={new Date()}
            onCancel={() => setIsDateOpen(false)}
            />
        </View>
      )
    }
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.layout}>
        <View style={styles.wpHeader}>
          <View>
            <Text style={styles.textBlack16Regular}>Hello 🖐️ {user?.full_name}</Text>
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
        <Text style={styles.textBlack16Regular}>Your Expense in November is {toIdr(amount)}</Text>
        {renderInput()}
        {/* <Gap height={8} />
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
                console.log("COLOR: ", item.color)
                return{
                  name: item.category,
                  population: Number(item.amount),
                  color: item.color,
                  legendFontColor: item.color,
                  legendFontSize: 15,
                };
              })}
              />
            </>

        ) : (
          <Text style={styles.textBlack16Regular}>No Data</Text>
        )
        } */}
       <Gap height={24} />
       {expense.length > 0 && <HistoryExpenseComponent />}


      </ScrollView>
      {/* <TouchableOpacity
      onPress={()=> navigation.navigate('InputScreen')}
      style={styles.wpIconFloat}>
          <AntDesign name="plus" size={24}  />
      </TouchableOpacity> */}
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
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      dropdown: {
        height: 50,
        marginTop:12,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 32,
        paddingHorizontal: 8,
        width: WIDTHSCREEN / 2
      },
      containerDropdownStyle:{
        maxHeight:300,
        width: WIDTHSCREEN - 128,
      },
});
