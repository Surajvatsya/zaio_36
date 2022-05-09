import React from "react";

const TwoColumnDisplayItem = ({ users, paid, setmodalIsOpen, setCid }) => {
  console.log(users);
  const onNoteClick = (user) => {
    setmodalIsOpen(true)
    setCid(user._id)
  }
  const handleFilterActive = () => {

  }
  return (
    <table className="table table-striped">
      <thead>
        
            {paid ? (
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Learning path</th>
                    <th scope="col" onClick={handleFilterActive}>Active</th>
                    <th scope="col">Videos watched</th>
                    <th scope="col">Latest activity</th>
                    <th scope="col">Certificates</th>
                </tr>
            ) : (
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone number</th>
                    {/* <th scope="col">Note</th> */}
                </tr>
            )}
        
        
      </thead>
      <tbody>

          {
              paid ? 
              users.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.learningpathname}</td>
                  <td>{user.active ? "Yes" : "No"}</td>
                  <td>{user.numberofvideoswatched}</td>
                  <td>{user.latestactivitydate}</td>
                  <td>{
                          user.latestcertificate === "None" ? "None" : 
                          (<a className="badge badge-pill badge-primary" href={user.latestcertificate?.certificateurl} target="_blank">
                              {user.latestcertificate.coursename}
                          </a>)
                      }
                  </td>
                </tr>
              ))
              :
              users.map((user) => (
                <tr>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phonenumber}</td>
                  {/* <td onClick={() => onNoteClick(user)}>{user.note}</td> */}
                 
                </tr>
              ))
          }
        
      </tbody>
    </table>
  );
};

export default TwoColumnDisplayItem;
