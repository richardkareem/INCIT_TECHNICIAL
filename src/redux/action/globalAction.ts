import db from '../../db/db';
import users from '../../db/users';
import { editUser } from '../../services/authModels.service';
import { userData } from '../../types/global.type';
import { AppThunk, RootState } from '../../types/redux.type';
import { showMessage } from '../../utils/showMessage';
import { removeItemValue, storeData } from '../../utils/storeage';
import { setAllDataUsers, setDataUser, setExpenseByCategory, setExpenseByCategoryDummy, toggleisFiltering } from '../reducer/global';

const stateGlobal =  (state : RootState) => state.global;

export const userLogout = () : AppThunk => async(dispatch, getState) => {
    try {
        const {user} = stateGlobal(getState());
        const database = await db.connectToDb();
        await users.updateTokenUser(database, user.id_user, '');
        await removeItemValue('profile');
        dispatch(setExpenseByCategory([]));
        dispatch(toggleisFiltering(false));
        dispatch(setExpenseByCategoryDummy([]));
        const resetData =  {
            id_user: 0,
            email:'',
            fullname:'',
            role:'',
            token:'',
        };
        dispatch(setDataUser(resetData));
        dispatch(setAllDataUsers([]));
    } catch (error : Error | unknown) {
        console.log(error);
        if(error instanceof Error){
            console.log(error);
            showMessage(error?.message, 'danger');
        }

    }
};

export const updateUserProfile = (newData: userData, setLoading:(loading:boolean)=> void) : AppThunk => async(dispatch, getState) =>{
    setLoading(true);
    try{
        const {user} = stateGlobal(getState());
        await editUser(user.email, newData);
        const  profile = {
                fullname:newData?.fullname,
                email:newData?.email,
                role:newData?.role,
                token:newData?.token,
        };
        storeData('profile', JSON.stringify(profile));
        const editedProfile = {
            ...user,
            ...profile,
        };
        dispatch(setDataUser(editedProfile));
        showMessage('success update profile');
    }catch (e : Error | unknown){
        if(e instanceof Error){
            showMessage(e.message, 'danger');
        }
    }finally{
        setLoading(false);
    }
};
