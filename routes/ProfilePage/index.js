





import React, { useEffect, useState } from 'react';
import {AsyncStorage} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { Modal, Table, Popover } from 'antd';
import Text from '../../components/common/Text';
import moment from 'moment';
import SummaryCartLine from '../../components/Summary/SummaryCartLine';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Layout from '../../components/common/Layout';
import { getBookings } from '../../actions/BookingActions';
import PaymentPage from '../PaymentPage';
import jwt_decode from 'jwt-decode';
import {useAuth0, useuth0} from '../../network/auth0';


function ProfilePage(prop) {
    // const [user, setUser] = useState({});
    const {user} = useAuth0();
if(!user){
    return null;
}
    return (

        <Layout type="small">
                <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <View className="profile-avatar">
                        <Image  style={{width:100, height:100, borderRadius:50, marginTop:50}} source={{uri:user.picture}} />
                        </View>
                    <View style={styles.profileBody}>
                    
                        <View><Text>Name: {user.nickname}</Text></View>
                       
                        <View><Text>Email: &nbsp;{user["http://gettailored.uk/claims/user_info"]}</Text></View>
                    </View>
                </View>
        </Layout>
    );
}

export default ProfilePage;


const styles = StyleSheet.create({
    profileBody:{
        padding: 20,
        borderWidth:1,
        borderColor:"#e4e4e4",
        margin: 20,
        width: "80%"
    }
})