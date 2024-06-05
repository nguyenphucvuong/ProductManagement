import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { database } from '../../FireBase/firebaseConfig';
import { onValue, push, ref, set, child, get } from "firebase/database";
const ProductDetail = () => {
    const navigation = useNavigation(); // Sử dụng hook navigation
    const route = useRoute();
    const { id } = route.params;
    const [arrListCart, setArrListCart] = useState([]);
    const getListCart = () => {
        const db = ref(database, `Bill/${id}/Cart`)
        onValue(db, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                const arr = Object.values(data);
                setArrListCart(arr);
            }
            else {
                console.log('data null');
            }
        });
    }
    useEffect(() => {
        getListCart();
    }, []);
    console.log('id', id);
    console.log('arrListCart', arrListCart);
    return (
        <View style={styles.homeManager}>
            <FlatList
                style={styles.flatList}
                data={arrListCart}
                renderItem={({ item }) => (
                    <View style={styles.itemListView}>
                        <Text style={styles.textName}>Sản phẩm</Text>
                        <View style={styles.separator} />
                        <View style={styles.linearLayout}>
                            <View style={styles.imageContainer}>
                                {console.log('testImg', item.img)}
                                {item.img && <Image source={{ uri: item.img }} style={styles.image} />}
                            </View>
                            <View style={styles.viewText}>
                                <Text style={[styles.text, { color: 'black' }]}>
                                    Tên: {item.name}
                                </Text>
                                <Text style={[styles.textPrice, { color: 'grey' }]}>
                                    Size: {item.size}, {item.color}
                                </Text>
                                <Text style={[styles.textPrice, { color: 'red' }]}>
                                    Giá: {item.price}
                                </Text>
                            </View>
                        </View>

                    </View>
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
        padding: 10,
        fontSize: 18,
        width: '100%',
        height: 160,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120, // Fixed width to ensure alignment
    },
    linearLayout: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: 'blue',
    },
    viewText: {
        flex: 1,
        justifyContent: 'center', // Căn giữa văn bản theo chiều dọc
        marginLeft: 10,
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
    },
    textPrice: {
        fontSize: 18,
        marginTop: 5,
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: 'grey',
        marginVertical: 5,
    },

});
export default ProductDetail;
