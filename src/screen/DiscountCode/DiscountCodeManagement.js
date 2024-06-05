import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, { useState , useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
import { database } from '../../FireBase/firebaseConfig';
import { onValue, push, ref, set, child, get } from "firebase/database";
//
import ManagerDiscount from '../../Components/ManagerDiscount';
const DiscountManagerment = () => {
  const navigation = useNavigation(); // Sử dụng hook navigation
  const [arrListCode, setArrListCode] = useState([]);
  const [managerDiscount] = useState(new ManagerDiscount());
  //Đọc dữ liệu firebase
  const getListDiscount = () => {
    const db = ref(database,'Discount/')
    onValue(db,(snapshot) => {
      const data = snapshot.val();
      if(data!== null){  
        const arr = Object.values(data);  
        setArrListCode(arr);
      }
      else{
        console.log('data null');
      }
    }); 
  } 
  //xóa  firebase
  const removeDiscount = (idDis) => {
    managerDiscount.removeDiscount(idDis);
  }
  useEffect(() =>{
    getListDiscount();
  },[]);
    return(
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={arrListCode}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {navigation.navigate('Mã giảm giá', { item: item, detail: true , flag: true})
                  }}>
                    <View style={styles.itemListView}>
                        <View>
                          <Text style={styles.textName}>
                            Tên:{item.nameDis} 
                          </Text>
                          <Text style={styles.textPrice}>
                            Mã:{item.percentage} 
                          </Text>
                          <Text style={styles.textName}>
                            Trạng thái:{item.status} 
                          </Text>   
                        </View>
                        <View style={styles.iconDelete}>
                            <IconButton
                                icon="delete"
                                size={25}
                                onPress={() => removeDiscount(item.id)}
                            />
                        </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item,index)=>item.id}
            />
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mã giảm giá')}>
                    <Text style={styles.buttonText}>Thêm</Text>
                </TouchableOpacity>     
            </View>
        </View>
    )
    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
    },  
    buttonWrapper: {
      backgroundColor: 'green',
      height: 40,
      justifyContent: 'center',
      marginTop: 'auto',
      borderRadius: 10,
      margin: 10,
  },
  button: {
      backgroundColor: '#007bff',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemListView: {
      flexDirection: 'row',
      padding: 10,
      fontSize: 18,
      width:'100%',
      height: 130,
      marginVertical: 5,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    title: {
      fontSize: 32,
    },
    selectList: {
      borderWidth: 1,
      height: 40,
      width: 230,
      backgroundColor: 'pink',
      marginLeft: 40,
    },
    imageProduct: {
      height: 100,
      width: 100,
      margin: 10,
      backgroundColor: 'black',
    },
    textName: {
      fontSize: 18,
      fontWeight: 'bold',
      margin: 5,
    },
    textPrice: {
      fontSize: 16,
      color: 'red',
      margin: 5,
    },
    textDescription: {
      fontSize: 16,
      margin: 5,
    },
    deleteProduct: {
      marginTop: 'auto',
    },
    flatList: {
      margin: 20,
    },
    iconDelete: {
      marginLeft: 'auto',
       justifyContent: 'flex-end',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 40,
      margin: 10,
      backgroundColor: 'blue',
    },
  
  });
export default DiscountManagerment;