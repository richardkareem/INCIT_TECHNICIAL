import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { userData } from "./global.type";
export type RootStackParamList = {
    MainApp: undefined;
    LoginScreen:undefined;
    RegisterScreen:undefined;
    SplashScreen: undefined;    
    InputScreen:undefined;
    FilterExpenseScreen : undefined
    DetailHistoryScreen: {data: []} | undefined
    EditProfileScreen: undefined
    ListUsersScreen: undefined | {user : userData}
  };

  export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

  export type HomeTabParamList = {
    Home: undefined;
    Profile: undefined;
  };

  // export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  // CompositeScreenProps< BottomTabScreenProps<HomeTabParamList, T>, RootStackScreenProps<keyof RootStackParamList>
  // >;

  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }


  export type NavigationProp = {
    navigation: NativeStackNavigationProp<RootStackParamList>
  }