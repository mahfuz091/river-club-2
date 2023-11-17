import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivetRoute = ({children}) => {
   
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        return children
    }
    return <Navigate to="/login"></Navigate>
}

export default PrivetRoute