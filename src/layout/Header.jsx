import React, { useState, startTransition, useEffect, useContext } from "react";
import logo from "../assets/images/logo-small.png";
import user from "../assets/images/user.png";
import { connect, useSelector } from "react-redux";
import { useData } from "../reducers/DataContext";
import { profileObj } from "../reducers/ProfileReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { ClickContext } from "../reducers/ClickContext";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
} from "antd";
import NotificationIcon from "../assets/images/notification_symbol.png";
import DashboardIcon from "../assets/images/dashboard.png";
import CloseIcon from "../assets/images/close_1.png";

import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { secureStorage } from "../utils/secureStorage";
import apiCalls from "../api/apiCalls";
import { filterOption } from "../utils/HelperUtilites";
const Header = ({ policyDetails, userProfileInfo }) => {
  const location = useLocation();
  const { Option } = Select;

  const { handleClick } = useContext(ClickContext);
  const dispatch = useDispatch();

  const app_name = useSelector((state) => state);
  const { setSharedData } = useData();
  const { Search } = Input;
  const [advanceSearchModal, setAdvanceSearchModal] = useState(false);
  const currentPathname = window.location.hash;
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchValue, setMobileSearchValue] = useState(null);
  // For Switch Role
  const users = userProfileInfo?.profileObj?.allRoles || [];
  const [switchRoleModal, setSwitchRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [filterUser, setFilterUsers] = useState(users);

  const navigate = useNavigate();

  //#region AD Authntication Start
  const { instance } = useMsal();

  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }
  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGOUT_SUCCESS) {
        console.log("Inside Effect Add Link", event);
        console.log(activeAccount);
        let account = event.payload;
        handleLogout();
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
    // eslint-disable-next-line
  }, [instance]);
  const LogoutSession = async () => {
    const response = await apiCalls.LogoutSession();
    console.log("logResponse:-", response);
  };
  const ADLogoutRedirection = async () => {
    LogoutSession();
    // Clear all client-side storage
    clearClientStorage();

    // Clear all cache storage
    await clearCacheStorage();

    // Unregister all service workers
    await unregisterServiceWorkers();

    // Initiate Azure AD logout redirect
    instance.logoutRedirect().catch((error) => console.log(error));

    // Optionally redirect to home or a specific page after logout
    // window.location.href = '/';

    window.location.reload(true);
  };

  const clearClientStorage = () => {
    // Clear localStorage
    secureStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();
  };

  const clearCacheStorage = async () => {
    // Check for service workers and clear their caches
    if ("caches" in window) {
      // Get all cache names
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
      }
    }
  };

  const unregisterServiceWorkers = async () => {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
  };

  const searchObj = {
    requestheader: {
      source: "POS",
      policyNo: "",
      applicationNo: "",
      ServiceRequestID: "",
    },
    requestBody: {
      mobileNo: "",
      emailID: "",
      pan: "",
      customerID: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      isSrSearch: false,
    },
  };

  const items = [
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          className="drpdwn-links"
          onClick={() => handleSwitchRole()}
        >
          Switch Role
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          rel="noopener noreferrer"
          className="drpdwn-links"
          onClick={() => ADLogoutRedirection()}
        >
          Logout
        </a>
      ),
    },
  ];

  const handleLogout = () => {
    startTransition(() => {
      let user = {
        userName: "",
        password: "",
        boe: "",
        pos: "",
        role: "",
        name: "",
      };
      dispatch(profileObj(user));
      secureStorage.remove("token");
      secureStorage.remove("isLoggedIn");
      secureStorage.remove("sessionStartTime");
      navigate("/login");
    });
  };
  const hanldeSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };
  const inputChange = (e) => {
    setMobileSearchValue(e.target.value);
  };
  const handleSwitchRole = () => {
    setSwitchRoleModal(true);
  };
  const handleCancel = () => {
    setSwitchRoleModal(false);
    setSelectedRole(null);
    setFilterUsers(users); // Reset filter to original users list
  };
  const handleOk = () => {
    if (!selectedRole) {
      message.destroy();
      message.warning({
        content: "Please select Switch Role.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    const selectionRole = users?.find((x) => x?.roleID == selectedRole);
    const user =  {
  ...userProfileInfo?.profileObj,
};

    let navigationURL = "";

    user.role = selectedRole;
    user.roleName = selectionRole?.roleName;

    if (user?.role === 3) {
      // BOE User and Call Center User
      user.boe = true;
      user.sourceId = 3;
      navigationURL = "/boedashboard";
    }
    if (user?.role === 1) {
      // BOE User and Call Center User
      user.boe = true;
      user.sourceId = 1;
      navigationURL = "/boeuser";
    } else if (user?.role === 20) {
      // Email Management
      user.boe = true;
      user.isEmail = true;
      navigationURL = "/emailuser";
      user.sourceId = 1;
    } else if (user?.role === 21) {
      // Email Management
      user.boe = true;
      user.isEmail = true;
      navigationURL = "/emailadmin";
      user.sourceId = 1;
    } else if (user?.role === 4) {
      //POS Executive
      navigationURL = "/posexec";
      user.pos = true;
    } else if (user?.role == 11) {
      // NB User
      navigationURL = "/nbuser";
      user.pos = true;
    } else if (user?.role == 12) {
      // PA User
      navigationURL = "/pauser";
      user.pos = true;
    } else if (user?.role === 22) {
      // Grievance User or Complaint Team User
      navigationURL = "/grievanceuser";
      user.pos = true;
    } else if (user?.role == 2) {
      // POS Admin
      navigationURL = "/posnonpayoutadmindashboard";
      user.pos = true;
    } else if (user?.role === 25) {
      // POS Admin
      navigationURL = "/paapprover";
      user.pos = true;
    } else if (user?.role == 26) {
      // PA Admin
      navigationURL = "/paadmin";
      user.pos = true;
    } else if (user?.role == 13) {
      // NB Admin
      navigationURL = "/nbadmin";
      user.pos = true;
    } else if (user?.role == 23) {
      // Grievance Admin
      navigationURL = "/grievanceadmin";
      user.pos = true;
    } else if (user?.role == 5) {
      // POS Manager
      navigationURL = "/posmanager";
      user.pos = true;
    } else if (user?.role == 6) {
      // POS Approver 1
      navigationURL = "/posapprover1";
      user.pos = true;
    } else if (user?.role == 7) {
      // POS Approver 2
      navigationURL = "/posapprover2";
      user.pos = true;
    } else if (user?.role == 8) {
      // POS Approver 3
      navigationURL = "/posapprover3";
      user.pos = true;
    } else if (user?.role == 9) {
      // POS Approver 4
      navigationURL = "/posapprover4";
      user.pos = true;
    } else if (user?.role == 10) {
      // Finance
      navigationURL = "/finance";
      user.pos = true;
    } else if (user?.role == 29) {
      //POS Executive payout
      navigationURL = "/posexdashboard";
      user.pos = true;
    } else if (user?.role == 28) {
      //POS Executive payout
      navigationURL = "/pospayoutapproverdashboard";
      user.pos = true;
    } else if (user?.role == 27) {
      //POS Executive payout
      navigationURL = "/posadmin";
      user.pos = true;
    } else if (user?.role === 31) {
      user.boe = true;
      user.sourceId = 31;
      navigationURL = "/claimsnotificationuser";
    } else if (user?.role === 19) {
      user.boe = true;
      user.sourceId = 19;
      navigationURL = "/claimsadmindashboard";
    } else if (user?.role === 32) {
      user.boe = true;
      user.sourceId = 32;
      navigationURL = "/claimsprimaryuser";
    } else if (user?.role === 33) {
      user.boe = true;
      user.sourceId = 33;
      navigationURL = "/claimsassessmentchecker";
    } else if (user?.role === 34) {
      user.boe = true;
      user.sourceId = 34;
      navigationURL = "/claimsapprover";
    }
    if (user?.role === 14) {
      // BOE User and Call Center User
      user.boe = true;
      user.sourceId = 14;
      navigationURL = "/callcenteruserdashboard";
    }
    if (user?.role === 36) {
      // pospayoutExecutive
      user.boe = true;
      user.sourceId = 14;
      navigationURL = "/pospayoutexec";
    }
    if (user?.role === 35) {
      // pospayoutExecutive
      user.boe = true;
      user.sourceId = 14;
      navigationURL = "/pospayoutadmin";
    }
    if (user?.role === 37) {
      // WelcomeCallUser
      user.boe = true;
      user.sourceId = 37;
      navigationURL = "/callcenteruserdashboard";
    }
    if (user?.role === 38) {
      //GRP EMS USER Dashboard
      user.boe = false;
      user.sourceId = 38;
      navigationURL = "/GroupEmsUserDashboard";
    }
    if (user?.role === 39) {
      //GRP EMS ADMIN Dashboard
      user.boe = false;
      user.sourceId = 39;
      navigationURL = "/GroupEmsAdminDashboard";
    }
    dispatch(profileObj(user));
    navigate(navigationURL);
    setSwitchRoleModal(!switchRoleModal);
    setSelectedRole(null);
    setFilterUsers(users); // Reset filter to original users list
  };

  const handleLogoIcon = (data) => {
    //const selectionRole = users?.find(x => x?.roleID == selectedRole)
    const user = userProfileInfo?.profileObj;
    let navigationURL = "";
    if (data == "posadmin") {
      // POS Admin
      navigationURL = "/posnonpayoutadmindashboard";
      user.pos = true;
    }
    //handleOk()

    // if ( data === 3) { // BOE User and Call Center User
    //   user.boe = true;
    //   user.sourceId = 3
    //   navigationURL = '/boedashboard'
    // }
    if (user?.role === 1) {
      // BOE User and Call Center User
      user.boe = true;
      user.sourceId = 1;
      navigationURL = "/boeuser";
    } else if (user?.role === 20) {
      // Email Management
      user.boe = true;
      user.isEmail = true;
      navigationURL = "/emailuser";
      user.sourceId = 1;
    } else if (user?.role === 21) {
      // Email Management
      user.boe = true;
      user.isEmail = true;
      navigationURL = "/emailadmin";
      user.sourceId = 1;
    } else if (user?.role === 4) {
      //POS Executive
      navigationURL = "/posexec";
      user.pos = true;
    } else if (user?.role == 11) {
      // NB User
      navigationURL = "/nbuser";
      user.pos = true;
    } else if (user?.role == 12) {
      // PA User
      navigationURL = "/pauser";
      user.pos = true;
    } else if (user?.role === 22) {
      // Grievance User or Complaint Team User
      navigationURL = "/grievanceuser";
      user.pos = true;
    } else if (data == "posadmin") {
      // POS Admin
      navigationURL = "/posnonpayoutadmindashboard";
      user.pos = true;
    } else if (user?.role === 25) {
      // POS Admin
      navigationURL = "/paapprover";
      user.pos = true;
    } else if (user?.role == 26) {
      // PA Admin
      navigationURL = "/paadmin";
      user.pos = true;
    } else if (user?.role == 13) {
      // NB Admin
      navigationURL = "/nbadmin";
      user.pos = true;
    } else if (user?.role == 23) {
      // Grievance Admin
      navigationURL = "/grievanceadmin";
      user.pos = true;
    } else if (user?.role == 5) {
      // POS Manager
      navigationURL = "/posmanager";
      user.pos = true;
    } else if (user?.role == 6) {
      // POS Approver 1
      navigationURL = "/posapprover1";
      user.pos = true;
    } else if (user?.role == 7) {
      // POS Approver 2
      navigationURL = "/posapprover2";
      user.pos = true;
    } else if (user?.role == 8) {
      // POS Approver 3
      navigationURL = "/posapprover3";
      user.pos = true;
    } else if (user?.role == 9) {
      // POS Approver 4
      navigationURL = "/posapprover4";
      user.pos = true;
    } else if (user?.role == 10) {
      // Finance
      navigationURL = "/finance";
      user.pos = true;
    } else if (user?.role == 29) {
      //POS Executive payout
      navigationURL = "/posexdashboard";
      user.pos = true;
    } else if (user?.role == 28) {
      //POS Executive payout
      navigationURL = "/pospayoutapproverdashboard";
      user.pos = true;
    } else if (user?.role == 27) {
      //POS Executive payout
      navigationURL = "/posadmin";
      user.pos = true;
    } else if (user?.role === 19) {
      user.boe = true;
      user.sourceId = 19;
      navigationURL = "/claimsadmindashboard";
    } else if (user?.role === 31) {
      user.boe = true;
      user.sourceId = 31;
      navigationURL = "/claimsnotificationuser";
    } else if (user?.role === 32) {
      user.boe = true;
      user.sourceId = 32;
      navigationURL = "/claimsprimaryuser";
    } else if (user?.role === 33) {
      user.boe = true;
      user.sourceId = 33;
      navigationURL = "/claimsassessmentchecker";
    } else if (user?.role === 34) {
      user.boe = true;
      user.sourceId = 34;
      navigationURL = "/claimsapprover";
    }
    if (user?.role === 14) {
      // BOE User and Call Center User
      user.boe = true;
      user.sourceId = 14;
      navigationURL = "/callcenteruserdashboard";
    }
    if (user?.role === 36) {
      // pospayoutExecutive
      user.boe = true;
      user.sourceId = 14;
      navigationURL = "/pospayoutexec";
    }
    if (user?.role === 35) {
      // pospayoutExecutive
      user.boe = true;
      user.sourceId = 14;
      navigationURL = "/pospayoutadmin";
    }
    if (user?.role === 37) {
      // callcenteruserdashboard
      user.boe = true;
      user.sourceId = 37;
      navigationURL = "/callcenteruserdashboard";
    }
    if (user?.role === 38) {
      //GRP EMS USER Dashboard
      user.boe = false;
      user.sourceId = 38;
      navigationURL = "/GroupEmsUserDashboard";
    }
    if (user?.role === 39) {
      //GRP EMS ADMIN Dashboard
      user.boe = false;
      user.sourceId = 39;
      navigationURL = "/GroupEmsAdminDashboard";
    }
    dispatch(profileObj(user));
    navigate(navigationURL, { state: { user } });
    setSwitchRoleModal(false);
    setSelectedRole(null);
    setFilterUsers(users); // Reset filter to original users list
  };

  const handleRole = (e) => {
    console.log("UserRole :", e);
    secureStorage.set("UserRole", e);
    setSelectedRole(e);
  };

  const onSearch = (e) => {
    const value = e?.trim();
    if (value?.substring(0, 2)?.toLowerCase() === "sr") {
      searchObj.requestBody.isSrSearch = true;
      searchObj.requestheader.ServiceRequestID = value;
      setSharedData(searchObj);
      setShowMobileSearch(false);
      setMobileSearchValue(null);
    } else {
      const regex = /@/;
      const nameDateRegex = /^([A-Za-z]+)\/([A-Za-z]+)\/(\d{2})(\d{2})(\d{4})$/;

      //  if(!isNaN(+value) && value.length !==10){
      //   console.log('It is a number.');

      //   searchObj.requestBody.emailID = value;

      //  }
      searchObj.requestBody.isSrSearch = false;
      if (regex.test(value)) {
        searchObj.requestBody.emailID = value;
      } else if (!isNaN(+value) && value.length === 10) {
        searchObj.requestBody.mobileNo = value;
      } else if (isNaN(+value) && value.length === 10) {
        searchObj.requestBody.pan = value;
      } else if (nameDateRegex.test(value)) {
        const match = value.match(nameDateRegex);
        if (match) {
          // match[1]: Firstname, match[2]: Lastname, match[3]: day, match[4]: month, match[5]: year
          searchObj.requestBody.firstName = match[1];
          searchObj.requestBody.lastName = match[2];
          searchObj.requestheader.dob = `${match[5]}${match[4]}${match[3]}`; // dd/mm/yyyy
        }
      } else if (isNaN(+value) && value.length !== 10) {
        searchObj.requestheader.applicationNo = value;
      } else {
        searchObj.requestheader.policyNo = value;
        searchObj.requestBody.customerID = value;
      }

      //  else {

      //   searchObj.requestBody.firstName = value;
      //   searchObj.requestBody.middleName = value;
      //   searchObj.requestBody.lastName = value;
      //  }
      setSharedData(searchObj);
      setShowMobileSearch(false);
      setMobileSearchValue(null);
    }
  };
  const handleIconAction = () => {
    navigate("/boedashboard");
  };
  const handleSubmit = (values) => {
    searchObj.requestBody.firstName = values.firstname;
    searchObj.requestBody.middleName = values.middleName;
    searchObj.requestBody.lastName = values.lastname;
    searchObj.requestBody.dob = values.dob;
    setSharedData(searchObj);
  };

  const handleLogoLink = () => {
    const pathURL = userProfileInfo?.profileObj?.roleName
      ?.toLowerCase()
      ?.replace(/\s+/g, "")
      ?.trim();
    if (pathURL) {
      navigate("/" + pathURL);
    }
    handleLogoIcon(pathURL);
  };
  return (
    <>
      <nav className="navbar bg">
        <div className="container-fluid header-content">
          <div className="navbar-header d-flex">
            <a className="" onClick={() => handleLogoLink()}>
              <img className="" src={logo} alt="" />
            </a>
          </div>
          {(currentPathname?.includes("advancesearch") ||
            currentPathname === "") && (
            <>
              <div className="search-box d-flex mobile-hide">
                <Search
                  placeholder="Policy/App/Mobile/Mail/PAN/CustID/(Fnm/Lnm/DOB)"
                  allowClear
                  size="large"
                  onSearch={(e) => onSearch(e)}
                  className="header-search"
                />
              </div>
              <span className="notification-icon-container">
                <img
                  src={DashboardIcon}
                  alt=""
                  style={{ padding: "8px", width: "40px", marginTop: "-10px" }}
                  onClick={() => handleIconAction()}
                />
              </span>
              <div className="header desk-hide">
                {showMobileSearch && (
                  <>
                    <div className="site-search">
                      <form className="clearfix">
                        <input
                          type="text"
                          name="q"
                          onChange={inputChange}
                          placeholder="Policy/App/Mobile/Mail/PAN/Cust ID"
                          id="searchInput"
                          className="search"
                          data-gtm-form-interact-field-id="0"
                        />
                        <button
                          type="submit"
                          className="search-btn"
                          onClick={() => onSearch(mobileSearchValue)}
                        >
                          <span className="bi bi-search mobilesearch-icon"></span>
                        </button>
                      </form>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  className="open-search mobile-only"
                  onClick={() => hanldeSearch()}
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
              {!currentPathname?.includes("login") &&
                !currentPathname?.includes("dashboard") && (
                  <>
                    <div className="profile">
                      <div className="user-profile">
                        <p className="user-name">
                          {userProfileInfo?.profileObj?.name}
                        </p>
                        <p className="user-role">
                          {userProfileInfo?.profileObj?.roleName || "User Role"}
                        </p>
                      </div>
                      <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                          <img className="user-img" src={user} alt="" />{" "}
                        </a>
                      </Dropdown>
                    </div>
                  </>
                )}
            </>
          )}
          {!currentPathname?.includes("advancesearch") &&
            currentPathname !== "" && (
              <>
                <div className="profile">
                  <div className="user-profile">
                    <p className="user-name">
                      {userProfileInfo?.profileObj?.name}
                    </p>
                    <p className="user-role">
                      {userProfileInfo?.profileObj?.roleName || "User Role"}
                    </p>
                    <p className="user-name">
                      Last Login:{userProfileInfo?.profileObj?.LastLogin}
                    </p>
                  </div>
                  <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <img className="user-img" src={user} alt="" />{" "}
                    </a>
                  </Dropdown>
                </div>
              </>
            )}
        </div>
      </nav>

      <Modal
        title="Advance Search"
        open={advanceSearchModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setAdvanceSearchModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <Form
          onFinish={handleSubmit}
          //name="wrap"
          // labelCol={{
          //   flex: "60%",
          // }}
          // labelAlign="left"
          // labelWrap
          // wrapperCol={{
          //   flex: 1,
          // }}
          // colon={false}
        >
          <Row gutter={[24]} className="reasons-list mt-26">
            <Col className="advSerach">
              <Form.Item
                label={
                  <span>
                    First Name<sup>*</sup>
                  </span>
                }
                name="firstname"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="First Name"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Middle Name<sup>*</sup>
                  </span>
                }
                name="middleName"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="Last Name"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Last Name<sup>*</sup>
                  </span>
                }
                name="lastname"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="Last Name"
                />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    DOB<sup>*</sup>
                  </span>
                }
                name="dob"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={10}
                  placeholder="DOB"
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="text-center modal-validate">
            <Button
              htmlType="submit"
              type="primary"
              className="primary-btn"
              // onClick={() => {
              //   handleOk();
              // }}
            >
              Search
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Switch Role Pop UP */}
      <Modal
        title="Switch Role"
        open={switchRoleModal}
        closeIcon={false}
        footer={null}
        width={400}
      >
        <Form label="Role Type" name="RoleType" className="inputs-label m-16">
          {/* <div className="row"> */}
          <div>
            <Select
              value={selectedRole} // Bind selected role to the state
              showSearch
              allowClear={true}
              className="cust-input calltype-select"
              placeholder="Select Role Type"
              onChange={handleRole}
              style={{ width: "100%" }}
              // style={{ width: "200px" }}
              options={filterUser?.map((val) => ({
                label: val?.roleName,
                value: val?.roleID,
              }))}
              filterOption={filterOption}
            ></Select>
          </div>
          {/* </div> */}
          {/* <div className="row"> */}
          <div className="contact-details-btn mt-24">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            {/* <div className="col-sm-3 ms-5"> */}
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleOk()}
            >
              Ok
            </Button>
          </div>
          {/* </div> */}
          {/* </div> */}
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ state, policyDetails, userProfileInfo }) => {
  return {
    data: state?.PolicyDetailsReducer?.policyDetailsObj,
    policyDetails,
    userProfileInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (info) => {
      dispatch(profileObj(info));
    },
    dispatch,
  };
};

export default connect(mapStateToProps)(Header);
