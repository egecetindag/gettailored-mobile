import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import Layout from '../../components/common/Layout';
import Text from '../../components/common/Text';
import ChooseService from '../../components/Home/ChooseService';

export default function App() {
  return (
    <View style={styles.container}>
      <Layout type="full">
        <View style={styles.wrapperStyle}>
          <View style={styles.partStyle}>
            <Text style={styles.titleStyle}>How It Works?</Text>
            
          </View>
          <View style={styles.imgView}>
            <Image style={styles.img} source={require('./info.png')} />
          </View>
          
            
          {/* <View style={styles.servicePartStyle}>
            <Text style={styles.titleStyle}>Choose Your Service</Text>
            <Text style={styles.bodyTextStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales 
            dignissim ultricies. Cras dictum blandit enim ut ullamcorper.
          </Text>
          </View> */}
          <ChooseService />
        </View>
        
      </Layout>
    </View>

  );
}

const styles = StyleSheet.create({
  imgView:{
    flex:1,
    paddingHorizontal:"10%",
    alignItems:'center',
    marginBottom:50
  },
  img:{
    width:"100%",
    height:undefined,
    aspectRatio:1.15,
    marginBottom:20,
    resizeMode: 'cover',
  },
  servicePartStyle:{
    backgroundColor: "#c4c4c426",
    paddingHorizontal: "10%",
    paddingVertical: 50
  },
  partStyle:{
    
 
    paddingHorizontal: "10%",
  paddingTop:50
  },
  wrapperStyle: {

   flex:1,
    justifyContent:"center",
   
  },
  bodyTextStyle: {
    color: "#00000054"
  },
  titleStyle: {
    textAlign:"center",
    fontSize: 25,
  
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',


  },
});