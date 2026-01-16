import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Typography, Badge, Button, Spin } from 'antd';
import { DashboardOutlined, FileTextOutlined, CodeOutlined, CreditCardOutlined } from '@ant-design/icons';
import './POSApproverSelection.css';
import apiCalls from "../../api/apiCalls";
const { Title, Text } = Typography;

const POSApproverSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);

  // Dynamic dashboard counts from API
  const [dashboardCounts, setDashboardCounts] = useState({
    jeCreation: 0,
    payeeCode: 0
  });

  // Function to get dynamic title based on current route
  const getDynamicTitle = () => {
    const currentPath = location.pathname;
    switch(currentPath) {
      case '/posapprover1':
        return 'POS Approver 1 - Dashboard Selection';
      case '/posapprover2':
        return 'POS Approver 2 - Dashboard Selection';
      case '/posapprover3':
        return 'POS Approver 3 - Dashboard Selection';
      case '/posapprover4':
        return 'POS Approver 4 - Dashboard Selection';
      default:
        return 'POS Approver Dashboard Selection';
    }
  };

   useEffect(() => {
    fetchDashboardCounts();
  }, [location.pathname]);


 const fetchDashboardCounts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching dashboard counts for user:', loggedUser.userName, 'role:', loggedUser.role);
      
      // Create request object for API calls
      const requestObj = {
        role: loggedUser.role,
        userId: loggedUser.userName,
        status: "PENDING",
        fromDate: "",
        toDate: "",
        policyNumber: "",
        callType: "",
        subType: "",
        mode: "",
        ageing: "",
        assignedTo: ""
      };

      console.log('API Request for counts:', requestObj);

      let payeeCodeCount = 0;
      let jeCreationCount = 0;

      // Fetch PayeeCode approval data count
      try {
        const payeeCodeResponse = await apiCalls.PayeeCodeApprovalRoleBasedFetchData(requestObj);
        console.log('PayeeCode API Response:', payeeCodeResponse);

        if (payeeCodeResponse?.data && Array.isArray(payeeCodeResponse.data)) {
          payeeCodeCount = payeeCodeResponse.data.length;
          console.log('PayeeCode count from API:', payeeCodeCount);
        }
      } catch (payeeError) {
        console.error('Error fetching PayeeCode data:', payeeError);
      }

      // Fetch JE Creation data count
      try {
        const jeResponse = await apiCalls.JEApprovalRoleBasedFetchData(requestObj);
        console.log('JE API Response:', jeResponse);

        if (jeResponse?.data && Array.isArray(jeResponse.data)) {
          jeCreationCount = jeResponse.data.length;
          console.log('JE count from API:', jeCreationCount);
        }
      } catch (jeError) {
        console.error('Error fetching JE data:', jeError);
      }
      
      setDashboardCounts({
        jeCreation: jeCreationCount,
        payeeCode: payeeCodeCount
      });

      console.log('Final dashboard counts:', {
        jeCreation: jeCreationCount,
        payeeCode: payeeCodeCount
      });

    } catch (err) {
      console.error('Error fetching dashboard counts:', err);
      setError('Failed to load dashboard data');
      
      // Set zero counts on error (no hardcoded values)
      setDashboardCounts({
        jeCreation: 0,
        payeeCode: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (dashboardType) => {
    try {
      setIsLoading(true);
      
      const currentPath = location.pathname;
      
      if (dashboardType === 'jeCreation') {
        // Navigate to JE Approval component based on current approver level
        let jeRoute = '';
        switch(currentPath) {
          case '/posapprover1':
            jeRoute = '/posapprover1/je-approval';
            break;
          case '/posapprover2':
            jeRoute = '/posapprover2/je-approval';
            break;
          case '/posapprover3':
            jeRoute = '/posapprover3/je-approval';
            break;
          case '/posapprover4':
            jeRoute = '/posapprover4/je-approval';
            break;
          default:
            jeRoute = '/posapprover1/je-approval';
        }
        
        navigate(jeRoute, { 
          state: { 
            type: 'je', 
            title: 'JE Flow Data',
            user: loggedUser,
            approverLevel: currentPath.replace('/posapprover', '')
          } 
        });
      } else if (dashboardType === 'payeeCode') {
        // Navigate to PayeeCode Approval component based on current approver level
        let payeeRoute = '';
        switch(currentPath) {
          case '/posapprover1':
            payeeRoute = '/posapprover1/payeecode-approval';
            break;
          case '/posapprover2':
            payeeRoute = '/posapprover2';
            break;
          case '/posapprover3':
            payeeRoute = '/posapprover3';
            break;
          case '/posapprover4':
            payeeRoute = '/posapprover4';
            break;
          default:
            payeeRoute = '/posapprover1/payeecode-approval';
        }
        
        navigate(payeeRoute, { 
          state: { 
            type: 'payeecode', 
            title: 'Payee Code Data',
            user: loggedUser,
            approverLevel: currentPath.replace('/posapprover', '')
          } 
        });
      }
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Navigation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const dashboardOptions = [
    {
      id: 'jeCreation',
      title: 'JE Flow',
      description: 'Journal Entry flow data processing and management',
      icon: <FileTextOutlined />,
      count: dashboardCounts.jeCreation,
      color: '#722ed1'
    },
    {
      id: 'payeeCode',
      title: 'Payee Code',
      description: 'All POS Approver data management and processing',
      icon: <CreditCardOutlined />,
      count: dashboardCounts.payeeCode,
      color: '#13c2c2'
    }
  ];

  if (error) {
    return (
      <div className="error-container">
        <Card>
          <Title level={4} type="danger">Error</Title>
          <Text>{error}</Text>
          <Button 
            type="primary" 
            onClick={() => window.location.reload()}
            style={{ marginTop: 16 }}
          >
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="pos-approver-selection-container">
        <div className="header-section">
          <Title level={2} className="page-title">
            {getDynamicTitle()}
          </Title>
          <Text className="page-subtitle">
            Welcome {loggedUser?.name || 'User'}, please select your preferred dashboard to continue
          </Text>
        </div>

        <Row gutter={[24, 24]} className="dashboard-grid" justify="center">
          {dashboardOptions.map((option) => (
            <Col key={option.id} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card
                className="dashboard-card"
                hoverable={false}
                style={{ borderColor: option.color }}
              >
                <div className="card-header">
                  <div className="icon-container" style={{ backgroundColor: `${option.color}20` }}>
                    <span style={{ color: option.color, fontSize: '24px' }}>
                      {option.icon}
                    </span>
                  </div>
                  <Badge 
                    count={option.count} 
                    style={{ backgroundColor: option.color, cursor: 'pointer' }}
                    className="count-badge clickable-badge"
                    onClick={() => handleNavigation(option.id)}
                  />
                </div>
                
                <div className="card-content">
                  <Title level={4} className="card-title">
                    {option.title}
                  </Title>
                  <Text className="card-description">
                    {option.description}
                  </Text>
                </div>

                <div className="card-footer">
                  <Button 
                    type="primary" 
                    style={{ backgroundColor: option.color, borderColor: option.color }}
                    block
                    onClick={() => handleNavigation(option.id)}
                  >
                    Access Dashboard
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Spin>
  );
};

export default POSApproverSelection;