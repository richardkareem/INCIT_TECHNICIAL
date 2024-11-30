import { SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import { useAppSelector } from '../../types/redux.type';
import { HistoryExpenseCard } from '../../components';

const DetailHistoryScreen = () => {
  const {expense} = useAppSelector(selector => selector.global);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.ct}>

        {expense?.map((item, idx)=> <HistoryExpenseCard category="" amount={item.amount} date={item.create_at} title={item.expense} key={idx} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailHistoryScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    ct:{
      paddingHorizontal:16,
    },
});
