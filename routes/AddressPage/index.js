import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
// import { Form } from 'antd';
// import '../../assets/styles/service-summary.less';
// import CartInfo from '../../components/Summary/CartInfo';
import ProfileInfo from '../../components/Summary/ProfileInfo';
import StepsNavigationFooter from '../../components/Navigation/Footer';
import { recordBookingInformation, createBooking } from '../../actions/BookingActions';
import { setErrorMsg } from '../../actions/GlobalActions';
import { validateBooking } from '../../actions/BookingActions';
import MobileCartInfo from '../../components/Summary/MobileCartInfo';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
function AddressPage(props) {
	const [total, setTotal] = useState(0);
	const [postcodeInterval, setPostcodeInterval] = useState(null);
	const dispatch = useDispatch();
	// const [form] = Form.useForm();

	const { bookingValidation,
		bookingLoading,
		cartType,
		tempBookingID,
		successfullyCreatedID, info, cart } = useSelector(state => ({
			info: state.booking.info,
			cart: state.booking.cart,
			cartType: state.booking.cartType,
			bookingCreationFailedMsg: state.booking.bookingCreationFailedMsg,
			bookingValidation: state.booking.bookingValidation,
			bookingLoading: state.booking.bookingLoading,
			successfullyCreatedID: state.booking.successfullyCreatedID,
			tempBookingID: state.booking.tempBookingID,
		}));

	const createBookingCB = () => {
		console.log("createe2")
		if (bookingLoading) {
			return
		}
		let req = {
			name: info.email,
			address: info.address,
			postcode: info.postcode,
			mobile_number: info.mobileNumber,
			booking_class: cartType,
			services: cart,
		}
		console.log("createee", req)
		if (successfullyCreatedID > 0) {
			req.id = successfullyCreatedID;
		}
		dispatch(createBooking(req, props.onNext))
	}

	const onFinish = (values) => {
		if (tempBookingID === 0 || tempBookingID === -1) {
			if (!bookingLoading) {
				createBookingCB();
			}
		}
	}

	const layout = {
		labelCol: { span: 24 },
		wrapperCol: { span: 16 },
	};

	useEffect(() => {
		console.log("cartt", cart)
		if (cart && cart.length < 1) {
			props.onPrev();
		}
	}, [])

	useEffect(() => {
		let total = cart.reduce((a, { cost }) => a + cost, 0);
		setTotal(total);
	}, [cart])

	const onChange = (changed, value, values) => {
		console.log("onChangee", changed, value,values)
		if (changed === "postcode") {
			if (postcodeInterval !== null) {
				clearTimeout(postcodeInterval);
			}
			setPostcodeInterval(setTimeout(() => {
				
				dispatch(validateBooking(value, true))
			}, 2000))
		}
		let services = [];
		cart.map(item => services.push({ code: item.code }));
		dispatch(recordBookingInformation({...values, [changed]:value}));
	}

	return (
		<View className="service-summary">
			<ScrollView 
      className="summary-wrapper">
				<View><MobileCartInfo total={total} cart={cart} /></View>
				<View className="summary-col">
					
					<Formik
						onSubmit={onFinish}
						{...layout}
						name="basic"
						initialValues={info || {}}
						// validateOnChange={onChange}
						>
						{({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
							<ProfileInfo onChange={onChange} setFieldValue={setFieldValue} handleChange={handleChange} values={values} handleBlur={handleBlur} >
								<StepsNavigationFooter title="Proceed"   onNext={handleSubmit} onPrev={props.onPrev} />
							</ProfileInfo>
						)}
					</Formik>
				</View>

			</ScrollView>

		</View>
	);
}

export default AddressPage;
