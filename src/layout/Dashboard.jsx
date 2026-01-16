import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector } from 'react-redux';


import apiCalls from "../api/apiCalls";
import { Spin,message,Table,Space } from "antd";
import { useNavigate,useLocation  } from 'react-router-dom';
import moment from "moment";
import { connect } from "react-redux";
import { ClickContext } from '../reducers/ClickContext';
const Dashboard = (props) => {
  const { clicked } = useContext(ClickContext);
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Access the state passed during navigation
  const { state } = location;
  const [showTotalPages,setShowTotalpages] = useState(null);
  const shouldLog = useRef(true);

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
<a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>
        </Space>
      ),
    },
    {
      title: "Ticket No",
      dataIndex: "serviceNo",
      key: 'serviceNo',
    },
    {
      title: "Call Log Date",
      dataIndex: "date",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => moment(a.date).diff(moment(b.date)),
      },
     render: (_, record) => (
      <Space size="middle">
      { moment(record.date).local().format("DD/MM/YYYY hh:mm A")}
      </Space>
    ),
    },

    {
      title: "Policy/Application Number",
      dataIndex: "policyNo",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.policyNo - b.policyNo,
      },
    },
    {
      title: "Request Type",
      dataIndex: "callTypeName"
    },
    {
      title: "Request SubType",
      dataIndex: "subTypeName"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Customer Name",
      dataIndex: "proposerName"
    },
    {
      title: "Product",
      dataIndex: "plan"
    },
    // {
    //   title: "Customer Type",
    //   dataIndex: "CustomerType"
    // },
    // {
    //   title: "Ageing",
    //   dataIndex: "ageing"
    // },
    {
      title: "Logged By",
      dataIndex: "loggedBy",
    },
   
  ];


  const handleDashboardFunction = () => {
    alert('hello')
    // Perform the desired action in the dashboard
    console.log('Dashboard function triggered from header!');
};

  const [data, setData] = useState([]);
  useEffect(() => {
    getSearchData();
  }, [clicked])
         useEffect(() => {
          // if(shouldLog.current){
          //   shouldLog.current = false;
          //   getSearchData();
          // }

     
         }, []); 


     
          const getSearchData = async () => {
            setIsLoading(true);
            let obj = { userId: loggedUser?.userName, role: loggedUser?.role }
            // if (loggedUser?.adAuth == true) {
            //   obj.userId = loggedUser?.userName;
            //   obj.role = loggedUser?.role;
            // } 
        //     else if (loggedUser?.role === 4 || state?.role === 4) {
        //       obj.userId = loggedUser?.userName;
        //       obj.role = '4'
        //     }
        //     else if (loggedUser?.role === 5) {
        //       obj.userId = 'posmanager';
        //       obj.role = '5'
        //     }
        //     else if (loggedUser?.role === 11) {
        //       obj.userId = loggedUser?.userName;
        //       obj.role = '11'
        //     }
        //     else if (loggedUser?.role === 15) {
        //       obj.userId = loggedUser?.userName;
        //       obj.role = '15'
        //    }
        //    else if (loggedUser?.role === 12) {
        //     obj.userId = loggedUser?.userName;
        //     obj.role = '15'
        //  }
           let response = apiCalls.getPOSData(obj);
           response.then((val)=>{
             if(val?.data){
               setData(val?.data);
               setShowTotalpages(val?.data?.length);
             }else{
               message.destroy();
               message.error({
                 content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
                 className: "custom-msg",
                 duration: 2,
               });
             }
             setIsLoading(false);
           }).catch((err)=>{
             setIsLoading(false);
           })
         }

  const handleAction = (item) => {
    navigate("/policydetails",{ state: {serialNo:item?.serviceNo, isPOS:true,policyNo: item?.policyNo, dob: item?.dob}});
  };
  return (
    <>
    <Spin spinning={isLoading}>
      <div className="main-start">
        <div className="w-94">
          <div className="table-container dashboard">
          <Table
        columns={columns}
        dataSource={data}
        //bordered={true}
        x={true}
        pagination={{
          //pageSizeOptions: ["5", "10", "15", "15"],
          pageSize: 10,
          //showSizeChanger: true,
          defaultPageSize: 5,
         // size:"small",
           total: {showTotalPages},
          //showTotal: `Total ${showTotalPages} items`
        }}
      />
          </div>
        </div>
      </div>
      </Spin>
    </>
  );
};

const mapStateToProps = ({state,userProfileInfo }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj,
    userProfileInfo}
}

export default connect(mapStateToProps)(Dashboard);
