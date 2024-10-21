import { SafeAreaView, StyleSheet, Text,ScrollView} from 'react-native'
import React, { useState } from 'react'
import { Button, Gap, TextInput } from '../../components'
import { SetExpenseType } from '../../types/global.type'
import { useAppDispatch } from '../../types/redux.type'
import { createExpense } from '../../redux/action/expense'
import { RootStackScreenProps } from '../../types/route.type'
import DateTimePicker from 'react-native-ui-datepicker'

type Props = {
    navigation: RootStackScreenProps<'InputScreen'>
}
const InputScreen = (props : Props) => {
    const {navigation} = props
    const dispatch = useAppDispatch()
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
    const disableBtn = form.note.trim() === "" || form.expense.trim() === "" || form.category.trim() === ""
  return (
    <SafeAreaView style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal:16}}>
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
            <TextInput 
            onChangeText={(t)=> handleChange('category',t)}
            styleContainer={styles.textInput}
            label='Category'
            placeholder='Category'
            />
            <Button 
            onPress={()=> dispatch(createExpense(setLoading, form, ()=>{navigation.goBack()}))}
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
    screen:{
        // paddingHorizontal:32
    },
    textInput:{
        marginTop:8
    }
})