import React from 'react';
import {
    Button,
    Form,
    Spin,
    Modal,
    Checkbox,
  } from "antd";
import TextArea from 'antd/es/input/TextArea';

const RaiseRequirementPopup = (props) => {
    return (
    <div>
    <Modal
    title="Requirements"
    open={props?.raiseRequirementOpen}
    destroyOnClose={true}
    width={1200}
    closeIcon={false}
    footer={null}
  >
    <Spin spinning={props?.requirementModalLoader}>
      <div  >
        <Form onFinish={props?.handleRequirementSubmit} form={props?.requirementsForm} layout="vertical">
          <div className="reuirement">
          <table className="responsive-table">
            <thead>
            <tr>
              {/* <th>Sr No</th> */}
              <th>Description</th>
              <th className="z-index">Select</th>
            </tr></thead>
            <tbody>
               { props?.raiseRequerimentList?.length >0 && props?.raiseRequerimentList?.map((item, ind) => (
                <tr key={ind + 1}>
                  {/* <td>{ind + 1}</td> */}

                  <td>{item.raiseReqDesc}</td>
                  <td>
                    {" "}
                    <Checkbox
                      type="checkbox"
                      onChange={(e) => (item.status = e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
              {props?.raiseRequerimentList?.length === 0 && (
                <tr>
                  <td colspan="2">
                    <div className="text-center">
                      <span>No data available</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          {!props?.isShowPOSScreen && <>
              <div className="mt-16">
              <Form.Item
          label={<strong>Additional comments/requirements for customer</strong>}
          name="addotherReq"
          rules={[{ required: false, message: "Additional comments/requirements for customer" }]}
        >
          <TextArea rows={6} maxLength={1000} placeholder="Additional comments/requirements for customer" />
        </Form.Item>
                                </div>
                                </>}
                                 {props?.isShowPOSScreen && <>
              <div className="mt-16">
              <Form.Item
          label={<strong>Other Requirements</strong>}
          name="PosOtherReq"
          rules={[{ required: false, message: "Other Requirements" }]}
        >
          <TextArea rows={6} maxLength={1000} placeholder="Other Requirements" />
        </Form.Item>
                                </div>
                                </>}
          {/* <div className="text-area mt-16">
         <Form.Item
                  // label={<span>{"Comment"} <sup>*</sup>
                  // </span>}
                  name="requirementCmnt"
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Enter Comments",
                    },
                  ]}
                >
                   <TextArea rows={2} value={requirementCmnt} placeholder="Comments" onChange={(e)=>setRequirementCmnt(e.currentTarget.value)}/>
                </Form.Item>
              </div> */}
      <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
              disabled = {props?.disableSubmutBtn && !props?.isShowPOSScreen}
            >
              Submit
            </Button>

            <Button
              type="primary"
              className="primary-btn"
              onClick={props?.popupClose}
            >
              Close
            </Button>
          </div>
        </Form>
      </div>

      
    </Spin>
  </Modal>
    </div>
  )
}

export default RaiseRequirementPopup;