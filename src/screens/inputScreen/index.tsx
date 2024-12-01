/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import { Button, Gap, TextInput } from '../../components';
import db from '../../db/db';
import expense from '../../db/expense';
import { ExpenseType, SetExpenseType } from '../../types/global.type';
import { useAppDispatch, useAppSelector } from '../../types/redux.type';
import { RootStackScreenProps } from '../../types/route.type';
type Props = {
    navigation: RootStackScreenProps<'InputScreen'>
}
const WIDTHSCREEN = Dimensions.get('window').width;
const InputScreen = (props : Props) => {
    const {navigation} = props;
    const dispatch = useAppDispatch();
    const scrollRef = useRef<ScrollView>(null);
    const {category, user} = useAppSelector(state => state.global);
    const [isFocus, setIsFocus] = useState(false);
    const [valueCategory, setValueCategory] = useState('');
    const [form,setForm] = useState<SetExpenseType>({
        day: new Date().toISOString(),
        note:'',
        expense:'',
        category:'',
        color:'',
    });
    const [loading] = useState(false);
    const handleChange = (key: keyof SetExpenseType, value: string) =>{
        setForm(prev => {
            return{
                ...prev,
                [key]: value,
            };
        });
    };

    const onFocusDropdown = () =>{
        if(scrollRef.current){
            scrollRef.current.scrollToEnd({animated:true});
        }
    };
    const disableBtn = form.note.trim() === '' || form.expense.trim() === '' || form.category.trim() === '';
    const height = Dimensions.get('window').height;
    const screenStyle : ViewStyle = {
        height: height * 2,
        flex:1,
    };
    const handleSave = async() =>{
        const database = await db.connectToDb();
        const exp : ExpenseType = {
            amount: form.expense,
            expense: form.note,
            category: '',
            create_at: form.day,
            id: 0,
            id_category: 0,
            color: form.color || '',
        };
        dispatch(expense.createExpense(
            database,
            exp,
            user.id_user,
            Number(form.category),
        ));
        navigation.goBack();
    };

    useEffect(() =>{
       const value = category.find(obj => {
        if(Number(form.category) === obj.id){
         return obj
        }
       });
       console.log("dapet color: ", value)
       if(value?.color){
        handleChange('color', value.color);
       }
    },[form.category]);

    console.log("CATEGORY RESULT: ", category)
  return (
    <SafeAreaView style={screenStyle}>
        <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false} style={{marginHorizontal:16}}>
            <Gap height={16} />
            <Text>Day</Text>
            <Gap height={8} />
            <DateTimePicker
            mode="single"
            date={form.day}
            onChange={(params) => setForm(prev => {
                return{
                    ...prev,
                    day: params?.date?.toString() || '',
                };
            })}
            />
            <Text>Category</Text>
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
                    onFocusDropdown();
                    setIsFocus(true);}}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                setValueCategory(item.label);
                handleChange('category', item?.value?.toString() || "0");
                setIsFocus(false);
                }}
                 />
                 <TouchableOpacity style={{flexDirection:"row", alignItems:"center", gap:4}} onPress={()=>{navigation.navigate('AddNewCategoryScreen')}}>
                    <View style={{width:50, height:50, borderRadius:100, backgroundColor:"green"}} />
                    <Text>Add New Category</Text>
                 </TouchableOpacity>
            </View>
            
           <Gap height={16} />
            <TextInput
            onChangeText={(t)=> handleChange('note',t)}
            styleContainer={styles.textInput}
            label="Expense"
            placeholder="Some Expense"
            />
            <TextInput
            onChangeText={(t)=> handleChange('expense',t)}
            styleContainer={styles.textInput}
            keyboardType="numeric"
            label="Amount"
            placeholder="Amount"
            />
            <Button
            onPress={handleSave}
            disable={loading || disableBtn}
            loading={loading}
            label="Save" style={{marginTop:16}} />
        </ScrollView>
    </SafeAreaView>
  );
};

export default InputScreen;

const styles = StyleSheet.create({
    textInput:{
        marginTop:8,
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
        width: WIDTHSCREEN / 2 - 64
      },
      containerDropdownStyle:{
        maxHeight:100,
        width: WIDTHSCREEN - 128,
      },
});
