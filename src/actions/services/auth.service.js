import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'process.env.REACT_APP_BACKEND_URL';

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // console.log('login',JSON.parse(localStorage.getItem('user')))
        return response.data;
      })
      .catch((rej) => {
        // console.log(rej.response);
        return rej.response;
      });
  }

  loginSnapplify(usercode) {
    return axios
      .post(API_URL + "/sso", {
        usercode,
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // console.log('login',JSON.parse(localStorage.getItem('user')))
        return response.data;
      })
      .catch((rej) => {
        // console.log(rej.response);
        return rej.response;
      });
  }

  updateUserData() {
    return axios
      .get(API_URL + "/login", {
        headers: authHeader(),
      })
      .then((response) => {
        // console.log(response.data)

        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((rej) => {
        // console.log(rej.response);
        return rej.response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  updateUser(goal,currentstatus,heardfrom) {
    return axios
      .post(API_URL + "/updateuserquestions", {
        goal,
        currentstatus,
        heardfrom
      }, {
        headers: authHeader()
      })
      .then((response) => {
       console.log ("updatedd")
        // console.log('login',JSON.parse(localStorage.getItem('user')))
      })
      .catch((rej) => rej.response);
  }

  register(
    username,
    email,
    phonenumber,
    password,
    src,
    coursein,
  ) {
    // console.log('register')
    return axios
      .post(API_URL + "/register", {
        username,
        email,
        password,
        phonenumber,
        src,
        coursein,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // console.log('login',JSON.parse(localStorage.getItem('user')))
        return response.data;
      })
      .catch((rej) => rej.response);
  }

  forgotpassword(email) {
    // console.log('register')
    return axios
      .post(API_URL + "/forgotpasswordgen", {
        email,
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((rej) => rej.response);
  }

  setNewPassword(uid, password) {
    // console.log('register')
    return axios
      .post(API_URL + "/forgotpassword?uid=" + uid, {
        password,
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((rej) => rej.response);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getUserEarningDetails() {
    console.log(API_URL, authHeader());
    return axios
      .get(API_URL + "/coupon/earningdetails", {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((rej) => rej.response);
  }
}

export default new AuthService();
