import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { profileObj } from "../reducers/ProfileReducer";
import { useAuth } from "../utils/auth";
import { useData } from "../reducers/DataContext";
import { loginRequest } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import apiCalls from "../api/apiCalls";
import { useKeyStore } from "../reducers/KeyStoreContext";
import { secureStorage } from "../utils/secureStorage";

const Login = (props) => {
  const { setKeyStore } = useKeyStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { setSharedData } = useData();
  const { instance } = useMsal();

  const handleSignWithAD = () => {
    secureStorage.set("isLoggedIn", true);
    secureStorage.set("sessionStartTime", new Date().getTime().toString());
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogout = () => {
    instance
      .logoutRedirect()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error))
      .finally((res) => {
        console.log(res);
      });
  };

  //  const getCTST = async () => {
  //     try {
  //       let obj = {
  //         MasterRequest: ["GCP_KEY","LA_POSSERV","LA_GENERIC","LA_ICMS"],
  //       };
  //       const response = await apiCalls.ctst(obj);
  //       if (response?.data) {
  //         const keys = ["GCP_KEY", "LA_POSSERV", "LA_GENERIC", "LA_ICMS"];
  //         const result = transformMultipleKeysToKeyValuePair(response?.data, keys);
  //         await setKeyStore(result);
  //         tokenGenerate();
  //       } else {
  //         throw new Error("Failed to fetch master data.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching CTST data:", error);
  //       message.destroy();
  //       message.error({
  //         content: error?.data?.responseBody?.errormessage || "Something went wrong, please try again!",
  //         className: "custom-msg",
  //         duration: 2,
  //       });
  //     }
  //   };

  const transformMultipleKeysToKeyValuePair = (data, keys) => {
    const result = {};

    keys.forEach((key) => {
      const found = data?.find((item) => item.key === key);
      result[key] = found?.value?.[0]?.mstDesc || null;
    });

    return result;
  };

  const tokenGenerate = () => {
    let payload = "policy_detail";
    let response = apiCalls.getTokenData(payload);
    response
      .then((val) => {
        secureStorage.set("tokenGenrate", val?.data?.token);
      })
      .catch((err) => {
        message.destroy();
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  useEffect(() => {
    //getchunks();
    // getCTST();
     tokenGenerate();
     
     let callbackId = null;
    let redirectTimeoutId = null;
    if(!callbackId) {
      callbackId = instance.addEventCallback((event) => {
        if (
          (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
          event.payload.account
        ) {
          let account = event.payload;
          if (account) {
            const userId = account?.account?.username
            const userName = account?.account?.name;
           
            secureStorage.set("userId", userId);

            auth?.login(userName);
            secureStorage.set('token', account?.idToken);
            apiCalls.GetListOfRolesByUserId(userId, userName).then(res => {
              console.log("rolesResponse",res);
              if(res.data.length > 0) {

                 const formatDateTime = (dateString) => {
            if (!dateString) return null; // Handle null or undefined date
            const date = new Date(dateString);

            // Extract day, month, year, hours, minutes, and seconds
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");
            console.log("UserRole : ",res.data[0]?.roleID);
             //Start VAPT change imran
            //secureStorage.set("UserRole",res.data[0]?.roleID);
               const allRoleIds = res.data.map(r =>
                r.roleID//.toLowerCase().replace(/\s+/g, "")
              );
              
              console.log("RolesId",JSON.stringify(allRoleIds));
              secureStorage.set("UserRoles", JSON.stringify(allRoleIds));
              console.log("Raw UserRoles in storage:", secureStorage.get("UserRoles"));
              //secureStorage.set("ActiveRole", selectedRole.toLowerCase().replace(/\s+/g, ""));
               // end VAPT change imran

            // Return the formatted string
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        };

                let user = {
                  userId:userId,
                  adAuth : true,
                  DisplayName: userName,
                  role: res.data[0]?.roleID,
                  DisplayRole: res.data[0]?.roleName,
                  allRoles: res?.data,
                  LastLogin: formatDateTime(res.data[0]?.lastLoggedIn)
                }
                
        
                handleSignIn(user);
              } 
              else {
                message.error({
                  content: "You are not authorised to access the application",
                  className: "custom-msg",
                  duration: 5, 
                });
                redirectTimeoutId = setTimeout(() => {
                  handleLogout();
                  navigate('/login', { replace: true });
                }, 5000);
              }
  
            });
          }
        }
      });
    }

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
      if (redirectTimeoutId) {
        clearTimeout(redirectTimeoutId); 
      }
    };
  }, [loggedIn, navigate, instance]);



  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleSignIn = ({
    adAuth = false,
    userId = "",
    DisplayName = "",
    role = 0,
    DisplayRole = "",
    allRoles = [],
    LastLogin = "",
  }) => {
    if (!adAuth) {
      // Handle login failure
      message.destroy();
      message.error({
        content: "Your email or password is incorrect",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }

    if (userId) {secureStorage.set("userId", userId)};

    // Define role groups dynamically
    const boeRoles = [
      "boeuser",
      "boeadmin",
      "emailadmin",
      "claimsadmindashboard",
      "claimsnotificationuser",
      "claimsprimaryuser",
      "claimsassessmentchecker",
      "claimsapprover",
    ];
    const posRoles = [
      "posadmin",
      "posexecutive",
      "posexec",
      "posmanager",
      "finance",
      "pauser",
      "paadmin",
      "nbadmin",
      "posapproverdashboard",
    ];
    const posRoleIncludes = ["posapprover", "nbuser"]; // Roles that use `includes`

    // Create user object

    const user = {
      userName: userId,
      adAuth: true,
      boe: false,
      pos: false,
      role,
      name: DisplayName,
      roleName: allRoles[0]?.roleName || DisplayRole,
      sourceId: 0,
      allRoles,

      LastLogin: LastLogin,
    };

    // Format role name
    const loginRoleName = user?.roleName
      ?.toLowerCase()
      .replace(/\s+/g, "")
      .trim();

    // Assign dynamic role flags
    user.boe = boeRoles?.includes(loginRoleName);
    user.pos =
      posRoles?.includes(loginRoleName) ||
      posRoleIncludes?.some((role) => loginRoleName?.includes(role));

    // Save login state and set app context
    secureStorage.set("loggedIn", "true");
    auth?.login(1);
    setLoggedIn(true);
    setSharedData(null);
    if (loginRoleName) {
       secureStorage.set("ActiveRole", role.toString().trim())// change by imran 
      navigate("/" + loginRoleName);
    }
    // Update user profile
    console.log('users',user);
    
    props?.updateProfile(user);
  };

  const handleForgotPassword = () => {};


  return (
    <>
 
      {!loggedIn && (
        <>
          <div className="login-div">
            <div>
              
              <Card className="login" style={{ width: 340 }}>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <h4
                    className="login-heading fs-25"
                    style={{ textAlign: "center" }}
                  >
                    <span className="fw-600" style={{ color: "white" }}>
                      OASIS
                    </span>
                  </h4>
                  <div className="login-account">
                    {import.meta.env.VITE_APP_LOGIN_SECTION === "true" && (
                      <>
                        <Form.Item
                          name="username"
                          className="mb-36"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your Email / Mobile No",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Email/Mobile No"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item
                          name="password"
                          className=""
                          rules={[
                            {
                              required: true,
                              message: "Please enter your Password",
                            },
                          ]}
                        >
                          <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Item>
                      </>
                    )}
                    <Form.Item className="m-0">
                      {import.meta.env.VITE_APP_LOGIN_SECTION === "true" && (
                        <>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={() => handleSignIn({ adAuth: false })}
                          >
                            SignIn
                          </Button>
                        </>
                      )}
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={() => handleSignWithAD()}
                        // style={{ width: '153px' }}
                      >
                        SignIn With AD
                      </Button>
                      {import.meta.env.VITE_APP_LOGIN_SECTION === "true" && (
                        <>
                          <a
                            style={{ float: "center" }}
                            className="login-form-forgot"
                            href="/"
                            onClick={handleForgotPassword}
                          >
                            Forgot Password?
                          </a>
                        </>
                      )}
                    </Form.Item>
                  </div>
                </Form>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ userProfileInfo }) => {
  return { userProfileInfo };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (info) => {
      dispatch(profileObj(info));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
