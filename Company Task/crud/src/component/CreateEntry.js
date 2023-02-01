import { useState, useEffect } from "react";
import axios from "axios";

function CreateEntry({reload,setReload}) {
  const initialValues = { name: "", email: "", address: "",phone:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isValid,setIsValid] = useState(true);
  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if(!isValid) return ;
    await axios.post("http://localhost:8081/data",formValues)
    setFormValues(initialValues)
    setReload(!reload)
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\. [^\s@]{2,}$/;
    setIsValid(true);
    if (!values.name) {
      errors.name = "Username is required";
      setIsValid(false);
    }
    // if (!values.email) {
    //   errors.email = "Email is required";
    //   setIsValid(false);
    // } else if (!regex.test(values.email)) {
    //   errors.email = "this is not a valid Email";
    //   setIsValid(false);
    // }
    if (!values.address) {
      errors.address = "Address is required";
      setIsValid(false);
    } 
    if (!values.phone) {
      errors.phone = "Phone Number is required";
      setIsValid(false);
    } else if(values.phone.length<10){
      errors.phone = "Invalid Phone number"
      setIsValid(false);
    }
    return errors;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "20vw",
        height: "max-content",
        backgroundColor: "rgba(235,172,38,0.5)",
        border: "1px gray solid",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          marginBottom: "auto",
          width: "20vw",
          borderBottom: "2px solid gray",
          backgroundColor: "rgb(235, 172, 38)",
        }}
      >
        <h3 style={{ color: "white", textAlign: "center" }}>Create Entry</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20vw",
        }}
      >
        <form style={{ width: "100%", padding: "1vh" }} onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formValues.name}
              onChange={handleChange}
              style={{ borderRadius: "5px",height:"3vh" }}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.name}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Contact Numeber"
              value={formValues.phone}
              onChange={handleChange}
              style={{ borderRadius: "5px",height:"3vh" }}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.phone}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              style={{ borderRadius: "5px",height:"3vh" }}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.email}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formValues.address}
              onChange={handleChange}
              style={{ borderRadius: "5px",height:"3vh" }}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.address}</p>
          <div>
            <button style={{width:"5vw",height:"4vh" , borderRadius:"5px" ,backgroundColor:"rgb(50,100,200)",color:"white"}}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEntry;
