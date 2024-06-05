import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {Avatar, Title} from 'react-native-paper';
import { useNavigation, } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@react-native-vector-icons/entypo';

const DrawerList = [
    {icon: 'home', label: 'Home1', navigateTo: 'Home'},
    
  ];
  const DrawerLayout = ({icon, label, navigateTo}) => {
    const navigation = useNavigation();
    // console.log(userData);
    return (
      <DrawerItem
        icon={({color, size}) => <Icon name={icon} color={color} size={size} />}
        label={label}
        onPress={() => {
          navigation.navigate(navigateTo);
        }}
      />
    );
  };
  
  const DrawerItems = props => {
      return DrawerList.map((el, i) => {
        return (
          <DrawerLayout
            key={i}
            icon={el.icon}
            label={el.label}
            navigateTo={el.navigateTo}
          />
        );
      });
    };
const DrawerContent= (props) => {
    return(
        <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
        />
      </View>
    </View>
    )
}
export default DrawerContent;
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 13,
      lineHeight: 14,
      // color: '#6e6e6e',
      width: '100%',
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      borderBottomWidth: 0,
      borderBottomColor: '#dedede',
      borderBottomWidth: 1,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#dedede',
      borderTopWidth: 1,
      borderBottomColor: '#dedede',
      borderBottomWidth: 1,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });