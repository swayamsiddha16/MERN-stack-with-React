import InfoRow from "./InfoRow"

function InfoList({users,reload,setReload}){
    return (
        <div style={{width:"90vw",marginTop:"4vh",height:"60vh",overflowY:"scroll",display:"flex",flexDirection:"column",alignItems:"center"}}>
            {
                users.map(user=><InfoRow reload={reload} setReload={setReload} user={user}/>)
            }
            </div>
    )
}

export default InfoList;