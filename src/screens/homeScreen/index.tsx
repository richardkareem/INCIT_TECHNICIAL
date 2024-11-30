/* eslint-disable react-hooks/exhaustive-deps */
import { SafeAreaView, StyleSheet } from 'react-native';
import React,{useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../types/redux.type';
import { DashboardAdmin, DashboardUser } from '../../components';
// import { getAllDataUsers, getAllExpense } from '../../redux/action/expense';
import expense from '../../db/expense';
const HomeScreen = () => {
  const {user} = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  // const [_, _] = useState(false);
  useEffect(() =>{
    if(user.role === 'user'){
      dispatch(expense.getExpenseUser(user.id_user));
    }else{
      // dispatch(getAllDataUsers());
    }
  },[]);
if(user.role === 'user'){
  return (
    <SafeAreaView style={styles.screen}>
      <DashboardUser />
    </SafeAreaView>
  );
}else{
  return(
    <SafeAreaView style={styles.screen}>
      <DashboardAdmin />
    </SafeAreaView>
  );
}

};

export default HomeScreen;

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:'#EEEEEE',
  },

});

