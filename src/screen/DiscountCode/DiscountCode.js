import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ManagerDiscount from '../../Components/ManagerDiscount';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import navigation hook

const DiscountCode = () => {
  const navigation = useNavigation(); // Sử dụng hook navigation
  // route
  const route = useRoute();
  const { item, detail, flag } = route.params ?? { arrList: [] };
  const [details, setDetais] = useState(detail);
  const [flags, setFlags] = useState(flag ?? false);
  //
  const [status, setStatus] = useState('');
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');
  const [description, setDescription] = useState('');
  const [managerDiscount] = useState(new ManagerDiscount());
  //Xử lý thêm
  const handleAddDiscount = () => {
    managerDiscount.addDiscount(id, name, code, percentage, description, status);
    console.log('Add', managerDiscount.epls);
    // Reset input fields 
    navigation.navigate('Quản trị mã giảm giá');
  };


  //Xử lý sửa
  const handleUpdateDiscount = () => {
    managerDiscount.updateDiscount(id, name, code, percentage, description, status);
    navigation.navigate('Quản trị mã giảm giá');
  };
  //Khai báo hàm onPressButton và biến buttonText
  let onPressButton;
  let buttonText;
  if (detail) {
    // Xử lý sửa sản phẩm
    buttonText = "Lưu";
  } else {
    // Xử lý thêm sản phẩm
    buttonText = "Thêm";
  }
  const clickText = () => {
    if (flags) {
      if (details) {
        setID(item.id);
        setStatus(item.status);
        setName(item.nameDis);
        setPercentage(item.percentage);
        setDescription(item.descriptionDis);
        setCode(item.code);
        setDetais(false);
        // Xử lý sửa sản phẩm
        onPressButton = () => handleUpdateDiscount();
      }
      else {
        // Xử lý sửa sản phẩm
        onPressButton = () => handleUpdateDiscount();
      }
    }
    else {
      // Xử lý thêm sản phẩm
      onPressButton = () => handleAddDiscount();
    }
  }
  useEffect(() => {
    clickText();
  }, [handleUpdateDiscount, handleAddDiscount]);
  return (
    <View style={styles.container}>
      <View style={styles.addDiscount}>
        <Text style={styles.discout}>Trạng thái:</Text>
        <RadioButton.Group onValueChange={newValue => setStatus(newValue)} value={status}>
          <View style={styles.addDiscount}>
            <View style={styles.addDiscount}>
              <RadioButton value='active' />
              <Text>Kích hoạt</Text>
            </View>
            <View style={styles.addDiscount}>
              <RadioButton value='inactive' />
              <Text>Chưa áp dụng</Text>
            </View>
          </View>

        </RadioButton.Group>
      </View>
      <View style={styles.addDiscount}>
        <Text style={styles.discout}>Tên Mã: </Text>
        <TextInput
          value={name}
          keyboardType="default"
          placeholder="Nhập tên mã"
          editable={true}
          style={styles.item}
          onChangeText={(text) => setName(text)}//xử lý văn bản
        />
      </View>
      <View style={styles.addDiscount}>
        <Text style={styles.discout}>Mã: </Text>
        <TextInput
          value={code}
          keyboardType="default"
          placeholder="Nhập mã"
          editable={true}
          style={styles.item}
          onChangeText={(text) => setCode(text)}//xử lý văn bản
        />
      </View>
      <View style={styles.addDiscount}>
        <Text style={styles.discout}>Giá: </Text>
        <TextInput
          value={percentage}
          keyboardType="default"
          placeholder="Nhập giá"
          editable={true}
          style={styles.item}
          onChangeText={(text) => setPercentage(text)}//xử lý văn bản
        />
      </View>
      <View style={styles.addDiscount}>
        <Text style={styles.discout}>Mô tả: </Text>
        <TextInput
          value={description}
          keyboardType="default"
          placeholder="Nhập mô tả"
          editable={true}
          style={styles.item}
          onChangeText={(text) => setDescription(text)}//xử lý văn bản
        />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton()}>
          <Text style={styles.buttonText}>{buttonText}</Text>
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
  addDiscount: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  discout: {
    fontSize: 20,
  },
  item: {
    marginLeft: 'auto',
    height: 40,
    width: '70%',
    borderWidth: 1,
    padding: 10,
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
});
export default DiscountCode;