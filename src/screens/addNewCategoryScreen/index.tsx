/* eslint-disable react-hooks/exhaustive-deps */
import { SafeAreaView, Text, View, StyleSheet, ViewStyle, ColorValue, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Gap, TextInput } from '../../components';
import { RootStackScreenProps } from '../../types/route.type';
import categoryTable from '../../db/category';
import db from '../../db/db';
import { useAppDispatch, useAppSelector } from '../../types/redux.type';
import colorDb from '../../db/colorDb';
import iconDb from '../../db/iconDb';
import { SelectCountry } from 'react-native-element-dropdown';
import { AddCategoryType } from '../../db/db.type';
import { ICON_IMAGES } from '../../assets';
// import { Dropdown } from 'react-native-element-dropdown';
const WIDTHSCREEN = Dimensions.get('window').width;
const local_data  = ICON_IMAGES.map(item =>{
    return{
        value: item.id,
        lable: `label icon ${item.id}`,
        image:{
            uri: item.icon_name,
        },
    };
});
const AddNewCategoryScreen = ({navigation}:{navigation: RootStackScreenProps<'AddNewCategoryScreen'>}) => {
    const dispatch = useAppDispatch();
    const {color} = useAppSelector(state => state.global);
    // const [isFocus, setIsFocus] = useState(false);
    const [formCategory, setFormCategory] = useState<AddCategoryType>({
        category_name:'',
        icon:'',
        color:'',
        id_color: 0,
        id_icon:0,

    });
    const handleAddCategory = async() =>{
        try {
            const {addCategory} = categoryTable;
            const database = await db.connectToDb();
            dispatch(addCategory(database, formCategory));
            navigation.navigate('InputScreen');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSetForm = (key: keyof AddCategoryType, t: string | number) => {
        setFormCategory(prev => {
            return {
                ...prev,
                [key]: t,
            };
        });
    };

    useEffect(() =>{
        dispatch(colorDb.getAllColorTable());
        dispatch(iconDb.getAllIconTable());
    },[]);


  return (
    <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
            <Gap height={16} />
            <Text>New Category Name</Text>
            <TextInput placeholder="Category Name" onChangeText={(t)=> {
                handleSetForm('category_name', t);
            }} />
            <Gap height={8} />
            <Text>Category Icon</Text>
            <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                maxHeight={200}
                // value={value}
                data={local_data}
                valueField="value"
                labelField="lable"
                imageField="image"
                placeholder="Select country"
                searchPlaceholder="Search..."
                onChange={(e)=> {
                    setFormCategory(prev =>{
                        return{
                            ...prev,
                            icon: prev.lable,
                            id_icon:prev.value
                        }
                    })
                }}
            />
            <Gap height={8} />
            <Text>Color</Text>
            <Gap height={8} />
            <View style={styles.ctColorSection}>
                {color.map((item) =>(
                    <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={()=> {
                        handleSetForm('id_color', item.id);
                        handleSetForm('color', item.color_name);
                    }}
                    key={item.id}
                    style={colorStyle(item.color_name, item.color_name === formCategory.color)} />
                ))}
            </View>
            <Gap height={8} />
            <Text>Preview</Text>
            <Gap height={8} />
            <View style={stylePreview(formCategory.color)} >
                {formCategory.category_name && <Image style={{width:50, height:50, flex:1}} source={formCategory.category_name} />}
                <Text style={{flex:1}} maxFontSizeMultiplier={1}>{formCategory.category_name}</Text>
            </View>
            <Gap height={8} />
            <Button label="Save" onPress={handleAddCategory} />
        </View>
    </SafeAreaView>
  );


};

export default AddNewCategoryScreen;

const colorStyle  = (bgColor: ColorValue, isSelected: boolean) : ViewStyle =>{
    return {
        width:50,
        height:50,
        backgroundColor:bgColor,
        borderRadius:100,
        borderWidth:isSelected ? 0.5 : 0,
        borderColor: isSelected ? 'black' : undefined,
    };
};
const stylePreview = (bgColor?: ColorValue) :ViewStyle => {
    return {
        width: WIDTHSCREEN / 2,
        height:50,
        backgroundColor: bgColor,
        borderRadius: 16,
        justifyContent:'center',
        alignItems:'center',
        padding: 8,
    };
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        paddingHorizontal:16,
    },
    container:{
        paddingHorizontal:16,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      imageStyle: {
        width: 24,
        height: 24,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    ctColorSection: {
        flexDirection:'row',
         gap:8,
    },
});
