
import fetch from 'node-fetch';
import { AsyncStorage } from 'react-native';
function timeoutPromise(ms, promise) {

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('promise timeout'));
      
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
}



 const request = (url, options) => {
  return async (dispatch, getState) => {

    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const req = {
        method: options.method || 'POST',
        headers: {
          'Content-Type': 'application/json'
           
        },
      };
      if (accessToken) {
        req.headers.Authorization = 'Bearer ' + accessToken;
      }

      // const urlLine = process.env.REACT_APP_BACKEND_URL + url;
      const urlLine = "https://app-dev.gettailored.uk" + url;

      if (options.method !== 'GET') {
        req.body = JSON.stringify(options.data);
      }
      const response = await timeoutPromise(45000, fetch(urlLine, req));
      let responseJson = '';
      let responseBlob = '';
      if (parseInt(response.status / 100) === 2) {
        if (options.blob) {
          responseBlob = await response.blob();
          return responseBlob;
        }
     
       
        let resp = await response.text();
        if (!resp) {
          return {success: true, message: ''}
        }
        
        responseJson = JSON.parse(resp)


        if (Array.isArray(responseJson)) {
          return { success: true, data: responseJson }
        }
        return { success: true, ...responseJson };
      }

      if (options.blob) {
        responseBlob = await response.blob();
        return responseBlob;
      }
      responseJson = await response.json();
      return { ...responseJson, error: responseJson.error || '' };

    } catch (e) {
      return { error: e.message || "error" };
    }
  }
};



export default request;
