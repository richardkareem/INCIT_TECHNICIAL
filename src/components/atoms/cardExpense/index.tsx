import { Dimensions, StyleSheet, Text, TextComponent, TextStyle, View, ViewComponent, ViewStyle } from 'react-native'
import React from 'react'
const {width} = Dimensions.get("window")
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { toIdr } from '../../../utils/helper'

type TypeExpense = "income" | "outcome"

type Props = {
    title:TypeExpense
    amount: string
}


const CardExpense = (props: Props) => {
    const {amount, title}  = props;

    const textGreen16semibold : TextStyle  = {
        fontWeight:"bold",
        fontSize:16,
        color: title === "income" ? "#99da99" : "#f57070"
    }
     const wpIcon : ViewStyle = {
        padding:8,
        backgroundColor: title === "income" ? "#99da99" : "#f57070",
        borderRadius:100,
        overflow:"hidden",
        justifyContent:"center",
        alignItems:"center"
    }
  return (
    <View style={styles.wp}>
        <View  style={wpIcon}>
            <MaterialIcons 
       
        name='auto-graph' size={32} color={title === "income" ? '#33b533' : "#f02929" } />
        </View>
      
      <View>
        <Text style={textGreen16semibold}>
            {title}
        </Text>
        <Text style={styles.textBlack24regular}>
            {amount}
        </Text>
      </View>
      
    </View>
  )
}

export default CardExpense

const styles = StyleSheet.create({
    wp:{
        maxWidth : width - 16,
        borderRadius: 16,
        backgroundColor:"#FFFF",
        flexDirection:"row",
        alignItems:"center",
        padding:16,
        columnGap:8
    },
    
    textBlack24regular:{
        fontWeight:"regular",
        fontSize:24
    }
})