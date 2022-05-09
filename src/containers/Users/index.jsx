import React, { useEffect, useState } from "react";
import adminService from "../../actions/services/admin.service";
import Modal from "react-modal";
import styles from "../../styles/modal.scss";
import axios from "axios";
import TwoColumnDisplayItem from "../../components/TwoColumnDisplayItem/TwoColumnDisplayItem";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function Users(props) {
  const [users, setUsers] = useState([]);
  const [note, setNote] = useState("");
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [cid, setCid] = useState("");

  const onChange = (id, note) => {
    setmodalIsOpen(true);
    setCid(id);
    setNote(note);
  };

  const closeModal = () => {
    setmodalIsOpen(false);
  };

  const handleChange = () => {
    setmodalIsOpen(false);
  };

  const handleNote = (e) => {
    console.log(e);
  };

  const onSave = () => {
    axios
      .post(API_URL + "/dashboard/addusernote", {
        email: cid,
        note: note,
      })
      .then((res) => {
        console.log(res.data);
        setmodalIsOpen(false);
      })
      .catch((rej) => {
        alert("try again");
        console.log(rej.data);
      });
  };

  useEffect(() => {
    if (props.paid) {
      adminService
        .getPaidUsers()
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setUsers(res.data.data);
          } else {
            alert("Catch fetch Users");
          }
        })
        .catch((rej) => {
          alert("something went wrong");
          console.log(rej.response);
        });
    } else {
      adminService
        .getUsers()
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setUsers(res.data.data);
          } else {
            alert("Catch fetch Users");
          }
        })
        .catch((rej) => {
          alert("something went wrong");
          console.log(rej.response);
        });
    }
  }, [props]);
  return (
    <section className={`w-100 ml-0 ml-md-5 p-2`}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="d-flex"
        contentLabel="Download Syllabus"
      >
        <div className={`w-50`}>Add note</div>
        <div className={styles.modalcontent}>
          <div className="form-group">
            <label htmlFor="username">Add note</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>
          <div className={styles.enrollnow2} onClick={onSave}>
            Save
          </div>
        </div>
      </Modal>
      <h1>Users Registered [{users.length - 15}]</h1>

      <div className={``}>
        <TwoColumnDisplayItem users={users} paid={props.paid} setmodalIsOpen={setmodalIsOpen} setCid={setCid} />
      </div>
    </section>
  );
}

export default Users;
