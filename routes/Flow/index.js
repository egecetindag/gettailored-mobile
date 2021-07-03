// import { Result, Steps } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import Service from './ServicesPage'
import AddressPage from '../AddressPage';
// import Layout from '../../components/Common/Layout';
// import {Steps} from 'antd-mobile';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useNavigation } from '@react-navigation/native';
// import Text from '../../components/Common/Text';
// import '../../assets/styles/flow.less';
// import PaymentPage from '../PaymentPage';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
// import SuccessPage from '../ResultPage/SuccessPage';
// import { useAuth0 } from '@auth0/auth0-react';
import Auth0 from 'react-native-auth0';
import { getServiceInputs } from '../../actions/ServiceActions';
// import { switchService } from '../../actions/BookingActions';
// import { Elements } from '@stripe/react-stripe-js';
import { initStripe } from '@stripe/stripe-react-native';
import TimeSlotPage from '../TimeSlotPage';
import Loading from '../../components/common/Loading';
import Layout from '../../components/common/Layout';
import Text from '../../components/common/Text';
import { View,AsyncStorage } from 'react-native';
import jwt_decode from "jwt-decode";
import PaymentPage from '../PaymentPage';
import * as AppAuth from "expo-auth-session";
import moment from 'moment'

const auth0Domain = "https://dev-nebce-qf.eu.auth0.com";
const auth0ClientId = "Z40hKySNWVoHEJsbYv8qiF9AHwjmPBDO"
const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
      <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
    </g>
  </svg>
);

// const stripePromise = loadStripe("pk_test_51I6lrfK9emjoqqZwpkWpv1Qx4ZPhA5RzFrk5xrahOYq7zDgLy0bvmydC9z4aD7FHJ92JkN7QRAh6o7S3n5nfaW4X00hx6vnqgF");

// const { Step } = Steps;

function Flow(props) {
  const navigation = useNavigation();
  const params = props.route.params;
  const dispatch = useDispatch();
  const [isAuthenticated, setAuthenticated] = useState(false);
  // const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  
  const [bookingId, setBookingId] = useState();
  const { loading } = useSelector(state => ({
    loading: state.global.loading,
  }));

  useEffect(() => {
    initStripe({
        publishableKey: "pk_test_51I6lrfK9emjoqqZwpkWpv1Qx4ZPhA5RzFrk5xrahOYq7zDgLy0bvmydC9z4aD7FHJ92JkN7QRAh6o7S3n5nfaW4X00hx6vnqgF",
        merchantIdentifier: 'merchant.identifier',
      });
    // window.scrollTo(0, 0)
    console.log("detectLogin")
    detectLogin();
    if (Number(params.step) !== 1 && Number(params.step) !== 2 && Number(params.step) !== 3 && Number(params.step) !== 4) {
      // history.replace("/service/" + params.type + "/1")
      navigation.navigate({ name: 'Service', params: { type: params.type, step: "1" } })
    }
    if (params.type === 'self') {
      dispatch(getServiceInputs());
    }
  }, [])

  const detectLogin = async () => {

    AsyncStorage.getItem("accessToken").then(accessToken => {
      var decoded = jwt_decode(accessToken);
      if (decoded.exp > moment().unix()) {
        console.log("aaaa")
        setAuthenticated(true);
      } else {
        console.log("bbbb")
        setAuthenticated(false);
      }
    })
  }


  const loginWithRedirect = async () => {
    const redirectUrl = AppAuth.makeRedirectUri({ useProxy: true });

    const discovery = await AppAuth.fetchDiscoveryAsync(auth0Domain);
    const authRequestOptions = {
      usePKCE: true,
      responseType: AppAuth.ResponseType.Code,
      clientId: auth0ClientId,
      redirectUri: redirectUrl,
      prompt: AppAuth.Prompt.Login,
      scopes: ["openid", "profile", "email", "offline_access", "crud:list"],
      extraParams: {
        audience: "esclot-api",
        access_type: "offline",
      },
    };
    const authRequest = new AppAuth.AuthRequest(authRequestOptions);

    const authorizeResult = await authRequest.promptAsync(discovery, {
      useProxy: true,
    });
    console.log("authResult", authorizeResult)
    const tokenResult = await AppAuth.exchangeCodeAsync(
      {
        code: authorizeResult.params.code,
        clientId: auth0ClientId,
        redirectUri: redirectUrl,
        extraParams: {
          code_verifier: authRequest.codeVerifier || "",
        },
      },
      discovery
    );
    console.log("Authorize result", tokenResult);

    if (tokenResult.accessToken) {
      let token = tokenResult.accessToken;
      AsyncStorage.setItem("accessToken", token).then(
        result => {
          console.log("accessTokenSet", result)
         

          setAuthenticated(true)
        }

      )
    }
  }
  
  const next = async (val) => {
    await detectLogin();
    val && setBookingId(val);
    navigation.navigate({ name: 'Service', params: { type: params.type, step: (params.step ? Number(params.step) + 1 : 1) } })
    
    // navigation.navigate("/service/" + params.type + "/" + (params.step ? Number(params.step) + 1 : 1))
    // history.push("/service/" + params.type + "/" + (params.step ? Number(params.step) + 1 : 1))
    // window.scrollTo(0, 0)
  };

  const prev = () => {
    navigation.navigate({ name: 'Service', params: { type: params.type, step: (params.step ? Number(params.step) - 1 : 1) } })

    // navigation.navigate("/service/" + params.type + "/" + (params.step ? Number(params.step) - 1 : 1))
    // history.push("/service/" + params.type + "/" + (params.step ? Number(params.step) - 1 : 1))
    // window.scrollTo(0, 0)
  };
  console.log("login with", isAuthenticated)
    if (!isAuthenticated && (params.step === 2 || params.step === 3 || params.step === 4)) {
  
      loginWithRedirect();
      return null;
    }

  return (
    <>
      {loading && <Loading />}
      <Layout type="small">
        {/* <Service onNext={next} params={props.route.params}/> */}
        <ProgressSteps 
        borderWidth={2}
        topOffset={20}
        completedProgressBarColor="#F7A116"
        completedStepIconColor="#F7A116"
        activeLabelColor="#F7A116"
        labelFontSize={12}
        activeStepIconBorderColor="#F7A116"
        activeStepIconColor="#F7A116"
        activeStepNumColor="white"
        activeStep={Number(params.step) - 1}>

          <ProgressStep viewProps={{ flex: 1 }} scrollable={false} topOffset={10} removeBtnRow={true} label="Service Details">
            {/* <View > */}
            <Service onNext={next} params={props.route.params} />

            {/* </View> */}
          </ProgressStep>
       
          <ProgressStep topOffset={10} removeBtnRow={true} scrollable={false} label="Your Address">
            <View >
              <AddressPage onNext={next} params={props.route.params} />
            </View>
          </ProgressStep>
          <ProgressStep topOffset={10} removeBtnRow={true} scrollable={false} label="Time">
            <View >
              <TimeSlotPage onNext={next} params={props.route.params} onPrev={prev} />
            </View>
          </ProgressStep>
          <ProgressStep topOffset={10} removeBtnRow={true} scrollable={false} label="Payment">
            <View >
              <PaymentPage onNext={next} params={props.route.params} onPrev={prev} />
            </View>
          </ProgressStep>
         
        </ProgressSteps>
        {/* <Steps current={Number(params.step) - 1}>
            <Step title="Service Details" />
            <Step title="Your Address" />
            <Step title="Payment" />
            <Step title="Confirmation" />
          </Steps> */}
        {/* <div className="flow">
          <div className="flow-title">
            <Text size="l" >{params.type === "self" ? "Self-Measure" : "Personal Fitting"} </Text>
            <div style={{ cursor: "pointer" }} onClick={() => {
              if (params.type === 'self') {
                dispatch(switchService('prime', () => history.push('/service/prime/1')));
              } else if (params.type === 'prime') {
                dispatch(switchService('self', () => history.push('/service/self/1')));
              }
            }}>
              {params.step !== '5' && <Text size="xs">Switch to  {params.type === "prime" ? "Self-Measure" : "Personal Fitting"}</Text>}
            </div>
          </div>

       
        </div>

        <div>{steps[Number(params.step) - 1]}</div> */}


      </Layout>
    </>
  )
}

export default Flow;