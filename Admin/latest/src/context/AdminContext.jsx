import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext"; 
import { useEffect } from "react";
import axios from "axios";

export const adminDataContext = createContext();

function AdminContext({ children }) {
 const [adminData, setAdminData] = useState(null);
const [loading, setLoading] = useState(true);

  const { serverUrl } = useContext(authDataContext);

 const getAdmin = async () => {

  try {

    setLoading(true);

    let result = await axios.get(
      serverUrl + "/api/user/getadmin",
      {
        withCredentials: true
      }
    );

    setAdminData(result.data);

  } catch (error) {

    setAdminData(null);
    console.log(error);

  } finally {

    setLoading(false);
  }
};



  useEffect(()=>{
    getAdmin()
  },[])

  let value = {
  adminData,
  setAdminData,
  getAdmin,
  loading
}

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;