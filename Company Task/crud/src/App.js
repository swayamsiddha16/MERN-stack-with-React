import { useState, useEffect } from "react";
import CreateEntry from "./component/CreateEntry";
import InfoList from "./component/InfoList";
import axios from "axios";
function App() {
  const [reload,setReload] = useState(false);
  const [userData,setUserData] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const {data} = await axios.get("http://localhost:8081/data")
      console.log(data)
      setUserData(data)
    }
    fetchData();
  },[reload])  
  
  
  return (
    <div style={{width:"100vw",display:"flex",alignItems:"center" , flexDirection:"column"}}>
      <CreateEntry reload={reload} setReload={setReload}/>
      <InfoList users={userData} reload={reload} setReload={setReload}/>
    </div>
  );
}

export default App;
