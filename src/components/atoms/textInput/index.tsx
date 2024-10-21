import { StyleSheet, Text, TextInput as RnTextInput, View, TextInputProps, ViewStyle, Touchable, Dimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../../styles'
import { TouchableOpacity } from 'react-native'
const {width} = Dimensions.get("window")
type Props = TextInputProps & {
  style?: ViewStyle,
  styleContainer?: ViewStyle,
  icon?: React.ReactNode
  label?: string 
  onPressIcon? : ()=> void
}

const TextInput = ({style, styleContainer,label, icon, onPressIcon, ...props}:Props) => {
  return (
    <View style={styleContainer}>
    {label ? <Text>{label}</Text>  : null}
    <View style={styles.wp}>
        <RnTextInput 
        placeholderTextColor={COLORS.placeholder}
            style={[styles.styleTxt, style]}
            {...props}
            />
          {icon && (
            <TouchableOpacity  onPress={onPressIcon} activeOpacity={0.85}>
              {icon}
            </TouchableOpacity>
          ) }
            
    </View>
    </View>
    
   
  )
}

export default TextInput

const styles = StyleSheet.create({
    wp:{
        backgroundColor:COLORS.placeHolder50,
        marginTop:12,
        paddingHorizontal:16,
        paddingRight:32,
        paddingVertical:16,
        borderRadius:32,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        // maxWidth: width - 32,
        width: width-32
    },
    styleTxt:{
        color:"#000",
        fontWeight:'medium',
        fontSize:16,
        width: '90%',
    }
})