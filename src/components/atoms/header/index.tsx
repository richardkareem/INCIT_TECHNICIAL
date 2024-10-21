import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { COLORS } from '../../../styles'
type Props = {
    title?: string
    icon?: React.ReactNode
    onPress?: ()=> void;
}
const Header = (props: Props) => {
    const {onPress, icon= <EvilIcons name='trash' size={32} />, title} = props 
  return (
    <View style={styles.ct}>
        <View style={{flex:1}} />
        <Text style={[{flex:1, alignItems:'center',textAlign:'center'}, styles.txt]}>{title}</Text>
        <View style={{flex:1,alignItems:'flex-end'}}>
            <TouchableOpacity onPress={onPress}>
                {icon}
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    ct:{
        backgroundColor:COLORS.placeHolder50,
        marginBottom:16,
        padding:16,
        flexDirection:'row',
        alignItems:'center'
    },
    txt:{
        fontWeight:'semibold',
        fontSize:16,
        color:'#000'
    }
})