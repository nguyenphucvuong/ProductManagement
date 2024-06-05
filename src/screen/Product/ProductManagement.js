import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, Alert,ActivityIndicator} from 'react-native';
import React, { useState , useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
import { database } from '../../FireBase/firebaseConfig';
import { onValue, push, ref, set, child, get } from "firebase/database";
// src
import Manager from '../../Components/Manager';

const HomeManager = () =>{
    const navigation = useNavigation(); // Sử dụng hook navigation
    const route = useRoute();
    const [manager] = useState(new Manager());
    const [arrList, setArrList] = useState([]);
    //const dataList = Object.values(arrList); // Chuyển đổi đối tượng thành mảng các mục dữ liệu
    //đọc dữ liệu API PHP   
    //Đọc dữ liệu firebase
      const getListProduct = () => {
        const db = ref(database,'product/')
        onValue(db,(snapshot) => {
          const data = snapshot.val();
          if(data!== null){ 
            const arr = Object.values(data); 
            setArrList(arr);
          }
          else{
            console.log('data null');
          }
        }); 
      } 
    //xử lý xóa
    const removeProduct = (idPr,imagePr) => { 
      manager.removeProduct(idPr,imagePr);
    }; 
    //cập nhật lại dữ liệu     
    useEffect(() => {  
      //đọc dữ liệu   
      getListProduct();
      console.log('arr',arrList);  
  }, []);
    return (  
        <View style={styles.homeManager}>
            <FlatList
                style={styles.flatList}
                data={arrList}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {navigation.navigate('Sản phẩm', { item: item, detail: true , flag: true})
                  }}>
                    <View style={styles.itemListView}>
                      {console.log(item.imagePr[0])}
                        {item.imagePr[0] && <Image source={{uri: item.imagePr[0]}} style={styles.image} />}
                        <View>
                          <Text style={styles.textName}>
                            Tên:{item.namePr} 
                          </Text>
                          <Text style={styles.textPrice}>
                            Giá:{item.pricePr} 
                          </Text>
                          <Text style={styles.textDescription}>
                            Mô tả:{item.descriptionPr.length > 10 ? item.descriptionPr.split(" ").slice(0,10).join(" ") + '...' : item.descriptionPr} 
                          </Text>     
                        </View>
                        <View style={styles.iconDelete}>
                            <IconButton
                                icon="delete"
                                size={25}
                                onPress={() => removeProduct(item.idPr,item.imagePr)}
                            />
                        </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item,index)=>item.idPr}
            />
          
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sản phẩm')}>
                    <Text style={styles.buttonText}>Thêm</Text>
                </TouchableOpacity>     
                
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    homeManager: {
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
export default HomeManager;