import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import Text from './Text';
import LoginButton from '../../routes/auth0login/loginbutton';

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const onItemPress = (key) => {
    const filteredMainDrawerRoutes = props.drawerItems.find((e) => {
      return e.key === key;
    });
    const selectedRoute = filteredMainDrawerRoutes.route;
    navigation.dispatch(DrawerActions.toggleDrawer());
    navigation.navigate(selectedRoute.nav, {
      screen: selectedRoute.routeName,
    })
  };

  const logOut = async () => console.log('log out');

  function renderMainDrawer() {
    return (
      <View>
        <View >
          <Text style={styles.topTitle}>Menu</Text>
        </View>
        <View style={styles.border} />
        {props.drawerItems.map((parent) => (
          <View key={parent.key}>
            <TouchableOpacity
              key={parent.key}
              testID={parent.key}
              onPress={() => {
                onItemPress(parent.key);
              }}>
              <View style={styles.parentItem}>
                <Text style={[styles.icon, styles.title]}>{parent.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.parentItem2}>
          <LoginButton />
        </View>

      </View>
    );
  }

  // function renderLogoutBtn() {
  //   return (

  //   );
  // }

  return (
    <ScrollView style={styles.drawerContainer}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.centered}>
        </View>
        {renderMainDrawer()}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  redTitle: {
    color: "#9e0101",
    margin: 10,
    marginLeft: 30,
    textAlign: 'center',
  },
  border: {
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  topTitle: {
    margin: 10,
    marginLeft: 30,
    fontWeight: "bold",
    color: "#828282"

  },
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 75,
  },
  drawerContainer: {
    backgroundColor: 'white',
    paddingTop: 50
  },
  container: {
    flex: 1,
    zIndex: 1000,
  },
  centered: {
    alignItems: 'center',
  },
  parentItem: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 4,
    paddingBottom: 4,
  },
  parentItem2:{
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    color: "green",
    paddingTop: 10,
    paddingBottom: 4,
  },
  title: {
    margin: 10,
    marginLeft: 30,
    color: 'black',
    textAlign: 'center',
  },
});

export default CustomDrawerContent;