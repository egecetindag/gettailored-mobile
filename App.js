import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './routes/Home';
import Faq from './routes/FAQ';
import About from './routes/About';
import Flow from './routes/Flow';
import Profile from './routes/ProfilePage';
import Orders from './routes/OrdersPage'
import CustomDrawerContent from './components/common/CustomDrawerContent'
import { store } from './store';
import { getServices } from './actions/ServiceActions';
import { Auth0Provider } from './network/auth0';
const Stack = createStackNavigator();
const stackScreenOpts = {
  header: { visible: false }
}

const Drawer = createDrawerNavigator();
export const drawerItemsMain = [
  {
    key: 'home',
    title: 'Home',
    route: { nav: 'MainDrawer', routeName: 'Home', title: 'Home' },
  },
  {
    key: 'about',
    title: 'About',
    route: { nav: 'MainDrawer', routeName: 'About', title: 'About' },
  },
  {
    key: 'faq',
    title: 'FAQ',
    route: { nav: 'MainDrawer', routeName: 'Faq', title: 'Faq' },
  },
];

function MainDrawerNavigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    // getUserMetadata();
    StatusBar.setBarStyle('light-content', true);
    dispatch(getServices());
  }, [])
  return (
    <Auth0Provider
    clientId="Z40hKySNWVoHEJsbYv8qiF9AHwjmPBDO"
    audience= "esclot-api"
    domain="dev-nebce-qf.eu.auth0.com"
    onLogin={() => {
      // Replace with your navigation code
    }}
    onTokenRequestFailure={() => {
      // Replace with your navigation code
    }}
  >

    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Faq" component={Faq} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Service" component={Flow} />
    </Drawer.Navigator>
     
  </Auth0Provider>
  );
}

export default function App() {
  return (
    <Provider store={store}>

      <NavigationContainer onStateChange={null}>

        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>


  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
