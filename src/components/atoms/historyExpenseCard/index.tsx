import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {} from 'react'
import dayjs from 'dayjs'
import Entypo from 'react-native-vector-icons/Entypo'
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import Reanimated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import Gap from '../gap';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

type Props = {
  title: string
  amount: string,
  date: string,
  category: string,
  type?: "admin" | 'users'
  onpress?: ()=> void
}
const {width} = Dimensions.get('window')
const HistoryExpenseCard = (props: Props) => {
  const {amount,date,title, type = "users", onpress, category} = props
  const RightAction = (prog :SharedValue<number>, drag: SharedValue<number>) => {
   const styleAnimation = useAnimatedStyle(() =>{
    return{
      transform: [{translateX: drag.value + width}]
    }

   })
    return(
    <Reanimated.View style={[styleAnimation,styles.wpTrash]}>
      <TouchableOpacity onPress={onpress}>
        <Entypo name='trash' size={24} />
      </TouchableOpacity>
    </Reanimated.View>
    )
  }

  if(type === "users"){
    return (
      <View style={styles.ctUser}>
        <View>
          <Text style={styles.textWhiteSemiBold16px}>{title}</Text>
          <Gap height={8} />
          <Text style={styles.textWhiteSemiBold16px}>{category}</Text>
        </View>
        <View>
          <Text style={styles.textGreenBold16px}>{amount}</Text>
          <Text style={styles.textWhiteSemiBold12px}>{dayjs(date).format('dddd, DD MMMM YYYY')}</Text>
        </View>
      </View>
    )
  }  
  if(type === "admin"){
    return(
      <GestureHandlerRootView >
        <ReanimatedSwipeable 
        friction={1}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        >
          <View style={styles.ctUser}>
          <View>
           <Text style={styles.textWhiteSemiBold16px}>{title}</Text>
           <Text style={styles.textWhiteSemiBold16px}>{category}</Text>
        </View>
        <View>
          <Text style={styles.textGreenBold16px}>{amount}</Text>
         <Text style={styles.textWhiteSemiBold12px}>{dayjs(date).format('dddd, DD MMMM YYYY')}</Text>
        </View>
          </View>
        </ReanimatedSwipeable>
      </GestureHandlerRootView>
    )
  }
  
}

export default HistoryExpenseCard

const styles = StyleSheet.create({
  ctUser:{
    backgroundColor:"#aaaaaa",
    borderRadius:8,
    paddingHorizontal:8,
    paddingVertical:16,
    marginTop:8,
    
    flexDirection:"row",
    justifyContent:"space-between"
   
  },
  ct:{
    backgroundColor:"#aaaaaa",
    borderRadius:8,
    paddingHorizontal:8,
    paddingVertical:16,
    marginTop:8,
   
  },
  textWhiteSemiBold16px:{
    fontWeight:'semibold',
    fontSize:16,
    color:"#ffffff"
  },
  textGreenBold16px:{
    fontWeight:'semibold',
    fontSize:24,
    color:"#b3e3b3",
    textAlign:"right"
  },
  textWhiteSemiBold12px:{
    fontWeight:'semibold',
    fontSize:12,
    color:"#ffffff"
  },
  leftAction:{
    justifyContent:"center",
    alignItems:"center",
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
  wpTrash:{
    justifyContent:"center", 
    alignItems:"center", 
    width, 
    backgroundColor:"papayawhip", 
    borderRadius:8
  }

})