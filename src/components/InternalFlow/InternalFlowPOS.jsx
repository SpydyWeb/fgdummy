import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spin, Modal, Form, Checkbox, Button, message } from 'antd';
import ContactDetails from '../CallTypes/ContactDetails';
import TextArea from 'antd/es/input/TextArea';

const InternalFlowPOS = (props) => {
  const loginInfo = useSelector((state) => state);
  const {selectedSubType, customerData,details,customerPortalForm,setSelectedSubType,selectedSubTypeId,cursorPortalLU} = props;
  const [isInternalValue, setIsInternalValue] = useState(false);
  const [raiseRequirementList, setRaiseRequirementList] = useState([]);
  const [showInternalButton, setShowInternalButton] = useState(false);
  const [form] = Form.useForm();

  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [RaiseRequirement,setRaiseRequirement]=useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");


  useEffect(() => {
    // Example condition: user must be logged in and some specific state value should be true
    if (loginInfo.isLoggedIn) {
      setShowInternalButton(true);
    }
  }, [loginInfo, props.someSpecificCondition]);

  const getInternalPopup = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    setIsInternalValue(true);

    if (props?.interlRequirementTagValue?.length > 0) {
      setRaiseRequirementList(props.interlRequirementTagValue);
      setRequirementLoader(false);
    } else {
      setRequirementLoader(false);
      message.error({
        content: "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const setInternalReqData = () => {
     props.selectedList?.forEach(element => {
       if(element.tagName === 'InternalRequirementValue'){
           
            if(element.tagValue.length > 1){
             setInternalFlowRequirements(props.interlRequirementTagValue1);
           }else{
             setInternalFlowRequirements(props.interlRequirementTagValue1);
           }
       };
      });
 }




 const getRaiseRequirements = () => {
  setRaiseRequirementOpen(true);
  setRequirementLoader(true);
  
  if (props.selectedSubType === 'representcheque') {
      const alreadyExists = props.interlRequirementTagValue1.some(item => item.mstDesc === 'Coordinating with bank');
      if (!alreadyExists) {
          props.interlRequirementTagValue1.push({ MstCategory: 'INTL_REQMNT', mstDesc: 'Coordinating with bank', mstID: 4 });
      }
  }

  if (props.interlRequirementTagValue1.length > 0) {
      setRaiseRequerimentList(props.interlRequirementTagValue1);
      setRequirementLoader(false);
  } else {
      setRequirementLoader(false);
      message.error({
          content: "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
      });
  }
};


  const getInternal = () => {
    const values = form.getFieldsValue();
    ContactDetails.POSActionsOnContactDetails(values, "INTERNAL");
  };

  const handleRequirementSubmit = () => {
    setRequirementLoader(true);
     let list = raiseRequerimentList
    ?.filter((e) => e.status === true)
    ?.map((e) => e.mstID);
    props.getInternal(list);
   
  };

  

  const requirementDescription = (item) => {
    // Return the requirement description logic
    return item.mstDesc;
  };
  return (
    <>

                  <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                  disabled={props?.isDisableBtn}
                >
                  Internal  Requirement
                </Button>
             
     
      <Modal
        title="Requirements"
        open={raiseRequirementOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={requirementModalLoader}>
          <div  >
            <Form onFinish={handleRequirementSubmit} form={props?.internalReqForm}  layout="vertical">
              <div className="reuirement">

              
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Description</th>
                  <th className="z-index">Select</th>
                </tr></thead>
                <tbody>
                  {raiseRequerimentList?.map((item, ind) => (
                    <tr key={ind + 1}>
                      <td>{ind + 1}</td>

                      <td>{requirementDescription(item)}</td>
                      <td>
                        {" "}
                        <Checkbox
                          type="checkbox"
                          onChange={(e) => (item.status = e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                  {raiseRequerimentList?.length === 0 && (
                    <tr>
                      <td colspan="13">
                        <div className="text-center">
                          <span>No data available</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>

              <div className="mt-16">
              <Form.Item
          label={<strong>Other Requirements</strong>}
          name="PosInternalReq"
          rules={[{ required: false, message: "Other Requirements" }]}
        >
          <TextArea rows={6} maxLength={1000} placeholder="Other Requirements" />
        </Form.Item>
                                </div>
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  onClick={() => setRaiseRequirement(true)}
                >
                  Submit
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setRaiseRequirementOpen(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal>
    </>
  );
};

export default InternalFlowPOS;