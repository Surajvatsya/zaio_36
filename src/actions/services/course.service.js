import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

class CourseService {
  getCourseList(query) {
    console.log(`${API_URL}/course${query ? `/query=${query}` : "/"}`);

    return axios
      .get(`${API_URL}/course${query ? `query=${query}` : "/"}`)
      .then((res) => {
        // console.log('cl',res);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej)
        return rej.response;
      });
  }
  postCourse(data) {
    return axios
      .post(API_URL + "/course", data, {
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
  putCourse(data, data1) {
    // console.log(data1)
    return axios
      .put(API_URL + "/course/" + data.get("_id"), data, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log("then", res.data);
        return res.data;
      })
      .catch((rej) => {
        console.log("catch", rej.response);
        return rej.response;
      });
  }
  enrollCourse(courseid) {
    return axios
      .post(
        API_URL + `/dashboard/mycourses/${courseid}`,
        {},
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        // console.log('then',res.data);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response);
        return rej.response;
      });
  }

  getCourses() {
    // console.log(authHeader());
    return axios
      .get(API_URL + "/dashboard/mycourses", {
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
  getCourse(id) {
    // console.log(id)
    return axios
      .get(API_URL + "/course/" + id, {
        headers: authHeader(),
      })
      .then((res) => {
        // console.log('then',res);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response)
        return rej.response;
      });
  }
  deleteCourse(courseid) {
    return axios
      .delete(API_URL + "/course/" + courseid, {
        headers: authHeader(),
      })
      .then((res) => {
        // console.log('then',res);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response)
        return rej.response;
      });
  }

  generateCertificate(courseid) {
    return axios
      .post(
        API_URL + "/dashboard/mycertificates",
        {
          courseid,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log('then',res);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response)
        return rej.response;
      });
  }

  getCertificates(courseid) {
    return axios
      .get(
        API_URL + "/dashboard/mycertificates",
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log('then',res);
        return res.data;
      })
      .catch((rej) => {
        // console.log('catch',rej.response)
        return rej.response;
      });
  }

}

export default new CourseService();
