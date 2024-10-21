import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (storageKey: string, value:string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {}
};

export const getData = async (storageKey:string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};

export const removeItemValue = async (storageKey:string) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (e) {}
};