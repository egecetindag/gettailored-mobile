import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../common/Text';

function PaymentInfo(props) {

  return (
    <View style={styles.paymentInfo} >
      <View className="title">
          
        <Text size="m">Payment Information</Text>
      </View>
    {props.children}
    </View>
    

  );
}

const styles = StyleSheet.create({
  paymentInfo:{
    paddingTop: 40,
    paddingLeft: "7%",
    paddingBottom: 80,
    paddingRight: 30,
    backgroundColor: "white",
    textShadowRadius: 4,
    textShadowOffset: { width: 4, height: 0 },
    textShadowColor: "rgba(0,0,0 ,0.2)",
  }
});
export default PaymentInfo;
