import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { DetailHistoryScreen, EditProfileScreen, FilterExpenseScreen, InputScreen, ListUsersScreen, LoginScreen, ProfileScreen, RegisterScreen, SplashScreen } from "../screens"
import MyTabsBar from "./MyTabsBar"
import HomeScreen from "../screens/homeScreen"
import { RootStackParamList } from "../types/route.type"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>()


const MainApp = () =>{
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}
        tabBar={props => <MyTabsBar {...props} />}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export const Route = () =>{
    return(
        <Stack.Navigator  >
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="MainApp" component={MainApp} options={{headerShown:false}} />
            <Stack.Screen name="DetailHistoryScreen" initialParams={{data:[],}} component={DetailHistoryScreen}  options={{headerTitle:"Detail History", headerBackTitleVisible:false}} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}  options={{headerTitle:"Edit Profile", headerBackTitleVisible:false}} />
            <Stack.Screen name="ListUsersScreen"  component={ListUsersScreen} initialParams={{user: undefined}} options={{headerTitle:"List User", headerBackTitleVisible:false}} />
            <Stack.Group screenOptions={{presentation:"modal", animation:"simple_push", title:"Input"}}>
                 <Tab.Screen 
                 name="InputScreen"  
                 component={InputScreen}
                 options={{title:"Add Expense"}}
                 />
                 <Tab.Screen 
                 name="FilterExpenseScreen"   
                 component={FilterExpenseScreen} 
                 options={{title:"Filter Expense"}} 
                 />
            </Stack.Group>
        </Stack.Navigator>
    )
}