import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../../types/redux.type';
import { Gap, HistoryExpenseCard } from '../../atoms';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/route.type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { toIdr } from '../../../utils/helper';

const HistoryExpenseComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const {expense : expenses} = useAppSelector(state => state.global);
    // const [sliced, setSliced] = useState<ExpenseType[]>([]);

    // useEffect(() =>{
    //   setSliced(() =>{
    //     return [...expenses].sort((a:any,b:any)=> new Date(b?.create_at) - new Date(a?.create_at)).slice(0,3)
    //   })
    // },[expenses])
    return (
    <View>
      <View style={styles.row}>
        <Text style={styles.textBlack16Regular}>History Expense</Text>
        {expenses?.length > 3 && (
             <TouchableOpacity onPress={()=> navigation.navigate('DetailHistoryScreen')}>
             <Text style={styles.textBlue14Regular}>See All</Text>
         </TouchableOpacity>
        )}
      </View>
      <Gap height={8} />
      {expenses?.length > 0 ? expenses.map((item, idx )=> {
        return(
          <HistoryExpenseCard
          type="users"
          category={item.category}
          amount={toIdr(Number(item.amount || 0))}
          date={item.create_at}
          title={item.expense} key={idx} />
        );
      })
      : (
        <Text style={styles.textBlack16Regular}>No Data</Text>
      )
    }

    </View>
  );
};

export default HistoryExpenseComponent;

const styles = StyleSheet.create({
    textBlack16Regular :{
        fontWeight:'regular',
        fontSize:18,
      },
      textBlue14Regular :{
        fontWeight:'regular',
        fontSize:14,
        color:'#4295f1',
      },
      row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      },
});
