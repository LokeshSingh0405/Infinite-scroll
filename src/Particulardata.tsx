import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import { useNavigate, Navigate }from 'react-router-dom'
import PageNotFound from './PageNotFound';


export default function Particulardata() {

    const location =  useLocation()
   

if(location.state === null) {
    return(
        <>
        <Navigate to="/" replace={true} />
        </>
    )
}

  return (
    <div>{<h4>{location.state.title}</h4>}</div>
  )
}
