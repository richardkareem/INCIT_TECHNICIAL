import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../../types/redux.type'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { CardUserMonitor, Gap } from '../../atoms'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types/route.type'

const DashboardAdmin = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const {allDataUsers, user} = useAppSelector(selector => selector.global)
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wp}>
       <Text style={styles.textBlack16Regular}>Hello {user?.fullname}</Text>
       <Gap height={16} />
       <View style={styles.wpCard}>
        {allDataUsers?.length > 0 && allDataUsers.map((item, idx) => (
         <CardUserMonitor 
            onPress={()=> navigation.navigate('ListUsersScreen', {user: item})}
            count={item?.expenses?.length || 0} 
            label={`User ${item.fullname}`} 
            key={idx}  />
        ))}
      
       </View>
    </ScrollView>
  )
}

export default DashboardAdmin

const styles = StyleSheet.create({
    wp:{
        paddingHorizontal:16
    },
    textBlack16Regular :{
        fontWeight:"regular",
        fontSize:18
      },

      wpHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
      },
      layout:{
        paddingHorizontal:16
      },
      wpIconFloat:{
        width:64, 
        height:64, 
        borderRadius:100, 
        backgroundColor:"#99da99", 
        justifyContent:"center", 
        alignItems:"center", 
        position:"absolute", 
        right:16, 
        bottom:16
      },
      wpCard:{
        flexDirection:"row",
        flexWrap:"wrap",
        gap: 16
      }
})