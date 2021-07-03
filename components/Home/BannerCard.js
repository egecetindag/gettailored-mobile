import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../common/Text';
import Button from '../common/Button';

function BannerCard({ img, title, desc, onClick }) {
    return (
        <View style={styles.bannerCardStyle}>
            {img}
            <Text style={styles.titleStyle} >{title}</Text>
            <Text style={styles.descStyle}>
                {desc}
            </Text>
            <Button style={{margin:30, backgroundColor:'white', maxHeight:40}} onClick={onClick}>
                <Text style={{color:"black"}}>Choose</Text>
            </Button>
        </View >
    );
}
const styles = StyleSheet.create({
    bannerCardStyle:{
       
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"transparent",
        borderColor:'white',
        borderWidth:1,
        marginTop:20,
        paddingVertical:20,
  
        paddingTop:60,
        height:250,
        marginVertical:40
    },
    titleStyle:{
        fontSize:23,
        color:'white',
        borderWidth:1,
        borderColor:'white',
        paddingHorizontal:10,
        paddingVertical:2,
        position:'absolute',
        top:-15,
        backgroundColor:'#19181a'
    },
    descStyle:{
        color: "white",
        textAlign:'center'
        
    }
  })
export default BannerCard;