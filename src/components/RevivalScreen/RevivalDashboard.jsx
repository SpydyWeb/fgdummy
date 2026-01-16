import React, { useState } from 'react';
import { Form, Input, Button, Radio, Tooltip, Upload, DatePicker, message, Row, Col,Spin } from "antd";
import apiCalls from "../../api/apiCalls";
import { useNavigate,useLocation  } from 'react-router-dom';



const RevivalDashboard = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] =
        useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

 

    const handleSubmit = () => {
        const formData = form.getFieldValue();
        const searchObj ={
            requestheader: {
              "source": "POS",
              "policyNo": formData.policyno,
              "applicationNo": ""
        
            },
            requestBody: {
              mobileNo: "",
              emailID: "",
              pan: "",
              customerID: "",
              firstName: "",
              middleName: "",
              lastName: "",
              dob: '',
            }
          }
        console.log("fooo",formData.policyno)
        let obj = {
            "policyNo":formData.policyno ,
            "applicationNo": "",
            "dob": "01/01/1900"
          }
        setIsLoading(true);
        let response = apiCalls.getSearchData(searchObj);
        response
            .then((val) => {
                console.log("vaaa",val)
                if (val?.data?.responseHeader?.issuccess) {
                    // navigate(`/revivalwithDGH/${val?.data?.responseBody}`);
                    navigate("/revivalwithDGH", { state: val?.data?.responseBody?.searchDetails });
                    setData(val?.data?.responseBody);
                } else {
                    message.destroy();
                    message.error({
                        content:
                            val?.data?.responseHeader?.message ||
                            "Something went wrong please try again!",
                        className: "custom-msg",
                        duration: 2,
                    });
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });

    }

    return (
        <Spin spinning={isLoading}>
        <div className="main-start-revivaldgh" style={{ textAlign: "center" }}>
            <h4 className='pt-4'>Revival Dashboard</h4>
            <div style={{ width: "50%", margin: "0 auto" }} className='pt-4'>
                <Form form={form}>
                    <Form.Item
                        label={<span>Policy No</span>}
                        name="policyno"
                        wrapperCol={{ span: 19 }}
                        labelCol={{ span: 5 }}
                    >
                        <Input type="text" placeholder="Policy No" />
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                Date of Birth
                            </span>
                        }
                        name="dateofbirth"
                        className="inputs-label mb-0"
                        wrapperCol={{ span: 19 }}
                        labelCol={{ span: 5 }}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            className="cust-input"
                        />
                    </Form.Item>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            type="primary"
                            className="primary-btn mt-4 me-3"
                            htmlType="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
        </Spin>

    )
}

export default RevivalDashboard;