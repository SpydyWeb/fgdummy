import React, { useState,useEffect  } from 'react';

import apiCalls from "../../api/apiCalls";
import {  Col, Row ,message,Spin, Steps, Button, Form, Input, Select} from 'antd';



const { Option } = Select;


const NotificationQC = (props) => {

    const [form] = Form.useForm();
    const steps = [
        {
          title: 'Notification  Details',
          content: 'Notification  Details',
        },
        {
          title: 'Relevant Life Asia Transactions',
          content: 'Relevant Life Asia Transactions',
        },
        {
          title: 'Nominee Details',
          content: 'Nominee Details',
        },
        {
            title: 'Initmation Details',
            content: 'Initmation Details',
          },
      ];


  const [isLoading,setIsLoading] = useState(false);
  const [data,setData]=useState([]);
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    getHeaderParametersData()
  }, []);

  const next = () => {
       setCurrent(current + 1);
 
   };
 
   const prev = () => {
     setCurrent(current - 1);
   };
 
   const items = steps.map((item) => ({
     key: item.title,
     title: item.title,
   }));




  const getHeaderParametersData=async(ele)=>{
    setIsLoading(true);
    let obj = {
      "policyNo": ele?.policyNo,
			"applicationNo": '',
			"dob":ele?.dob
    }
    const response=await apiCalls.getHeaderParameters(obj);
    if(response?.data?.responseHeader?.issuccess) {
      setIsLoading(false);
      setData(response?.data?.responseBody);
    }
    else {
      setIsLoading(false);
      message.destroy()
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }


 
  
  
  return (
   <>
   <Spin spinning={isLoading}>
<div className='complaints-section claims-sec' style={{ width: '80%', float: 'left'}}>
  <div >

	<Row className='sec-dark' gutter={16} style={{ margin: ' 16px', padding:'10px' }}>
	<Col style={{ width: '20%'}}>
    <div className='boxx'>
      <div>
        <p ><b> Policy No</b></p>
        <p >{data?.identifiers?.policyNo}</p>
      </div>
      <div >
        <p ><b> App No</b></p>
        <p >{data?.identifiers?.applicationNo}</p>
      </div>
	  <div >
        <p ><b> LA Name</b></p>
        <p >{data?.identifiers?.la_Name}</p>
      </div>
	  <div >
        <p ><b> PO Name</b></p>
        <p >Graduate</p>
      </div>
    </div>
  </Col>
	<Col style={{ width: '20%'}}>
    <div className='boxx'> 
      <div >
        <p ><b> Customer Type</b></p>
        <p >{data?.planAndStatus?.customerType}</p>
      </div>
      <div >
        <p ><b> Plan Name(ULIP/Non ULIP)</b></p>
        <p >{data?.planAndStatus?.planName}</p>
      </div>
	  <div >
        <p ><b> Policy  Status</b></p>
        <p >{data?.planAndStatus?.policyStatus}</p>
      </div>
	  <div >
        <p ><b> Premium Status</b></p>
        <p >{data?.planAndStatus?.premiumStatus}</p>
      </div>
    </div>
   </Col>
   <Col style={{ width: '20%'}}>
   <div className='boxx'>
      <div >
        <p ><b> Sum Assured</b></p>
        <p >{data?.saDetails?.sumAssured}</p>
      </div>
      <div >
        <p ><b> PT </b> </p>
        <p >{data?.saDetails?.pt}</p>
      </div>
	  <div >
        <p ><b> RCD</b></p>
        <p >{data?.saDetails?.rcd}</p>
      </div>
	  <div >
        <p ><b> Assignment</b></p>
        <p >{data?.saDetails?.assignment}</p>
      </div>
    </div>
   </Col>
   <Col style={{ width: '20%'}}>
   <div className='boxx'>
      <div >
        <p ><b> Model Premium Amount</b></p>
        <p >{data?.premiumDetails?.modelPremiumAmount}</p>
      </div>
      <div >
        <p ><b>PPT </b> </p>
        <p >{data?.premiumDetails?.ppt}</p>
      </div>
	  <div >
        <p ><b> PTD</b></p>
        <p >{data?.premiumDetails?.ptd}</p>
      </div>
	  <div >
        <p ><b> Mode</b></p>
        <p >{data?.premiumDetails?.mode}</p>
      </div>
    </div>
   </Col>

   <Col style={{ width: '20%'}}>
   <div className='boxx'>
      <div >
        <p ><b> Branch</b></p>
        <p >{data?.salesDetails?.branch}</p>
      </div>
      <div >
        <p ><b>Channel </b> </p>
        <p >{data?.salesDetails?.channel}</p>
      </div>
	  <div >
        <p ><b> Agent Name</b></p>
        <p >{data?.salesDetails?.agentName}</p>
      </div>
	  <div >
        <p ><b> Orphan Flag</b></p>
        <p >{data?.salesDetails?.orphanFlag
        }</p>
      </div>
    </div>
   </Col>
  </Row>
 
  </div>
  

  <div className = 'tabs-begin' style={{ width: '80%', margin:'0px auto'}}>
<br/><br/>
  <>
  <Form
              form={form}
              name="wrap"
              labelCol={{
                flex: "35%",
              }}
              labelAlign="left"
              labelWrap
              wrapperCol={{
                flex: 1,
              }}
              colon={false}
             
              autoComplete="off"
            >
                <Steps current={current} items={items} />
                    <div >
                       
                        {steps[current].title === 'Notification  Details' && 
                         <>
                         <br/> <br/>
                         <Row gutter={16}>
                            <Col span={12}>
                            <Form.Item label="Claims Service Guarantee Applicable" name="Claims Service Guarantee Applicable" rules={[{ required: true, message: 'Claims Service Guarantee Applicable' }]}>
                                <Input placeholder="Claims Service Guarantee Applicable" />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Type of Policy" name="Type of Policy" rules={[{ required: true, message: 'Type of Policy' }]}>
                                <Input placeholder="Type of Policy" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Claim Category" name="Claims Service Guarantee Applicable" rules={[{ required: true, message: 'Claim Category' }]}>
                                <Input placeholder="Claim Category" />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Claims against " name="Claims against " rules={[{ required: true, message: 'Claims against ' }]}>
                                <Input placeholder="Claims against " />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Nature of Death" name="Nature of Death" rules={[{ required: true, message: 'Nature of Death' }]}>
                                <Input placeholder="Nature of Death" />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Exact Cause of Death " name="Exact Cause of Death " rules={[{ required: true, message: 'Exact Cause of Death' }]}>
                                <Input placeholder="Exact Cause of Death" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Date of Death" name="Date of Death" rules={[{ required: true, message: 'Date of Death' }]}>
                                <Input placeholder="Date of Death" />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Policy Status on DOD " name="Policy Status on DOD " rules={[{ required: true, message: 'Policy Status on DOD' }]}>
                                <Input placeholder="Policy Status on DOD" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="ADB Rider" name="ADB Rider" rules={[{ required: true, message: 'ADB Rider' }]}>
                                <Input placeholder="ADB Rider" />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Term Rider " name="Term Rider  " rules={[{ required: true, message: 'Term Rider ' }]}>
                                <Input placeholder="Term Rider " />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="TPD Rider" name="TPD Rider" rules={[{ required: true, message: 'TPD Rider' }]}>
                                <Input placeholder="TPD Rider" />
                            </Form.Item>
                            </Col>
                        </Row>
                         </>
                        }
               
                        {steps[current].title === 'Relevant Life Asia Transactions' && 
                         <>
                         <br/> <br/>
                         <Row gutter={16}>
                            <Col span={24}>
                            <Form.Item label="Renewal Payment Pending for realization" name="Renewal Payment" rules={[{ required: true, message: 'Renewal Payment Pending for realization' }]}>
                            <Select placeholder="Select">
                                        <Option value="option1">Option 1</Option>
                                        <Option value="option2">Option 2</Option>
                                        
                                        </Select>
                            </Form.Item>
                            </Col>
                            <Col span={24}>
                            <Form.Item label="Life Asia Transactions After DOD" name="Life Asia Transactions After DOD" rules={[{ required: true, message: 'Life Asia Transactions After DOD' }]}>
                                <Input placeholder="Life Asia Transactions After DOD" />
                            </Form.Item>
                            </Col>

                            <Col span={24}>
                            <Form.Item label="Latest Policy reinstatement date" name="Latest Policy reinstatement date" rules={[{ required: true, message: 'Latest Policy reinstatement date' }]}>
                                <Input placeholder="Latest Policy reinstatement date" />
                            </Form.Item>
                            </Col>

                        </Row>
                         </>
                        }


                       {steps[current].title === 'Nominee Details' && 
                         <>
                         <br/> <br/>
                         <Row gutter={16}>
                            <Col span={12}>
                            <Form.Item label="Is there a change in Nominee?" name="Renewal Payment" rules={[{ required: true, message: 'Is there a change in Nominee?' }]}>
                            <Select placeholder="Select">
                                        <Option value="option1">Option 1</Option>
                                        <Option value="option2">Option 2</Option>
                                        
                                        </Select>
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Nominee  Name" name="Nominee  Name" rules={[{ required: true, message: 'Nominee  Name' }]}>
                                <Input placeholder="Nominee  Name" />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="% of Allocation" name="% of Allocation" rules={[{ required: true, message: '% of Allocation' }]}>
                                <Input placeholder="% of Allocation" />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="Relationship with LA" name="Relationship with LA" rules={[{ required: true, message: 'Relationship with LA' }]}>
                                <Input placeholder="Relationship with LA" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Nominee PAN Number" name="Nominee PAN Number" rules={[{ required: true, message: 'Nominee PAN Number' }]}>
                                <Input placeholder="Nominee PAN Number" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Nominee Addres" name="Nominee Addres" rules={[{ required: true, message: 'Nominee Addres' }]}>
                                <Input placeholder="Nominee Addres" />
                            </Form.Item>
                            </Col>


                            
                            <Col span={12}>
                            <Form.Item label="Nominee Mobile No" name="Nominee Mobile No" rules={[{ required: true, message: 'Nominee Mobile No' }]}>
                                <Input placeholder="Nominee Mobile No" />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="Nominee Email ID" name="Nominee Email ID" rules={[{ required: true, message: 'Nominee Email ID' }]}>
                                <Input placeholder="Nominee Email ID" />
                            </Form.Item>
                            </Col>
                            <Col span={24}>
                                <b>Nominee Bank A/C Details</b>
                                <br/><br/>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="IFSC" name="IFSC" rules={[{ required: true, message: 'IFSC' }]}>
                                <Input placeholder="IFSC" />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="Bank Name" name="Bank Name" rules={[{ required: true, message: 'Bank Name' }]}>
                                <Input placeholder="Bank Name" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Bank A/C No" name="Bank A/C No" rules={[{ required: true, message: 'Bank A/C No' }]}>
                                <Input placeholder="Bank A/C No" />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="Confirm Bank A/C No" name="Confirm Bank A/C No" rules={[{ required: true, message: 'Confirm Bank A/C No' }]}>
                                <Input placeholder="Confirm Bank A/C No" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Account holder name " name="Account holder name " rules={[{ required: true, message: 'Account holder name ' }]}>
                                <Input placeholder="Account holder name " />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="Penny Drop result" name="Penny Drop result " rules={[{ required: true, message: 'Penny Drop result ' }]}>
                                <Input placeholder="Penny Drop result " />
                            </Form.Item>
                            </Col>

                        </Row>
                         </>
                        } 


                         {steps[current].title === 'Initmation Details' && 
                         <>
                         <br/> <br/>
                         <Row gutter={16}>
                            <Col span={12}>
                            <Form.Item label="Source of Intimation" name="Source of Intimation" rules={[{ required: true, message: 'Source of Intimation' }]}>
                            <Select placeholder="Select">
                                        <Option value="option1">Option 1</Option>
                                        <Option value="option2">Option 2</Option>
                                        
                                        </Select>
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Claim Intimated by" name="Claim Intimated by" rules={[{ required: true, message: 'Claim Intimated by' }]}>
                                <Input placeholder="Claim Intimated by" />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="Person's relationship with LA (If other)" name="Claim Intimated by" rules={[{ required: true, message: 'Persons relationship with LA (If other)' }]}>
                                <Input placeholder="Person's relationship with LA (If other)" />
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Intimating Person's Mobile number " name="Claim Intimated by" rules={[{ required: true, message: 'Intimating Persons Mobile number' }]}>
                                <Input placeholder="Intimating Person's Mobile number " />
                            </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item label="Before 3 ; after 3 " name="Claim Intimated by" rules={[{ required: true, message: 'Before 3 ; after 3' }]}>
                            <Select placeholder="Select">
                                        <Option value="option1">Option 1</Option>
                                        <Option value="option2">Option 2</Option>
                                        
                                        </Select>
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Reason for Late Intimation" name="Claim Intimated by" rules={[{ required: true, message: 'Reason for Late Intimation' }]}>
                            <Select placeholder="Select">
                                        <Option value="option1">Option 1</Option>
                                        <Option value="option2">Option 2</Option>
                                        
                                        </Select>
                            </Form.Item>
                            </Col>


                            <Col span={12}>
                            <Form.Item label="Claim ticket logged by " name="Claim ticket logged by " rules={[{ required: true, message: 'Claim ticket logged by ' }]}>
                                <Input placeholder="Claim ticket logged by " />
                            </Form.Item>
                            </Col>
                         

                            <Col span={12}>
                            <Form.Item label="Claim Received On " name="Claim Received On" rules={[{ required: true, message: 'Claim Received On' }]}>
                                <Input placeholder="Claim Received On " />
                            </Form.Item>
                            </Col>
                         

                            <Col span={12}>
                            <Form.Item label="Claim Intimated On" name="Claim Intimated On" rules={[{ required: true, message: 'Claim Intimated On' }]}>
                                <Input placeholder="Claim Intimated On" />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Intimating Person's Remarks" name="Intimating Person's Remarks" rules={[{ required: true, message: 'Intimating Persons Remarks' }]}>
                                <Input placeholder="Intimating Person's Remarks" />
                            </Form.Item>
                            </Col>
                         
                         

                        </Row>
                         </>
                        }      


                     <br/>

                    <div className="text-center"> 
                    {current > 0 && (
                            <Button type="primary"
                                style={{
                                margin: '0 8px',
                                }}
                                onClick={() => prev()}
                            >
                                Previous
                            </Button>
                            )}
                            {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Next
                            </Button>
                            )}
                            {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Submit
                            </Button>
                            )}
                           
                    </div>
                    <br/>
                  
                    </div>
                    </Form>
                </>
                



    </div>

</div>


</Spin> 


   </>
  )
}


export default NotificationQC;