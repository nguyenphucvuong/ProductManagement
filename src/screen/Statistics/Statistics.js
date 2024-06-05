import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Button,
    ActivityIndicator,
    ScrollView,
    Pressable,
} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { ref, set, onValue, child, get, push } from "firebase/database";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { database } from '../../FireBase/firebaseConfig';
// import { BarChart } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";
const date = new Date();

//Hàm xử lý dữ liệu
let tinhTongDoanhThu = (arr, month) => {
    let totalPrice = 0; // tổng tiền
    let totalQuanti = 0; //tổng sô lượng
    let arrImg = []; //danh sách sản phẩm
    let i = 0
    for (let index = 0; index < arr.length; index++) {

        const element = arr[index];
        let a = Intl.DateTimeFormat('vn-GB').format(element.date); //converse timestamp to string
        let substrings = a.split("/"); //tách chuỗi

        //kiểm tra đơn hàng đúng tháng được chọn và có trạng thái hoàn thành
        if (substrings[0] == month && element.status == "done") {
            totalPrice += element.total; //tổng tiền

            let temp = Object.values(element.Cart)//conver to array
            totalQuanti += temp[0].quantity

            let tempImg = Object.values(element.Cart);//conver to array
            //console.log('arr',tempImg);
            arrImg[i] = tempImg[0];
            i++;

        }
        //console.log("arr ne",arrImg);
    }

    let toltalYear = 0;
    for (let index = 0; index < arr.length; index++) {

        const element = arr[index];
       toltalYear+= element.total
        //console.log("arr ne",arrImg);
    }
    //console.log("img", arrImg);
    return [totalPrice, totalQuanti, arrImg, toltalYear];
}

const ProductItem = ({ image, name }) => (
    <View style={styles.itemContainer}>
        <Image source={{ uri: image }} style={styles.tinyLogo} />
        <Text style={styles.itemName}>
            {name}
        </Text>
    </View>
);

const dataDropDownList = [
    { label: 'Tháng 1', value: '1' },
    { label: 'tháng 2', value: '2' },
    { label: 'Tháng 3', value: '3' },
    { label: 'tháng 4', value: '4' },
    { label: 'Tháng 5', value: '5' },
    { label: 'tháng 6', value: '6' },
    { label: 'Tháng 7', value: '7' },
    { label: 'tháng 8', value: '8' },
    { label: 'Tháng 9', value: '9' },
    { label: 'tháng 10', value: '10' },
    { label: 'Tháng 11', value: '11' },
    { label: 'tháng 12', value: '12' },
];

const Statistics = (props) => {
    //dữ liệu từ firebase
    const [data, setData] = useState([]);

    //dropdown list
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const navigation = useNavigation();



    const renderLabel = () => {
        if (value || isFocus) {

        }
        return null;
    };

    //Ham doc du lieu tu firebase
    const read = async () => {
        const databaseRef = ref(database);
        try {
            get(child(databaseRef, `Bill/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let arrTemp = Object.values(snapshot.val());
                    setData(arrTemp);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }

    }


    //Hàm hiển thị thống kê
    const renderStatisticsBill = () => {

        let totalMonth = tinhTongDoanhThu(data, value)
        let arrImg = totalMonth[2];

        //console.log("arrimg",arrImg);
        if (totalMonth[0] != 0) {
            return (
                <View style={{ top: "15%", left: "3%" }}>

                    <ScrollView horizontal={true}>
                        <View style={styles.listItemContainer}>
                            {arrImg.map((e, index) => (
                                <View key={index.toString()}>
                                    <ProductItem
                                        image={e.img}
                                        name={e.name}
                                    />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <Text
                        style={[styles.price, {marginTop: -5}]}>
                        Tháng {value}
                    </Text>
                    <Text
                        style={styles.price}>
                        Số lượng sản phẩm đã bán trong tháng: {totalMonth[1]}
                    </Text>
                    <Text
                        style={styles.price}>
                        Tổng doang thu tháng: {totalMonth[0]} VND
                    </Text>
                </View>
            );
        }if(value == null){
        } else {
            return (
                <View style={{ top: "50%", left: "3%" }}>
                    <Text
                        style={styles.price}>
                        Tháng {value} chưa có sản phẩm được bán !
                    </Text>

                </View>
            );
        }
    }

    //Hàm hiển thị biểu đồ
    const renderChart = () => {

        let m1 = tinhTongDoanhThu(data, '1');
        let m2 = tinhTongDoanhThu(data, '2');
        let m3 = tinhTongDoanhThu(data, '3');
        let m4 = tinhTongDoanhThu(data, '4');
        let m5 = tinhTongDoanhThu(data, '5');
        let m6 = tinhTongDoanhThu(data, '6');
        let m7 = tinhTongDoanhThu(data, '7');
        let m8 = tinhTongDoanhThu(data, '8');
        let m9 = tinhTongDoanhThu(data, '9');
        let m10 = tinhTongDoanhThu(data, '10');
        let m11 = tinhTongDoanhThu(data, '11');
        let m12 = tinhTongDoanhThu(data, '12');

        const pieData = [
            { value: m1[0], text: 'tháng 1' },
            { value: m2[0], text: 'tháng 2' },
            { value: m3[0], text: 'tháng 3' },
            { value: m4[0], text: 'tháng 4' },
            { value: m5[0], text: 'tháng 5' },
            { value: m6[0], text: 'tháng 6' },
            { value: m7[0], text: 'tháng 7' },
            { value: m8[0], text: 'tháng 8' },
            { value: m9[0], text: 'tháng 9' },
            { value: m10[0], text: 'tháng 10' },
            { value: m11[0], text: 'tháng 11' },
            { value: m12[0], text: 'tháng 12' },
        ];
        return (
            <View>
                <PieChart
                    showText
                    textColor="black"
                    fontWeight="bold"

                    radius={150}
                    textSize={18}
                    data={pieData}
                />
            </View>)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            read();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#EAC1C9' }}>
            <View style={{ marginTop: 20, margin: 10 }}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataDropDownList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Chọn tháng để xem thống kê' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>
            <View style={{ marginTop: "5%", marginLeft: "12%" }}><Text> {renderChart()}</Text></View>
            <View>
                {renderStatisticsBill()}
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        marginTop: 15,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    mau: {
        alignSelf: 'center',
        marginTop: 7,
        fontWeight: 'bold',
        fontSize: 17,
    },
    tinyLogo: {
        borderRadius: 10,
        width: 80,
        height: 80,
    },
    Logo: {
        marginTop: 20,
        borderRadius: 10,
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
    name: {
        marginTop: 10,
        alignSelf: 'left',
        fontWeight: 'bold',
        fontSize: 16,
    },
    submit: {
        marginTop: 20,
        alignSelf: 'center',
        width: 180,
        height: 40,
        backgroundColor: '#543B3E',
        borderRadius: 10,
        borderWidth: 1,
    },
    price: {
        marginLeft: 10,
        marginTop: 7,
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'left'
    },
    des: {
        height: 70,
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    viewPD: {
        alignSelf: 'left'
    }, dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        backgroundColor: 'white',
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemContainer: {
        alignItems: 'center',
        margin: 8,
        backgroundColor: '#EAC1C9',
        borderRadius: 8,
    },
    listItemContainer: {
        flexDirection: 'row',
    },
    itemName: {
        fontSize: 16,
        marginVertical: 4,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Statistics;