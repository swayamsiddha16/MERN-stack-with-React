import axios from "axios";
import { useState } from "react";

function InfoRow({ user ,reload,setReload}) {
  const [enableEditing, setEditing] = useState(false);
  const initialValues = { ...user };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const onSubmitHandler = async () => {
    await axios.put(`http://localhost:8081/data/${user._id}`, formValues);
    setEditing(false);
    setReload(!reload);
  };
  const onDeleteHandler = async()=>{
    await axios.delete(`http://localhost:8081/data/${user._id}`)
    setReload(!reload);
  }
  return (
    <div
      style={{
        width: "70vw",
        fontSize: "20px",
        height: "7vh",
        borderRadius: "10px",
        border: "1px #777 solid",
        display: "flex",
        marginTop: "2vh",
        backgroundColor: "rgba(50,230,50,0.8)",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontSize: "20px",
          width: "70%",
          height: "7vh",
        }}
      >
        {!enableEditing ? (
          <>
            <p>
              <b style={{ color: "white" }}> {user.name} </b>
            </p>
            <p>
              <i> {user.email}</i>
            </p>
            <p>
              <i> {user.phone}</i>
            </p>
            <p>{user.address}</p>
          </>
        ) : (
          <>
            <form onSubmit={onSubmitHandler}>
              <input
                value={formValues.name}
                name="name"
                style={{ height: "4vh", borderRadius: "5px" }}
                onChange={handleChange}
              />{" "}
              <input
                name="email"
                value={formValues.email}
                style={{ height: "4vh", borderRadius: "5px" }}
                onChange={handleChange}
              />{" "}
              <input
                name="phone"
                value={formValues.phone}
                style={{ height: "4vh", borderRadius: "5px" }}
                onChange={handleChange}
              />{" "}
              <input
                name="address"
                value={formValues.address}
                style={{ height: "4vh", borderRadius: "5px" }}
                onChange={handleChange}
              />
            </form>
          </>
        )}
      </div>
      {!enableEditing ? (
        <button
          style={{
            marginLeft: "auto",
            marginRight: "3vw",
            width: "3vw",
            height: "4vh",
            borderRadius: "5px",
            backgroundColor: "yellow",
          }}
          onClick={() => setEditing(!enableEditing)}
        >
          Edit
        </button>
      ) : (
        <button
          style={{
            marginLeft: "auto",
            marginRight: "3vw",
            width: "3vw",
            height: "4vh",
            borderRadius: "5px",
            backgroundColor: "yellow",
          }}
          onClick={onSubmitHandler}
        >
          Save
        </button>
      )}
      {!enableEditing ? (
        <button
          style={{
            marginRight: "3vw",
            width: "3vw",
            height: "4vh",
            borderRadius: "5px",
            backgroundColor: "coral",
          }}
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      ) : (
        <button
          style={{
            marginRight: "3vw",
            width: "3vw",
            height: "4vh",
            borderRadius: "5px",
            backgroundColor: "purple",
          }}
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default InfoRow;
