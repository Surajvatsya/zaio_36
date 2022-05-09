import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

class CourseService {
  makePayment(data) {
    return axios
      .post(API_URL + "/payment/addnewcardPA", data, {
        headers: authHeader(),
      })
      .then((res) => {
        // console.log('then',res.data);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response);
        return { error: rej.response.data.error };
      });
  }
  checkPaymentStatus(data) {
    return axios
      .get(API_URL + "/payment/storecard", {
        headers: authHeader(),
      })
      .then((res) => {
        // console.log('then',res.data);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response);
        return rej.response;
      });
  }
  unsubscribe(data) {
    return axios
      .get(API_URL + "/payment/unsubscribe", {
        headers: authHeader(),
      })
      .then((res) => {
        // console.log('then',res.data);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response);
        return rej.response;
      });
  }
  verifyCoupon(data) {
    return axios
      .post(API_URL + "/coupon/code", data, {
        headers: authHeader(),
      })
      .then((res) => {

        console.log("then hi", res.data);
        return res.data;
      })
      .catch((rej) => {
        console.log("catch", rej.response);
        return { error: rej.response.data.error };
      });
  }

  verifyURLCoupon(data) {
    return axios
      .post(API_URL + "/coupon/urlcode", data)
      .then((res) => {
        console.log("then hi", res.data);
        return res.data;
      })
      .catch((rej) => {
        console.log("catch", rej.response);
        return { error: rej.response.data.error };
      });
  }

  getcards() {
    return axios
      .get(API_URL + "/payment/availablecards", {
        headers: authHeader(),
      })
      .then((res) => {
        console.log("then", res.data);
        return res.data;
      })
      .catch((rej) => {
        console.log("catch", rej.response);
        return { error: rej.response.data.error };
      });
  }

  enrollFreeCourse(data) {
    return axios
      .post(
        API_URL + "/payment/freecourse",
        data,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("then", res.data);
        return res.data;
      })
      .catch((rej) => {
        console.log("catch", rej.response);
        return { error: rej.response.data.error };
      });
  }

  enrollFreeLearningPath(learningpathid) {
    return axios
      .post(
        API_URL + "/payment/freelearningpath",
        {
          learningpathid,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("then", res.data);
        return res.data;
      })
      .catch((rej) => {
        console.log("catch", rej.response);
        return { error: rej.response.data.error };
      });
  }
  oneClickPayment(data) {
    
    return axios
      .post(API_URL + "/payment/recurpayment", data, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log("then", res.data);
        return res.data;
      })
      .catch((rej) => {
        console.log("catch", rej.response);
        return { error: rej.response.data.error };
      });
  }
}

export default new CourseService();
