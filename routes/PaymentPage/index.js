import React, { useState, useEffect } from 'react';
// import '../../assets/styles/payment-page.less';
import StepsNavigationFooter from '../../components/Navigation/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent, deleteBookingInfo } from '../../actions/BookingActions';
import { setErrorMsg, setLoading } from '../../actions/GlobalActions';
import CartInfo from '../../components/Summary/CartInfo';
import PaymentInfo from '../../components/Summary/PaymentInfo';
import MobileCartInfo from '../../components/Summary/MobileCartInfo';
import Text from '../../components/common/Text';
import { CardField, useStripe, StripeProvider } from '@stripe/stripe-react-native';

// import {CardElement} from '@stripe/react-stripe-js';
// import {useElements, useStripe} from '@stripe/react-stripe-js';
import { deleteTimeSlots } from '../../actions/TimeSlotActions';
import { View, StyleSheet } from 'react-native';

function PaymentScreen() {
    const { confirmPayment } = useStripe();

    return (
        <CardField
            postalCodeEnabled={true}
            placeholder={{
                number: '4242 4242 4242 4242',
            }}
            cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
            }}
            style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
                console.log('focusField', focusedField);
            }}
        />
    );
}

function PaymentPage(props) {
    const dispatch = useDispatch();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const { cart, info,
        successfullyCreatedID,
        stripeTravelClientSecret,
        stripeServiceClientSecret,
        loadingStripeClientSecret } = useSelector(state => ({
            successfullyCreatedID: state.booking.successfullyCreatedID,
            info: state.booking.info,
            cart: state.booking.cart,
            loadingStripeClientSecret: state.booking.loadingStripeClientSecret,
            stripeTravelClientSecret: state.booking.stripeTravelClientSecret,
            stripeServiceClientSecret: state.booking.stripeServiceClientSecret
        }));

    const getPaymentIntent = () => {
        dispatch(createPaymentIntent(successfullyCreatedID))
    }

    useEffect(() => {
        if (!successfullyCreatedID) {
            // props.onPrev();
        }
        if (successfullyCreatedID > 0) {
            getPaymentIntent();
        }
    }, [])

    useEffect(() => {
        let total = cart.reduce((a, { cost }) => a + cost, 0);
        setTotal(total);
    }, [cart])

    // const elements = useElements();
    // const stripe = useStripe();

    //   history.push('/service/' + type + '/4/error');
    const pay = async () => {
        if (!stripe || !elements) {
            return
        }
        if (!stripeTravelClientSecret || !stripeServiceClientSecret) {
            return
        }

        dispatch(setLoading(true));
        const travelPayload = await stripe.confirmCardPayment(stripeTravelClientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (travelPayload.error) {
            dispatch(setLoading(false));
            dispatch(setErrorMsg(`Payment failed ${travelPayload.error.message}`))
            setError(`Payment failed ${travelPayload.error.message}`);
            return;
        }
        const servicePayload = await stripe.confirmCardPayment(stripeServiceClientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (servicePayload.error) {
            dispatch(setLoading(false));
            setError(`Payment failed ${servicePayload.error.message}`);
            dispatch(setErrorMsg(`Payment failed ${servicePayload.error.message}`))
            return;
        } else {
            dispatch(setLoading(false));
            setError(null);
            setSucceeded(true);
            props.onNext(successfullyCreatedID)
            dispatch(deleteBookingInfo())
            dispatch(deleteTimeSlots("deliveryTimeslots"))
            dispatch(deleteTimeSlots("pickupTimeslots"))
        }
    }
    return (

        <View className="payment-page">
             <View><MobileCartInfo total={total} cart={cart} /></View>
            <View className="summary-wrapper">
                <View className="summary-col">
                    {/* <PaymentScreen/> */}
                    <PaymentInfo>
                        {/* <StripeProvider> */}
                            <PaymentScreen />
                        {/* </StripeProvider> */}
                        {/* <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                        color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        /> */}
                        {/* Show any error that happens when processing the payment */}
                        {error && (
                            <View className="card-error" role="alert">
                                {error}
                            </View>
                        )}
                        {/* Show a success message upon completion */}
                        <Text style={succeeded ? styles.resultMessage : {...styles.resultMessageHidden, display:"none"}}>
                            Payment succeeded, see the result in your
                            <Text
                                href={`https://dashboard.stripe.com/test/payments`}
                            >
                                {" "}
                            Stripe dashboard.
                            Refresh the page to pay again.
                            </Text>
                        </Text>

                        {stripeTravelClientSecret && stripeServiceClientSecret &&  <StepsNavigationFooter title="Pay Now" onNext={() => pay()} onPrev={props.onPrev} />}
                    </PaymentInfo>
                </View>
               

            </View>

        </View>
    );
}

export default PaymentPage;


const styles = StyleSheet.create({
    resultMessage:{

    }

});