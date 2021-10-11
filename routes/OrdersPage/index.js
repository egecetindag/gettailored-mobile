import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Modal, Table, Popover } from 'antd';
import Text from '../../components/common/Text';
import moment from 'moment';
import SummaryCartLine from '../../components/Summary/SummaryCartLine';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/common/Layout';
import { getBookings } from '../../actions/BookingActions';
import PaymentPage from '../PaymentPage';

function Orders(prop) {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState({});
    const [showServices, setShowServices] = useState([]);
    const { services, bookings } = useSelector(state => ({
        services: state.service.services,
        bookings: state.booking.bookings,
    }));
    // const findService = (code) =>{
    //     let found = {};
    //     services && services.map((category)=>{
    //         category.services && category.services.map((s)=>{
    //             if(s.code === code){
    //                 found = s;
    //                 found["category"] = category.name;
    //             }
    //         })
    //     })
    //     return found;
    // }
    const renderRow = (datum) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...styles.row, width: "18%", backgroundColor: "#f0f0f0" }}><Text>{datum.id}</Text></View>
                <View style={{ ...styles.row, width: "32%" }}><Text>{moment(datum.pickup_date).format('DD/MM/YYYY')} - {datum.pickup_interval}</Text></View>
                <View style={{ ...styles.row, width: "32%", backgroundColor: "#f0f0f0" }}><Text>{moment(datum.delivery_date).format('DD/MM/YYYY')} - {datum.delivery_interval}</Text></View>
                <TouchableOpacity onPress={() => { setVisible(true); setShowServices(datum.services) }} style={{ ...styles.row, width: "18%" }}><Text style={{ color: "#F7A116", textDecorationLine: "underline" }}>See Orders</Text></TouchableOpacity>
            </View>
        );
    }
    useEffect(() => {
        dispatch(getBookings())
    }, [])
    const columns = [
        {
            title: 'Order #',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Pickup Date',
            key: 'pickupDate',
            render: (props) => <View>{moment(props.pickup_date).format('DD/MM/YYYY')} - {props.pickup_interval}</View>
        },
        {
            title: 'Delivery Date',
            key: 'deliveryDate',
            render: (props) => <View>{moment(props.delivery_date).format('DD/MM/YYYY')} - {props.delivery_interval} </View>
        },
        {
            title: 'Action',
            key: 'action',
            render: (props, k, i) => (
                // <Popover
                //     getPopupContainer={() => document.querySelector(".ant-modal")}
                //     content={props.services.map((s) => <SummaryCartLine {...s} />)}
                //     trigger="click"
                //     visible={visible[i]}
                //     onVisibleChange={(a) => setVisible({ [i]: a })}
                // >
                <Text>Order List</Text>
                // </Popover>

            ),
        },
    ];
    console.log("aaaa", showServices)
    return (

        <Layout type="small">
            <ScrollView style={styles.orders}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ ...styles.rowHeader, width: "18%" }}><Text>Order</Text></View>
                    <View style={{ ...styles.rowHeader, width: "32%" }}><Text>Pickup Date</Text></View>
                    <View style={{ ...styles.rowHeader, width: "32%" }}><Text>Delivery Date</Text></View>
                    <View style={{ ...styles.rowHeader, width: "18%" }}><Text>Action</Text></View>
                </View>
                {
                    bookings.map((booking) => { // This will render a row for each data element.
                        return renderRow(booking);
                    })
                }
                {/* <Table 
             rowKey={record => record.id} 
            dataSource={bookings} columns={columns} /> */}
            </ScrollView>
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={() => {

                    setVisible(!visible);
                }}
            >

                <View style={styles.modalTitle}><Text style={{fontSize:16}}>My Orders</Text>
                <TouchableOpacity onPress={()=>setVisible(false)}><Text style={{fontSize:20, paddingVertical:5, paddingHorizontal:15}}>X</Text></TouchableOpacity></View>
                {showServices&& showServices.map((s) => <SummaryCartLine {...s} />)}

            </Modal>
        </Layout>
    );
}

export default Orders;


const styles = StyleSheet.create({
    modalTitle:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:30,
        paddingRight:15,
     backgroundColor:"#f0f0f0",
        paddingVertical:20
    },
    rowHeader: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 5,
        textAlign: "center",
        borderBottomColor: "grey",

        paddingVertical: 25,
        justifyContent: "center", alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    row: {

        alignSelf: "stretch",
        paddingHorizontal: 5,
        paddingVertical: 15,
        textAlign: "center",
        borderBottomColor: "#b9b9b9",
        borderBottomWidth: 1,
        justifyContent: "center", alignItems: "center"
    },
    orders: {
        flex: 1,

    }
})