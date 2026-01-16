import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";
import { secureStorage } from './secureStorage';

const ErrorPage = () => {
const navigate = useNavigate();
const handleBack =()=>{
  secureStorage.remove('token');
  secureStorage.remove("isLoggedIn");
  secureStorage.remove('sessionStartTime');
  navigate("/login");
}
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<div className="contact-details-btn"><Button type="primary" className='primary-btn ErrorPage-BackBtn' onClick={()=> handleBack()}>Back Home</Button></div>}
  />
  )
}

export default ErrorPage