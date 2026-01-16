import React,{useEffect,useState} from 'react'; 
import {
    Button,
    Modal,
    Input,
    Tooltip,
    Alert,
    Spin,
    message,
  } from "antd";
  import apiCalls from "../api/apiCalls";
  import CloseIcon from "../assets/images/close-icon.png";

const OTPModal = (props) => {
    const {form,customerData,isShowOTPModal,setIsShowOTPModal,setDisableRequestForm,sendOTPNumber,setValidateOTPSuccess, clientEnquiryData} = props;
    const [counter, setCounter] = useState(0);
    const [otpValue, setOtpValue] = useState(null);
    const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
    const [sendOTPLoader, setSendOTPLoader] = useState(false);
    const [isCounterEnable,setIsCounterEnable] = useState(false);
    const [validateBtnDisable, setValidateBtnDisable] = useState(false);
    const [isDisableOTPInput,setIsDisableOTPInput] = useState(false);
  
  
    useEffect(() => {
      (counter > 0&&isCounterEnable) && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]); // eslint-disable-next-line arrow-body-style

    const handleOTPChange = (e) => {
        setOtpValue(e.currentTarget.value);
      };
  
  const handleSendOTPClose = () => {
      form.setFieldsValue({ customerchoice: null });
      setCounter(0);
      setIsCounterEnable(false);
      //form.setFieldsValue({ customerchoice: null });
      setIsShowOTPModal(false);
      setValidateBtnDisable(false);
      setIsDisableOTPInput(false);
      setOtpValue(null); 
    };
  
    const handleSendOTP = () => {
      setCounter(import.meta.env.VITE_APP_OTP);
      handleOTP(false);
      setValidateBtnDisable(true);
      setIsDisableOTPInput(true);
      setIsCounterEnable(true);
    };
  
    const handleOTP =  (isValue) => {
      setSendOTPLoader(true);
      setSendOTPErrorMsg(false);
      setValidateOTPSuccess(false);
      if (isValue && !otpValue) {
        setSendOTPLoader(false);
        message.destroy();
        message.error({
          content: "Please Enter OTP value",
          className: "custom-msg",
          duration: 2,
        });
        return;
      }
     
      const obj = {
        PolicyNo: customerData?.policyNo,
        EmailId: import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
        MobileNo: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
        OTP: isValue ? otpValue : 0,
        CallType: props?.selectedCallType,
        SubType: props?.selectedSubTypeId,
        Body: '"CustomerName":"vishnu","Purpose":"claim intimation"',
      };
      let response =   apiCalls.getSendOTP(obj);
      response
        .then((val) => {
          if (val?.data?.responseHeader?.issuccess || val?.data?.responseOutput?.[0]?.responseHeader?.issuccess) {
            setSendOTPLoader(false);
            if (otpValue) {
              message.destroy();
              setSendOTPErrorMsg(null);
              message.success({
                content: "Otp Validation successfully",
                className: "custom-msg",
                duration: 3,
              });
              setIsShowOTPModal(false);
              setOtpValue(null);
              setValidateOTPSuccess(true);
              setDisableRequestForm(true);
            }
          } else {
            setSendOTPLoader(false);
            message.destroy();
            message.error({
              content:
                val?.data?.responseBody?.errormessage || val?.data?.responseOutput?.[0]?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
          }
        })
        .catch((err) => {
          setSendOTPLoader(false);
          setSendOTPErrorMsg();
        });
    };
  return (
    <>
     <Modal
        title="OTP Verification"
        open={isShowOTPModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleSendOTPClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        {sendOTPErrorMsg && (
          <Alert
            closable
            type="error"
            description={sendOTPErrorMsg}
            onClose={() => setSendOTPErrorMsg(null)}
            showIcon
          />
        )}
        <Spin spinning={sendOTPLoader}>
          <Input
            type="text"
            className="input-label"
            value={otpValue}
            placeholder="Enter Verification Code"
            maxLength={6}
            disabled={!isDisableOTPInput}
            onChange={(e) => {
              handleOTPChange(e);
            }}
          />
          {counter > 0 && isCounterEnable&&(
            <>
              <p className="time-count">Resend OTP in {counter} sec</p>
            </>
          )}
          {counter <= 0 && !isCounterEnable&&(
            <>
              <p className="resend-otp">
                OTP to be sent{" "}
                 {sendOTPNumber?.includes("@") ? sendOTPNumber : sendOTPNumber?.replace(/.(?=.{4})/g, "x")}
              </p>
            </>
          )}
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleSendOTP()}
              disabled={counter > 0}
            >
              {(!validateBtnDisable && "Send OTP") || "Resend OTP"}
            </Button>
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => {
                handleOTP(true);
              }}
              disabled={!validateBtnDisable}
            >
              Validate
            </Button>
          </div>
        </Spin>
      </Modal>
    </>
    
  )
}

export default OTPModal