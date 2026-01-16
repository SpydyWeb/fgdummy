import React, { useState, useContext  } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate, useLocation  } from 'react-router-dom';
import EventContext from '../reducers/EventContext';


const PopupAlert = (props) => {
  const location = useLocation();



  const handleChildEvent_EM = useContext(EventContext);
    const navigate = useNavigate();
  const [modalOpen, setmodalOpen] = useState(true);

  const handleOk =() =>{
    setmodalOpen(false);
    if(location.pathname.includes("/emailuser") && !location.pathname.includes("/emailmanagementview")){
      handleChildEvent_EM();
    }
    //if(props?.isEmailMangentPopupAlert)handleChildEvent_EM();   //if condition added by Naga Raju K -05-04-24
    //handleChildEvent_EM();
    props?.setShowAlert(false);
    if (props?.title?.includes("Request cannot be accepted for DOB change")) {
      return;
  }
    if (props?.alertData?.includes("Claim Apporver and moved to Claims Approver")) {
      navigate("/claimsapprover");
      return;
  }
  if(location?.state?.isClaimsApproverUser &&
    !props?.alertData?.includes("Claim Apporver and moved to Claims Approver")
   ){
     return;
    }
  
  if (props?.alertData?.includes("Ticket Status Updated Successfully")) {
    navigate("/grievanceuser");
    return;
}
     if(props?.getAdvance){
        props?.getAdvance();
      }
      if((props?.title === 'Email Sent Successfully'  ||  props?.title === 'Failed to send Email' || props?.title === 'Query Raised Successfully' || props?.title === 'Request Created Successfully') && location.pathname.includes("/emailmanagementview")){
        navigate(props?.navigate)
      }
      if(props?.isShow){
        navigate(props?.navigate)
      }
  }
  return (
    <>
      <Modal
        title={props?.title}
        centered
        open={modalOpen}
        closeIcon={false}
        footer={null}
      >
        <p>{props?.alertData}</p>
        <div className='text-center modal-validate'>
        <Button type="primary" className="primary-btn" onClick={()=>handleOk()}>
              OK
            </Button>
        </div>
      </Modal>
    </>
  );
};
export default PopupAlert;
