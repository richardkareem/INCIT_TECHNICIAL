import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gap from '../gap'
const {width} = Dimensions.get('window')

type Props = {
    label:string,
    count: string | number
    onPress?: ()=> void
}
const CardUserMonitor = (props: Props) => {
    const {count,label, onPress} = props
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.wp}>
       <Text style={[styles.textBlacBold16Px, styles.label]}>{label}</Text> 
       <Gap height={16} />
       <View style={styles.wpCount}>
            <Text style={styles.textGreenBold24px}>{count}</Text>
       </View>
    </TouchableOpacity>
  )
}

export default CardUserMonitor

const styles = StyleSheet.create({
    wp:{
        backgroundColor:"#bbbbbb",
        borderRadius:8,
        width: width / 2 - 32,
        minHeight: width * 0.2,
        padding:8
    },
    textBlacBold16Px:{
        fontWeight:"bold",
        fontSize: 16,
        color:"#000000"
    },
    wpCount:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#eeeeee",
        padding:8,
        borderRadius:100,
        width:64,
        height: 64,
        alignSelf:"center"
    },
    textGreenBold24px:{
        fontWeight:"bold",
        fontSize:24,
        color:"#99da99"
    },
    label:{
        textAlign:"center",
        height:60,
        // backgroundColor:"purple",
        flexWrap:"wrap"
        
    }
})