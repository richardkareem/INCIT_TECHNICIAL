import { SafeAreaView, StyleSheet, Text,ScrollView, ViewStyle, Dimensions} from 'react-native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { Button, Gap, TextInput } from '../../components'
import { SetExpenseType } from '../../types/global.type'
import { useAppDispatch, useAppSelector } from '../../types/redux.type'
import { createExpense } from '../../redux/action/expense'
import { RootStackScreenProps } from '../../types/route.type'
import DateTimePicker from 'react-native-ui-datepicker'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign'
import expense from '../../db/expense'
import db from '../../db/db'
type Props = {
    navigation: RootStackScreenProps<'InputScreen'>
}
const InputScreen = (props : Props) => {
    const {navigation} = props
    const dispatch = useAppDispatch()
    const scrollRef = useRef<ScrollView>(null)
    const {category, user} = useAppSelector(state => state.global);
    const [isFocus, setIsFocus] = useState(false)
    const [form,setForm] = useState<SetExpenseType>({
        day: new Date().toISOString(),
        note:"",
        expense:"",
        category:""
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (key: keyof SetExpenseType, value: string) =>{
        setForm(prev => {
            return{
                ...prev,
                [key]: value
            }
        })
    }

    const onFocusDropdown = () =>{
        if(scrollRef.current){
            scrollRef.current.scrollToEnd({animated:true})
        }
    }
    useEffect(() =>{

    },[])
    const disableBtn = form.note.trim() === "" || form.expense.trim() === "" || form.category.trim() === ""
    const height = Dimensions.get("window").height
    const screenStyle : ViewStyle = {
        height: height * 2,
        flex:1
    }
    const handleSave = async() =>{
        const database = await db.connectToDb() 
        const exp = {
            amount: form.expense,
            expense: form.note,
            category: "Barudakwell",
            create_at: form.day
        }
        dispatch(expense.createExpense(
            database,
            exp,
            user.id_user,
            Number(form.category)
        ))
        navigation.goBack()
    }
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
                    day: params?.date?.toString() || ""
                }
            })}
            />
            <TextInput 
            onChangeText={(t)=> handleChange('note',t)}
            styleContainer={styles.textInput}
            label='Expense'
            placeholder='Some Expense'
            />
            <TextInput 
            onChangeText={(t)=> handleChange('expense',t)}
            styleContainer={styles.textInput}
            keyboardType='numeric'
            label='Amount'
            placeholder='Amount'
            />
            <Text style={{marginTop:12}}>Category</Text>
            <Dropdown 
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={category.map(item => {
                return{
                    label: item.category_name,
                    value: item.id
                }
            })}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={form.category}
            onFocus={() => {
                onFocusDropdown()
                setIsFocus(true)}}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              handleChange('category', item.value.toString())
              setIsFocus(false);
            }}
          />
            {/* <TextInput 
            onChangeText={(t)=> handleChange('category',t)}
            styleContainer={styles.textInput}
            label='Category'
            placeholder='Category'
            /> */}
            <Button 
            onPress={handleSave}
            disable={loading || disableBtn}
            loading={loading}
            label='Save' style={{marginTop:16}} />
            <Gap height={16} />
        </ScrollView>
    </SafeAreaView>
  )
}

export default InputScreen

const styles = StyleSheet.create({
    textInput:{
        marginTop:8
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
      },
})