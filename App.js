import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './src/FireBase/firebaseConfig';
//
import Product from './src/screen/Product/Product';
import ProductManagement from './src/screen/Product/ProductManagement';
import DiscountManagerment from './src/screen/DiscountCode/DiscountCodeManagement';
import DiscountCode from './src/screen/DiscountCode/DiscountCode';
import Login from './src/screen/Login/Login';
import ProductConfirmation from './src/screen/ProductConfirmation/ProductConfirmation';
import ProductDetail from './src/screen/ProductConfirmation/ProductDetail';
import Statistics from './src/screen/Statistics/Statistics';

const ProductManagementStack = createNativeStackNavigator();
//Product
const ProductManagementStackScreen = () => {
  const navigation = useNavigation();
  return (
    <ProductManagementStack.Navigator>
      <ProductManagementStack.Screen
        name='Quản trị sản phẩm'
        component={ProductManagement}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={30}
                color="black"
              />
            )
          },
        }} />
      <ProductManagementStack.Screen name='Sản phẩm' component={Product} options={{ headerTitleAlign: 'center' }} />
    </ProductManagementStack.Navigator>
  )
}
//Discount  
const DiscountCodeManagementStackScreen = () => {
  const navigation = useNavigation();
  return (
    <ProductManagementStack.Navigator>
      <ProductManagementStack.Screen
        name='Quản trị mã giảm giá'
        component={DiscountManagerment}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={30}
                color="black"
              />
            )
          }
        }} />
      <ProductManagementStack.Screen  name='Mã giảm giá' component={DiscountCode} options={{ headerTitleAlign: 'center' }} />
    </ProductManagementStack.Navigator>
  )
}
//ProductConfirmation
const ProductConfirmationtStackScreen = () => {
  const navigation = useNavigation();
  const logOut = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    })
  }
  return (
    <ProductManagementStack.Navigator>
      <ProductManagementStack.Screen
        name='Xác nhận sản phẩm'
        component={ProductConfirmation}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={30}
                color="black"
              />
            )
          },
          headerRight: () => (
            <Icon
              name="log-out"
              onPress={logOut}
              size={30}
              color="black"
            />
          ),
        }} />
      <ProductManagementStack.Screen name='Chi tiết sản phẩm' component={ProductDetail} options={{ headerTitleAlign: 'center' }} />
    </ProductManagementStack.Navigator>
  )
}
//Statisticst
const StatisticstStackScreen = () => {
  const navigation = useNavigation();
  return (
    <ProductManagementStack.Navigator>
      <ProductManagementStack.Screen
        name='Số liệu thông kê'
        component={Statistics}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={30}
                color="black"
              />
            )
          },
        }} />
    </ProductManagementStack.Navigator>
  )
}
const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name='Xác nhận sản phẩm'
        component={ProductConfirmationtStackScreen}
        options={{
          headerTitleAlign: 'center',
          drawerIcon: ({color, size }) => (
            <Icon name="check" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name='Quản trị sản phẩm'
        component={ProductManagementStackScreen}
        options={{
          drawerIcon: ({color, size }) => (
            <Icon name="shopping-bag" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name='Quản trị mã giảm giá'
        component={DiscountCodeManagementStackScreen}
        options={{
          drawerIcon: ({color, size }) => (
            <Icon name="price-tag" size={size} color={color} />
          )
        }}
      />
       <Drawer.Screen
        name='Số liệu thống kê'
        component={StatisticstStackScreen}
        options={{
          drawerIcon: ({color, size }) => (
            <Icon name="pie-chart" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}
const StackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Administration' component={DrawerNav} />
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
