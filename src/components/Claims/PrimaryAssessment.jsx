import React, { useState,useEffect, useRef  } from 'react';
import { Routes, Route } from 'react-router-dom';
import apiCalls from "../../api/apiCalls";
import { Card,Button, Col, Row ,List, Space, Radio,Tabs, Select, Input ,Form, Upload, Collapse,message,Spin} from 'antd';
import { Color } from '@rc-component/color-picker';

const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;


const items = [
  {
    key: '1',
    label: 'Basic Details',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text . ",
  },
  {
    key: '2',
    label: 'Financial & Viability',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
  },
  {
    key: '3',
    label: 'Medicals',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
  },
];

// import apiCalls from "../../api/apiCalls";
const PrimaryAssessment = (props) => {
  const [form] = Form.useForm();


  const [data,setData]=useState([]);
  const [isResponseMode,setIsResponseData]=useState('email');

  const [editorHtml, setEditorHtml] = useState('');
  const [isLoading,setIsLoading] = useState(false);







  const responseMode=[
    {
      name:"Email",
      value:"email"
    },
    {
      name:"Letter",
      value:"letter"
    }
  ]
  

  const [ComplaintCall, setComplaintCall] = useState(false);




  
	const [mode, setMode] = useState('left');
	const handleModeChange = (e) => {
	  setMode(e.target.value);
	};

  const handleChangeEditor = (html) => {
    setEditorHtml(html);
  };

	const formItemLayout = {
		labelCol: {
		  span:4, // adjust the span based on your layout needs
		},
		wrapperCol: {
		  span: 16, // adjust the span based on your layout needs
		},
	  };

	  const formItemLayout2 = {
		labelCol: {
		  span: 8,
		},
		wrapperCol: {
		  span: 16,
		},
	  };

  useEffect(() => {
    getHeaderParametersData()
  }, []);



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

  




  const uploadButton = (
    <Button icon={<i
      class="bi bi-paperclip text-color c-pointer fs-20"
      style={{ width: "20px" }}
    ></i>}></Button>
  );





  
  useEffect(()=>{

  },[])










  return (
   <>
   <Spin spinning={isLoading}>
<div className='complaints-section'>
  <div style={{ width: '80%', float: 'left'}}>
<br/>

	<Row className='sec-dark' gutter={16} style={{ margin: '0px 16px', padding:'10px' }}>
	<Col span={6}>
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
        <p >{data?.identifiers?.po_Name}</p>
      </div>
    </div>
  </Col>
	<Col span={6}>
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
   <Col span={6}>
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
   <Col span={6}>
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
  </Row>
  <div className = 'tabs-begin' style={{  margin: '16px 16px',}}>
  <Tabs tabPosition="left" type="card">
      <TabPane
        tab={
          <span>
Policy Details
          </span>
        }
        key="1"
      >


<Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '50%' }}>
      <Form.Item label="LA Client ID & Name" {...formItemLayout2}>
        <Input type="text" placeholder="LA Client ID & Name" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
      <Form.Item label="PH's Client ID & Name" {...formItemLayout2}>
        <Input type="text" placeholder="PH's Client ID & Name" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Type of Policy" {...formItemLayout2}>
        <Input type="text" placeholder="Type of Policy" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Application Date" {...formItemLayout2}>
        <Input type="text" placeholder="Application Date" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Total Premium Paid Till Date" {...formItemLayout2}>
        <Input type="text" placeholder="Total Premium Paid Till Date" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Life Asia Transactions After DOD" {...formItemLayout2}>
        <Input type="text" placeholder="Life Asia Transactions After DOD" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Policy Status at DOD" {...formItemLayout2}>
        <Input type="text" placeholder="Policy Status at DOD" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="LA's Age as on Death" {...formItemLayout2}>
        <Input type="text" placeholder="LA's Age as on Death" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="LA's Gender" {...formItemLayout2}>
        <Input type="text" placeholder="LA's Gender" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="LA's Occupation" {...formItemLayout2}>
        <Input type="text" placeholder="LA's Occupation" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Annual Income of LA" {...formItemLayout2}>
        <Input type="text" placeholder="Annual Income of LA" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Policy Duration from Commencement till DOD" {...formItemLayout2}>
        <Input type="text" placeholder="Policy Duration from Commencement till DOD" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Policy Duration from Commencement till DOD intimation" {...formItemLayout2}>
        <Input type="text" placeholder="Policy Duration from Commencement till DOD intimation" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>

	  <Form.Item label="Rider name" {...formItemLayout2}>
        <Input type="text" placeholder="Rider name" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Rider Sum Assured" {...formItemLayout2}>
        <Input type="text" placeholder="Rider Sum Assured" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
	  <Form.Item label="UW Decision" {...formItemLayout2}>
        <Input type="text" placeholder="UW Decision" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
	  <Form.Item label="UW comments" {...formItemLayout2}>
        <Input type="text" placeholder="UW comments" />
      </Form.Item>
	  </div>

      
      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>

      

</div>
    </Form>




      
      </TabPane>
      <TabPane
        tab={
          <span>
       
       Reinstatement Details
          </span>
        }
        key="2"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '50%' }}>
      <Form.Item label="Lapsed on " {...formItemLayout2}>
        <Input type="text" placeholder="Lapsed on " />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Reinstatement Date" {...formItemLayout2}>
        <Input type="text" placeholder="Reinstatement Date" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Reinstatement decision" {...formItemLayout2}>
        <Input type="text" placeholder="Reinstatement decision" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="With DGH " {...formItemLayout2}>
        <Input type="text" placeholder="With DGH " />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Medical Disclosures (if any)" {...formItemLayout2}>
        <Input type="text" placeholder="Medical Disclosures (if any)" />
      </Form.Item>
	  </div>
	
    
      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>

      

</div>

    </Form>
      </TabPane>
      <TabPane
        tab={
          <span>
    
    Assignment Details
          </span>
        }
        key="3"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

 

<div style={{ width: '50%' }}>
      <Form.Item label="Date of assignment" {...formItemLayout2}>
        <Input type="text" placeholder="Date of assignment" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Assignment Type" {...formItemLayout2}>
        <Input type="text" placeholder="Assignment Type" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Type of assignment" {...formItemLayout2}>
        <Input type="text" placeholder="Type of assignment" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Assignee Name" {...formItemLayout2}>
        <Input type="text" placeholder="Assignee Name" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Assigner name" {...formItemLayout2}>
        <Input type="text" placeholder="Assigner name" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Outstanding Loan Amt" {...formItemLayout2}>
        <Input type="text" placeholder="Outstanding Loan Amt" />
      </Form.Item>
	  </div>





      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>


</div>
    </Form>

      </TabPane>


      <TabPane
        tab={
          <span>
    
    Nominee Details
          </span>
        }
        key="4"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

 

<div style={{ width: '50%' }}>
      <Form.Item label="Nominee changed" {...formItemLayout2}>
        <Input type="text" placeholder="Nominee changed" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Nominee & Life Assured address same" {...formItemLayout2}>
        <Input type="text" placeholder="Nominee & Life Assured address same" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Nominee Name & Allocation %" {...formItemLayout2}>
        <Input type="text" placeholder="Nominee Name & Allocation %" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Nominee Address" {...formItemLayout2}>
        <Input type="text" placeholder="Nominee Address" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Nominee Bank A/c Details" {...formItemLayout2}>
        <Input type="text" placeholder="Nominee Bank A/c Details" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Nominee PAN" {...formItemLayout2}>
        <Input type="text" placeholder="Nominee PAN" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Penny Drop Result" {...formItemLayout2}>
        <Input type="text" placeholder="Penny Drop Result" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Bank Account De-Dup result" {...formItemLayout2}>
        <Input type="text" placeholder="Bank Account De-Dup result" />
      </Form.Item>
	  </div>



      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>

      

</div>
    </Form>

      </TabPane>

	

      <TabPane
        tab={
          <span>
    
    Claim Details
          </span>
        }
        key="5"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

 

<div style={{ width: '50%' }}>
      <Form.Item label="Claim ID" {...formItemLayout2}>
        <Input type="text" placeholder="Claim ID" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Claim Service Guaratee Applicable" {...formItemLayout2}>
        <Input type="text" placeholder="Claim Service Guaratee Applicable" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Claim Ageing (from Intimation)" {...formItemLayout2}>
        <Input type="text" placeholder="Claim Ageing (from Intimation)" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Claim Ageing (from registration effective date)" {...formItemLayout2}>
        <Input type="text" placeholder="Claim Ageing (from registration effective date)" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Claims aging (from last document received)" {...formItemLayout2}>
        <Input type="text" placeholder="Claims aging (from last document received)" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Type of Claim" {...formItemLayout2}>
        <Input type="text" placeholder="Type of Claim" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Deceased Person" {...formItemLayout2}>
        <Input type="text" placeholder="Deceased Person" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Nature of Death" {...formItemLayout2}>
        <Input type="text" placeholder="Nature of Death" />
      </Form.Item>
	  </div>



      <div style={{ width: '50%' }}>
      <Form.Item label="Cause of Death" {...formItemLayout2}>
        <Input type="text" placeholder="Cause of Death" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Date of Death" {...formItemLayout2}>
        <Input type="text" placeholder="Date of Death" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Category of Claim" {...formItemLayout2}>
        <Input type="text" placeholder="Category of Claim" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Reason for late intimation" {...formItemLayout2}>
        <Input type="text" placeholder="Reason for late intimation" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Referred to (in case of referral cases)" {...formItemLayout2}>
        <Input type="text" placeholder="Referred to (in case of referral cases)" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Referee's Opinion" {...formItemLayout2}>
        <Input type="text" placeholder="Referee's Opinion" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Last Requirement Received on" {...formItemLayout2}>
        <Input type="text" placeholder="Last Requirement Received on" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Assured Income Plan (Only)" {...formItemLayout2}>
        <Input type="text" placeholder="Assured Income Plan (Only)" />
      </Form.Item>
	  </div>


      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>

      

</div>
    </Form>

      </TabPane>



      <TabPane
        tab={
          <span>
       
       Checks
          </span>
        }
        key="6"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '50%' }}>
      <Form.Item label="OFAC Check " {...formItemLayout2}>
        <Input type="text" placeholder="OFAC Check " />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Claim Hotspot Check" {...formItemLayout2}>
        <Input type="text" placeholder="Claim Hotspot Check" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="IIB Data base Check" {...formItemLayout2}>
        <Input type="text" placeholder="IIB Data base Check" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Industry Check" {...formItemLayout2}>
        <Input type="text" placeholder="Industry Check" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Auto Pay Status" {...formItemLayout2}>
        <Input type="text" placeholder="Auto Pay Status" />
      </Form.Item>
	  </div>
	
      <div style={{ width: '50%' }}>
      <Form.Item label="(Raise CLS for Mandate Deactivation)" {...formItemLayout2}>
        <Input type="text" placeholder="(Raise CLS for Mandate Deactivation)" />
      </Form.Item>
	  </div>

      
      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>

      

</div>
    </Form>
      </TabPane>



      <TabPane
        tab={
          <span>
       
       Claim Payment Details 
          </span>
        }
        key="7"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '50%' }}>
      <Form.Item label="Total Claim Payable" {...formItemLayout2}>
        <Input type="text" placeholder="Total Claim Payable" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Within GCILI Authority Limit" {...formItemLayout2}>
        <Input type="text" placeholder="Within GCILI Authority Limit" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="GCILI Retention" {...formItemLayout2}>
        <Input type="text" placeholder="GCILI Retention" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="RI1's Name (if Referred)" {...formItemLayout2}>
        <Input type="text" placeholder="RI1's Name (if Referred)" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="RI1's Participation" {...formItemLayout2}>
        <Input type="text" placeholder="RI1's Participation" />
      </Form.Item>
	  </div>
	
      <div style={{ width: '50%' }}>
      <Form.Item label="RI2's Name (if Referred)" {...formItemLayout2}>
        <Input type="text" placeholder="RI2's Name (if Referred)" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="RI2's Participation" {...formItemLayout2}>
        <Input type="text" placeholder="RI2's Participation" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Life Asia Transactions After DOD" {...formItemLayout2}>
        <Input type="text" placeholder="Life Asia Transactions After DOD" />
      </Form.Item>
	  </div>

      
      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>

      

</div>
    </Form>
      </TabPane>


      <TabPane
        tab={
          <span>
       
       Initmatin Details
          </span>
        }
        key="8"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '50%' }}>
      <Form.Item label="Intimated by & on" {...formItemLayout2}>
        <Input type="text" placeholder="Intimated by & on" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Registered by & on" {...formItemLayout2}>
        <Input type="text" placeholder="Registered by & on" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Assessed (M) & (C) by and on" {...formItemLayout2}>
        <Input type="text" placeholder="Assessed (M) & (C) by and on" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Notification QC - User Remarks" {...formItemLayout2}>
        <Input type="text" placeholder="Notification QC - User Remarks" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Sub stage" {...formItemLayout2}>
        <Input type="text" placeholder="Sub stage" />
      </Form.Item>
	  </div>
	
      

      
      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   htmlType="submit"
      >
          Save
      </Button>

      

</div>
    </Form>
      </TabPane>
    </Tabs>

    </div>
    </div>
    <div  style={{ width: '20%', float: 'left',background:'#f2f2f2', height:'100vh'}}>

       
    </div>
</div>


</Spin>

   </>
  )
}


export default PrimaryAssessment;