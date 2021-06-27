import React from 'react';
import { View } from 'react-native';
import Text from '../common/Text';

function PaymentInfo(props) {

  return (
    <View className="payment-info">
      <View className="title">
          
        <Text size="m">Payment Information</Text>
      </View>
    {props.children}
    </View>
    

  );
}

export default PaymentInfo;
