import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Text from '../common/Text';

// import '../../assets/styles/choose-service.less';
import BannerCard from './BannerCard';
// import { useHistory } from 'react-router-dom';
// import {switchService, deleteBookingInfo} from '../../actions/BookingActions';
// import {cleanTimeSlotState} from '../../actions/TimeSlotActions';
// import { useDispatch } from 'react-redux';

function ChooseService() {
  const navigation = useNavigation();
  return (
    <View style={styles.servicePartStyle}>
      <Text style={styles.titleStyle}>CHOOSE YOUR SERVICE</Text>
      
      <View style={styles.bannerCardWrapper}>
        <BannerCard
          onClick={() => {
            // dispatch(deleteBookingInfo());
            // dispatch(cleanTimeSlotState())
            navigation.navigate({name:"Service", params:{type:'self', step:1}});
            // dispatch(switchService("self", () => history.push("/service/self")))
          }}
          title="SELF-MEASURE"
          // img={<Image source={require("./measuring-tape.png")} style={{ width: 85,height:80,resizeMode:"contain" }} />}
          desc="Reduce the cost by measuring the garments adjustments yourself." />

        <BannerCard
          onClick={() => {
            // dispatch(deleteBookingInfo())
            // dispatch(cleanTimeSlotState())
       
            navigation.navigate({name:"Service", params:{type:'prime', step:1}});
            // dispatch(switchService("prime", () => history.push("/service/prime")))
          }}
          title="PREMIUM"
          // img={<Image source={require("./tailor.png")} style={{  width: 85,height:80,resizeMode:"contain", marginBottom: 7, marginTop: 7 }} />}
          desc="Our highly trained tailor visits you for a fitting session." />
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  bannerCardWrapper:{
    flex:1,
    justifyContent:"center",
 
  },
  servicePartStyle: {
    backgroundColor: "#19181a",
    paddingHorizontal: "10%",
    paddingVertical: 50
  },

  titleStyle: {
    fontSize: 25,
    color:'white',
    marginBottom: 40,
    textAlign:'center'
  }
})
export default ChooseService;