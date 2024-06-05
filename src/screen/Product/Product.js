import React, { Component, useState, useEffect } from "react";
import { View, Modal, Text, Pressable, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import navigation hook
import { IconButton, MD3Colors } from 'react-native-paper';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import * as ImagePicker from 'expo-image-picker';
import { storage, database } from "../../FireBase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
// 
import Manager from "../../Components/Manager";
import Color from "../../Models/Color";

const ManagerProduct = () => {

  const navigation = useNavigation(); // Sử dụng hook navigation
  // route
  const route = useRoute();
  // Lấy dữ liệu từ route.params
  const { item, detail, flag } = route.params ?? { arrList: [] };
  const [details, setDetais] = useState(detail);
  const [flags, setFlags] = useState(flag ?? false);
  const [modalVisible, setModalVisible] = useState(false);

  //Dropdown-picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Ao', value: 'Áo' },
    { label: 'Quan', value: 'Quần' },
  ]);
  const [arrColor, setArrColor] = useState([
    new Color('Trắng', 'white'),
    new Color('Đen', 'black'),
    new Color('Xanh Dương', 'blue'),
    new Color('Xanh lá', 'green'),
    new Color('Vàng', 'yellow'),
    new Color('Đỏ', 'red'),
    new Color('Tím', 'purple'),
    new Color('Cam', 'orange'),
  ]);
  //   
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState([]);
  const [arrListImage, setArrListImage] = useState([]);
  const [description, setDescription] = useState('');
  const [manager] = useState(new Manager());

  //

  //Choose image
  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setModalVisible(true);
      setArrListImage(prevState => [...prevState, result.assets[0].uri]);
    } 
  }
  const handleColorPress = (color) => {
    if (color) {
      setColor(prevState => [...prevState, color]);
      setModalVisible(false);
    }
  }
  //Xử lý thêm
  const handleAddProduct = () => {
    // Cập nhật arrList sau khi thêm sản phẩm mớ
    if (name == "") {
      return Alert.alert('Thông báo', 'Nhập tên');
    } else if (type == "") {
      return Alert.alert('Thông báo', 'Chọn loại');
    } else if (price == "") {
      return Alert.alert('Thông báo', 'Nhập giá');
    } else if (arrListImage == "") {
      return Alert.alert('Thông báo', 'Chọn ảnh');
    } else if (description == "") {
      return Alert.alert('Nhập mô tả');
    } else {
      //handleImage(arrListImage);
      manager.addProduct(id, name, type, price, description, color, arrListImage);
  
      // Reset input fields 
      navigation.navigate('Quản trị sản phẩm');
    }

  };
  //Xử lý sửa
  const handleUpdateProduct = () => {
    if (name == "") {
      return Alert.alert('Thông báo', 'Nhập tên');
    } else if (type == "") {
      return Alert.alert('Thông báo', 'Chọn loại');
    } else if (price == "") {
      return Alert.alert('Thông báo', 'Nhập giá');
    } else if (arrListImage == "") {
      return Alert.alert('Thông báo', 'Chọn ảnh');
    } else if (description == "") {
      return Alert.alert('Nhập mô tả');
    } else {
      manager.updateProduct(id, name, type, price, description, color, arrListImage);
      navigation.navigate('Quản trị sản phẩm');
    }

  };
  // Khai báo hàm onPressButton và biến buttonText
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
        setID(item.idPr);
        setValue(item.typePr);
        setName(item.namePr);
        setPrice(item.pricePr);
        setDescription(item.descriptionPr);
        setColor(item.colorPr);
        setArrListImage(item.imagePr);
        setDetais(false);
        // Xử lý sửa sản phẩm
        onPressButton = () => handleUpdateProduct();

      }
      else {
        // Xử lý sửa sản phẩm
        onPressButton = () => handleUpdateProduct();
      }
    }
    else {
      // Xử lý thêm sản phẩm
      onPressButton = () => handleAddProduct();
    }
  }
  useEffect(() => {
    clickText();
  }, [handleUpdateProduct, handleAddProduct]);
  //hàm xóa hình ảnh and màu
  const handleDeleteImage = (imagePr) => {
    //tìm vị trí image
    const index = arrListImage.findIndex(arrListImage => arrListImage === imagePr);
    console.log('index',index);
    if(index != -1){
      const indexColor = color[index];
      console.log('indexColor',indexColor);

      const deleteImage = arrListImage.filter(item => item !== imagePr); 
      const deleteColor = color.filter(item => item !== indexColor);

      setArrListImage(deleteImage);
      setColor(deleteColor);
    }
    else{
      console.error("Image not found in arrListImage");
    }
  }

  //log 
  // console.log('color', color);
  // console.log('image', arrListImage);
  return (
    <View style={styles.container}>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Chọn loại: </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          defaultOption={{ label: 'Ao', value: 'Áo' }}
          onChangeValue={(item) => {
            console.log("Selected item:", item);
            setType(item)
          }}//xử lý được chọn
          style={styles.selectList}

        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Tên sản phẩm: </Text>
        <TextInput
          value={name}
          keyboardType="default"
          placeholder="Nhập tên sản phẩm"
          editable={true}
          style={styles.item}
          onChangeText={(text) => setName(text)}//xử lý văn bản
        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Giá: </Text>
        <TextInput
          value={price}
          keyboardType="numeric"
          placeholder="Nhập giá tiền"
          style={styles.item}
          onChangeText={(text) => setPrice(text)}
        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Mô tả: </Text>
        <AutoGrowingTextInput
          value={description}
          keyboardType="default"
          placeholder="Nhập mô tả"
          style={styles.item}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Hình ảnh: </Text>
        <TouchableOpacity style={styles.button}
          onPress={handleImagePickerPress}
        >
          <Text style={styles.buttonText}>Chọn hình</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setArrListImage([])}>
          <Text style={styles.buttonText}>Loại bỏ hình</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Bảng màu</Text>
            {/* <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity> */}
          </View>
          <FlatList
            data={arrColor}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleColorPress(item.color)}>
                <View style={[styles.imageColor, { backgroundColor: item.color }]} />
                <Text style={styles.nameColor}>{item.nameColor}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.nameColor}
            numColumns={4}
          />
        </View>
      </Modal>
      <FlatList
        horizontal={true}
        data={arrListImage}
        renderItem={({ item }) => (
          <View style={styles.itemListImage}>
            {item && <Image source={{ uri: item}} style={styles.image} />}
            <TouchableOpacity onPress={() => handleDeleteImage(item)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
            
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

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
  centeredView: {
    flex: 1,
    backgroundColor: '#C0C0C0',
  },
  product: {
    fontSize: 20,
  },
  addProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  item: {
    marginLeft: 'auto',
    height: 40,
    width: '65%',
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
  render: {
    fontSize: 24,
    color: 'red',
  },
  itemListView: {
    flexDirection: 'row',
    padding: 10,
    fontSize: 18,
    width: 330,
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
    width: '65%',
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
    padding: 20,
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
  itemListImage: {
    marginHorizontal: 5,
    position: 'relative', // Đặt vị trí của container là 'relative'
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    bottom: 80,
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    zIndex: 1, // Đặt zIndex để nút nổi lên trên hình ảnh
  },
  imageColor: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
  nameColor: {
    marginTop: 5,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Canh giữa ngang
    height: '5%',
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default ManagerProduct;