import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../types/redux.type'
import { Button, Gap } from '../../components'
import { Dropdown } from 'react-native-element-dropdown'
const {height} = Dimensions.get('window')
import Antdesign from 'react-native-vector-icons/AntDesign'
import DateTimePicker from 'react-native-ui-datepicker'
import { RootStackParamList } from '../../types/route.type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { filterExpense } from '../../redux/action/expense'
import { toggleisFiltering } from '../../redux/reducer/global'

const FilterExpenseScreen = ({navigation}: {navigation: NativeStackNavigationProp<RootStackParamList>}) => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const {expenseByCategory} = useAppSelector(state => state.global)
    type Dropdown = {
        label:string,
        value:string
    }
    const [categories, setCategories] = useState<Dropdown[]>([])

    useEffect(() =>{
        setCategories(prev =>{
            return expenseByCategory.map(item => {
                return {label: item.name, value: item.name}
            })

        })
    },[])

    const [isFocus, setIsFocus] = useState(false)
    const [value, setValue] = useState("")
    const [date, setDate] = useState<{from:  string, to: string}>({
        from: new Date(new Date().setDate(new Date().getDate() -1)).toISOString(),
        to: new Date().toISOString()
    })
    const handleBtn = () =>{
        dispatch(filterExpense(date?.from, date?.to, value, setLoading))
        dispatch(toggleisFiltering(true))
        navigation.goBack()
      }
    return (
    <View style={styles.screen}>
        <Gap height={16} />
        <Text>Filter by Date</Text>
        <Gap height={16} />
        <DateTimePicker
            mode="range"
            startDate={date.from}
            endDate={date.to}
            onChange={(params) => setDate((prev:any) => {
                return{
                    ...prev,
                    from:params.startDate || "",
                    to: params.endDate || ""
                }
            })}
            />
        <Text>Filter by Category</Text>
        <Gap height={16} />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categories}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.label);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Antdesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        <Gap height={16} />
        <Button disable={loading} loading={loading} onPress={handleBtn} label='Save' />
    </View>
  )
}

export default FilterExpenseScreen

const styles = StyleSheet.create({
    screen:{
        paddingHorizontal:16
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
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
})