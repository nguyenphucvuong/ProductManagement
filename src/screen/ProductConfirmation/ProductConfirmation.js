import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import { database } from '../../FireBase/firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { onValue, update, push, ref, set, child, get,remove } from "firebase/database";
const ProductConfirmation = () => {
    const navigation = useNavigation(); // Sử dụng hook navigation
    const [arrListBill, setArrListBill] = useState([]);
    const getListBill = () => {
        const db = ref(database, 'Bill/')
        onValue(db, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                const arr = Object.values(data);
                setArrListBill(arr);
            }
            else {
                console.log('data null');
            }
        });
    }
    const handleRefuse = (id) => {
        update(ref(database, 'Bill/' + id), {
            status: 'fail',
        }).then(() => {
            Alert.alert('Từ chối thành công')
        })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleDone = (id) => {
        update(ref(database, 'Bill/' + id), {
            status: 'done',
        }).then(() => {
            Alert.alert('Xác nhận thành công')
        })
            .catch((error) => {
                console.error(error);
            });
    }
    const removeBill = (id) => {
        remove(ref(database, 'Bill/' + id), {
        }).then(() => {
            Alert.alert('Xóa thành công')
        })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        getListBill();
    }, []);
    //console.log('arrListBill', arrListBill);
    return (
        <View style={styles.homeManager}>
            <FlatList
                style={styles.flatList}
                data={arrListBill}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Chi tiết sản phẩm', { id: item.id })
                    }}>
                        <View style={styles.itemListView}>
                            <View style={styles.userInfo}>
                                <Text style={styles.textName}>
                                    Email: {item.username}
                                </Text>
                                <Text style={styles.text}>
                                    Tên: {item.name}
                                </Text>
                                <Text style={styles.text}>
                                    SĐT: {item.phone}
                                </Text>
                                <Text style={styles.text}>
                                    Địa chỉ: {item.address}
                                </Text>
                                <Text style={[styles.text, { color: 'red' }]}>
                                    Tổng: {item.total}
                                </Text>

                                {item.status == 'done' || item.status == "fail" ? (
                                    <View style={styles.viewStatus}>
                                        <Text >{item.status === 'done' ? 'Đã xác nhận' : 'Đã từ chối'}</Text>
                                        <View style={styles.iconDelete}>
                                            <IconButton
                                                icon="delete"
                                                size={25}
                                                onPress={() => removeBill(item.id)}
                                            />
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.viewStatus}>
                                        <TouchableOpacity style={styles.buttonRefuse} onPress={() => handleRefuse(item.id)}>
                                            <Text style={styles.buttonText}>Từ chối</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonConfirm} onPress={() => handleDone(item.id)}>
                                            <Text style={styles.buttonText}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                            </View>

                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>

    );
}
const styles = StyleSheet.create({
    homeManager: {
        flex: 1,
        backgroundColor: 'pink',
    },
    flatList: {
        margin: 20,
    },
    itemListView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        width: '100%',
        height: 175,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    userInfo: {
        flex: 1,
    },
    textName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        marginLeft: '5%',
    },
    buttonRefuse: {
        backgroundColor: 'red',
        width: '23%',
        marginRight: 5,
    },
    buttonConfirm: {
        width: '23%',
        backgroundColor: 'green',

    },
    viewStatus: {
        flexDirection: 'row',
        alignItems: 'center', // Centers items vertically within the row
        justifyContent: 'space-between', // Adds space between the Text and IconButton
        marginLeft: 'auto',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },

});
export default ProductConfirmation;