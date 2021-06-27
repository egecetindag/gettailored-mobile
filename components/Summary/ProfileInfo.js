import React from 'react';
// import { DatePicker, Space } from 'antd';

// import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Text from '../common/Text';
// import '../../assets/styles/summary-components.less';
// import { ServiceLineCart } from '../Service/ServiceLine';
import { useDispatch, useSelector } from 'react-redux';
// import { validateBooking } from '../../actions/BookingActions';
import { TextInput } from 'react-native-gesture-handler';
import { ScrollView, StyleSheet, View } from 'react-native';

// const { RangePicker } = DatePicker;
function ProfileInfo(props) {
    const dispatch = useDispatch();
    const { bookingValidation, bookingValidationError } = useSelector(state => ({
        bookingValidation: state.booking.bookingValidation,
        bookingValidationError: state.booking.bookingValidationError
    }));
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onPostcodeChange = (e, c) => {


    }
 
    return (
        <View style={styles.profileInfo}>
            <View className="title"><Text style={{ fontSize: 18, marginBottom:30 }}>Shipping Information</Text></View>
            <View>
                <View style={styles.label}><Text>* Email</Text></View>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(value) => {props.setFieldValue('email', value); props.onChange('email', value, props.values)}}
                    // onBlur={props.handleBlur('email')}
                    value={props.values.email}
                />
            </View>
            <View>
                <View style={styles.label}><Text>* Mobile Number</Text></View>
                <TextInput
                    placeholder="+44**********"
                    keyboardType="numbers-and-punctuation"
                    style={styles.inputStyle}
                    onChangeText={(value) => {props.setFieldValue('mobileNumber', value); props.onChange('mobileNumber', value, props.values)}}
                    // onBlur={props.handleBlur('mobileNumber')}
                    value={props.values.mobileNumber}
                />
            </View>
            <View>
                <View style={styles.label}><Text>* Address</Text></View>
                <TextInput
                
                    style={styles.inputStyle}
                    onChangeText={(value) => {props.setFieldValue('address', value); props.onChange('address', value, props.values)}}
                    // onBlur={props.handleBlur('addre.ss')}
                    value={props.values.address}
                />
            </View>
            <View>
                <View style={styles.label}><Text>* Postcode</Text></View>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(value)=>{props.setFieldValue('postcode', value); props.onChange('postcode', value, props.values)}}
                    // onBlur={props.handleBlur('postcode')}
                    value={props.values.postcode}
                />
            </View>
            {/* <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[{ required: true, message: 'Please input your mobile!' }]}
            >
                <Input placeholder="+44**********" />
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{ span: 10 }}
                label="Postcode"
                name="postcode"
                hasFeedback
                help={bookingValidationError}
                rules={[{ required: true, message: 'Please input your postcode!' }]}
                validateStatus={bookingValidation}
            >
                <Input onBlur={onPostcodeChange} />
            </Form.Item> */}
            {props.children}
        </View>

    );
}

export default ProfileInfo;
const styles = StyleSheet.create({
    label:{
        marginBottom:15
    },
    profileInfo: {
        // box-shadow:/ rgb(23 43 77 / 20%) 0px 1px 1px, rgb(23 43 77 / 20%) 0px 0px 1px;
        padding: 40,
        textAlign: "left",
        marginBottom: 40,
        paddingRight: 30,
    },
    inputStyle: {
        margin: 0,
        padding: 0,
        paddingVertical: 4,
        paddingHorizontal: 11,
        color: "rgba(0, 0, 0, 0.85)",
        fontSize: 14,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d9d9d9",
        borderRadius: 2,
        marginBottom:30
    }

})