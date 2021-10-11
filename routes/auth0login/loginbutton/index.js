import React, { useEffect, useState } from "react";
// import { AuthSession } from 'expo';
import * as AppAuth from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import jwt_decode from "jwt-decode";
import toQueryString from "to-querystring";
import Auth0 from "auth0-react-native";
import Button from '../../../components/common/Button';
import Text from '../../../components/common/Text'

import { StyleSheet, TouchableOpacity, View, AsyncStorage } from "react-native";
import { acc } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import { useAuth0 } from '../../../network/auth0';
// import * as AuthSession from "expo-auth-session";
const auth0Domain = "https://dev-nebce-qf.eu.auth0.com";
const auth0ClientId = "Z40hKySNWVoHEJsbYv8qiF9AHwjmPBDO"

function LoginButton() {
  const navigation = useNavigation();
  const {user,result,login,logout,accessToken, request} = useAuth0();
  const [isAuthenticated, setAuthenticated] = useState("loading")
  const [exp, setExpDate] = useState(0);
 

console.log("userrrrr", user)

  return !user ?

    <TouchableOpacity onPress={login} type="clickable-text">
      <Text size="s">Login</Text>
    </TouchableOpacity> :

    <View>
      <View style={styles.border} />
      <TouchableOpacity onPress={()=> navigation.navigate('Profile')} testID="customDrawer-logout">
        <View style={styles.parentItem}>
          <Text>Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate({name:"Orders"})} testID="customDrawer-logout">
        <View style={styles.parentItem}>
          <Text>Orders</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={logout} testID="customDrawer-logout">
        <View style={styles.parentItem}>
          <Text style={styles.redTitle}>{'Log out'}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.border} />
    </View>

};

export default LoginButton;

const styles = StyleSheet.create({
parentItem:{
  marginTop:5,
  marginBottom:25
}
})

