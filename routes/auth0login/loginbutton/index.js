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
// import * as AuthSession from "expo-auth-session";
const auth0Domain = "https://dev-nebce-qf.eu.auth0.com";
const auth0ClientId = "Z40hKySNWVoHEJsbYv8qiF9AHwjmPBDO"

function LoginButton() {
  const navigation = useNavigation();
  const [isAuthenticated, setAuthenticated] = useState("loading")
  const [exp, setExpDate] = useState(0);
  const logout = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken")
    if (!accessToken) return;

    

    const discovery = await AppAuth.fetchDiscoveryAsync(auth0Domain);

    const redirectUrl = AppAuth.makeRedirectUri({ useProxy: false });

    const revoked = await AppAuth.revokeAsync(
      { token: accessToken },
      discovery
    );

    if (!revoked) return;

    const logoutOpts = {
      client_id: auth0ClientId,
      returnTo: redirectUrl,
    };
    const logoutUrl = auth0Domain + `/v2/logout?` + toQueryString(logoutOpts);

    const result = await WebBrowser.openAuthSessionAsync(
      logoutUrl,
      redirectUrl
    );

    await AsyncStorage.removeItem("accessToken");
    setAuthenticated(false)
  };
  const loginWithRedirect = async () => {
    const redirectUrl = AppAuth.makeRedirectUri({ useProxy: true });
    console.log("redirect", redirectUrl, auth0Domain)

    // let authUrl = `${auth0Domain}/authorize?` + toQueryString({
    //   client_id: auth0ClientId,
    //   response_type: 'token',
    //   audience: "esclot-api",
    //   scope: 'openid profile email offline_access',

    //   redirect_uri: redirectUrl,
    // });
    const discovery = await AppAuth.fetchDiscoveryAsync(auth0Domain);
    const authRequestOptions = {
      usePKCE: true,
      responseType: AppAuth.ResponseType.Code,
      clientId: auth0ClientId,
      redirectUri: redirectUrl,
      prompt: AppAuth.Prompt.Login,
      scopes: ["openid", "profile", "email", "offline_access", "crud:list"],
      extraParams: {
        audience: "esclot-api",
        access_type: "offline",
      },
    };
    const authRequest = new AppAuth.AuthRequest(authRequestOptions);

    const authorizeResult = await authRequest.promptAsync(discovery, {
      useProxy: true,
    });
    console.log("authResult", authorizeResult)
    const tokenResult = await AppAuth.exchangeCodeAsync(
      {
        code: authorizeResult.params.code,
        clientId: auth0ClientId,
        redirectUri: redirectUrl,
        extraParams: {
          code_verifier: authRequest.codeVerifier || "",
        },
      },
      discovery
    );
    console.log("Authorize result", tokenResult);

    // console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    // console.log(`AuthURL is:  ${authUrl}`);
    // const result = await AuthSession.startAsync({
    //   authUrl: authUrl
    // });

    if (tokenResult.accessToken) {
      // console.log("resultt",result);

      let token = tokenResult.accessToken;
      AsyncStorage.setItem("accessToken", token).then(
        result => {
          console.log("accessTokenSet", result)
          var decoded = jwt_decode(token);

          setExpDate(decoded.exp);
          setAuthenticated(true)
        }

      )
      // this.props.setToken(token);
      // this.props.navigation.navigate("Next Screen");
    }
  }
  const detectLogin = async () => {

    // const auth0 = new Auth0({ domain: 'dev-nebce-qf.eu.auth0.com', clientID: 'Z40hKySNWVoHEJsbYv8qiF9AHwjmPBDO' });

    AsyncStorage.getItem("accessToken").then(accessToken => {

      var decoded = jwt_decode(accessToken);
      if (decoded.exp > moment().unix()) {
        setAuthenticated(false);
       
      } else {
        setAuthenticated(true);

      }
    })
  }


  return !(exp > moment().unix()) ?

    <TouchableOpacity onPress={loginWithRedirect} type="clickable-text">
      <Text size="s">Login</Text>
    </TouchableOpacity> :

    <View>
      <View style={styles.border} />
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

})