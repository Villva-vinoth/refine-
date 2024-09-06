import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const usePriority = () => {
  const createRole = ["admin", "manager"];
  const editRole = ["admin"];
  const deleteRole = ["admin"];

  // const { role } = useAuth();

  const role = localStorage.getItem('role') 

  // if(!role){
  //   console.log("undefined r",role)
  // }

  // const [result,setResult] = useState({
  //       canCreate: false,
  //       canEdit:false,
  //       canDelete:false
  // })

  // useEffect(()=>{


  //     setResult({
  const result = {
    canCreate: role ? createRole.includes(role) : false,
    canEdit: role  ? editRole.includes(role) : false,
    canDelete: role ? deleteRole.includes(role) : false,
  };
  //     })
     
  // },[role])



  // console.log(result,role)

  return result;
};
