import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";

import Header from "./Header";
import ProtectedRoute from "../layout/ProtectedRoute";
import { secureStorage } from "../utils/secureStorage";

// static screens
import FinanceDashboard from "../components/Finance/financeDashboard";
import PosApproveComponent from "../components/PosApproveComponent";
import EmailManagement from "../components/EmailManagement";
import EmailManagementView from "../components/EmailManagement/EmailManagementView";
import EmailManagementAdmin from "../components/EmailManagement/EmailManagementAdmin";
import ExcelUpload from "../components/ExcelUpload";
import ComplaintsDashboard from "../components/Complaints/complaintsDashboard";
import ComplaintsTeam from "../components/Complaints/complaintsTeam";
import ComplaintsUser from "../components/Complaints/complaintsUser";
import ComplaintTeamDashboard from "../components/Complaints/complaintTeamDashboard";
import ComplaintsUserDashboard from "../components/Complaints/complaintsUserDashboard";

import POSPayoutDashboard from "../components/POSPayoutDashboard/POSPayoutDashboard";
import NotificationQC from "../components/Claims/NotificationQC";
import PrimaryAssessment from "../components/Claims/PrimaryAssessment";
import RevivalWithDGH from "../components/RevivalScreen/RevivalWithDGH";
import Foreclosure from "../components/CallTypes/Foreclosure";
import RevivalDashboard from "../components/RevivalScreen/RevivalDashboard";
import POSExDashboard from "../components/POSExDashboard/POSExDashboard";
import POSApproverDashboardPayout from "../components/POSApproverDashboard/POSApproverDashboardPayout";
import PAAdminDashboard from "../components/PAAdminDashboard/PAAdminDashboard";
import PAExecutiveDashboard from "../components/PAExecutiveDashboard/PAExecutiveDashboard";
import PosAdminDashboardNonPayOut from "../components/POSAdmin/POSAdminDashboardNonPayout";
import PAApproverDashboard from "../components/PAAdminDashboard/PAApproverDashboard";

import POSApproverDashboard from "../components/POSApproverDashboard/POSApproverDashboard";
import POSApproverDashboard2 from "../components/POSApproverDashboard2/POSApproverDashboard2";
import POSApproverDashboard3 from "../components/POSApproverDashboard3/POSApproverDashboard3";
import POSApproverDashboard4 from "../components/POSApproverDashboard4/POSApproverDashboard4";

import NBAdminDashboard from "../components/NBUserDashboard/NBAdminDashboard";
import BOEUserDashboard from "../components/BOEUserDashboard/BOEUserDashboard";

import PosPayoutExecutive from "../components/PosPayoutExecutive/PosPayoutExecutive";
import PosPayoutAdmin from "../components/POSPayoutAdmin/PosPayoutAdmin";
import PosPayoutExecUser from "../components/PosPayoutExecutive/PosPayoutExecUser";

import ClaimsQCUserDashboard from "../components/ClaimsQCUserDashboard/ClaimsQCUserDashboard";

import CallCenterDashboard from "../components/CallCenterDashboard/CallCenterDashboard";

import PrimaryAssesorDashboard from "../components/Claims/PrimaryAssesorDashboard";
import AssessmentCheckerDashboard from "../components/Claims/AssessmentCheckerDashboard";
import ClaimsApproverDashboard from "../components/Claims/ClaimsApproverDashboard";
import ClaimsAdminDashboard from "../components/Claims/ClaimsAdminDashboard";

import UsersDashboard from "../components/userDashboardComponent/UsersDashboard";
import BlacklistedPolicyPage from "../components/BlackListedPolicy/BlacklistedPolicyPage";

import GroupEmsUserDashboard from "../components/GroupEms/GroupEmsUserDashboard";
import GroupEmsAdminDashboard from "../components/GroupEms/GroupEmsAdminDashboard";
import PayeeCodeApproval from "../components/POSApprover/PayeeCodeApproval";

// lazy
const Login = lazy(() => import("./Login"));
const AdvanceSearchComponent = lazy(() => import("../components/AdvanceSearch/advanceSearch"));
const PosManagerDashboard = lazy(() => import("../components/POSManager/posManagerDashboard"));
const Dashboard = lazy(() => import("./Dashboard"));
const Table = lazy(() => import("../components/Table"));
const CustomerDetails = lazy(() => import("../components/customerDetails"));
const ErrorPage = lazy(() => import("../utils/ErrorPage"));

const Routing = () => {
  const loginInfo = useSelector((state) => state);

  const isLoggedIn =
    loginInfo?.userProfileInfo?.profileObj?.name &&
    secureStorage.get("isLoggedIn")
      ? true
      : false;

  const userRoles = ["boeuser", "posexec", "pauser", "nbuser"];

  return (
    <>
      {/* POS Approve */}
      {window.location.hash?.toLowerCase() === "/posapprove" && (
        <PosApproveComponent />
      )}

      {window.location.hash?.toLowerCase() !== "#/posapprove" && (
        <>
          {isLoggedIn ? (
            <>
              <Header />

              <Suspense fallback={<Spin size="large" className="loader" />}>
                <Routes>
                  <Route path="/advancesearch" element={<AdvanceSearchComponent />} />
                  <Route path="/login" element={<Navigate to="/advancesearch" />} />

                  <Route element={<ProtectedRoute allowedRoles={["3"]} />}>
                    <Route path="/boedashboard" element={<BOEUserDashboard />} />
                  </Route>

                  <Route path="/policydetails" element={<CustomerDetails />} />

                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calllogging" element={<CustomerDetails />} />
                  <Route path="/table" element={<Table />} />

                  <Route path="/posmanager" element={<PosManagerDashboard />} />

                  <Route element={<ProtectedRoute allowedRoles={["2"]} />}>
                    <Route path="/posadmin" element={<PosAdminDashboardNonPayOut />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["23"]} />}>
                    <Route path="/grievanceadmin" element={<ComplaintsDashboard />} />
                  </Route>

                  <Route path="/finance" element={<FinanceDashboard />} />

                  <Route element={<ProtectedRoute allowedRoles={["20"]} />}>
                    <Route path="/emailuser" element={<EmailManagement />} />
                    <Route path="/emailuser/:userId" element={<EmailManagement />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["20", "21"]} />}>
                    <Route
                      path="/emailmanagementview/:id"
                      element={<EmailManagementView />}
                    />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["22"]} />}>
                    <Route
                      path="/grievanceuser"
                      element={<ComplaintTeamDashboard />}
                    />
                    <Route
                      path="/grievanceuser/:serviceId"
                      element={<ComplaintsTeam />}
                    />
                  </Route>

                  <Route
                    path="/complaintsuser"
                    element={<ComplaintsUserDashboard />}
                  />
                  <Route
                    path="/complaintsuser/:serviceId"
                    element={<ComplaintsUser />}
                  />

                  <Route
                    path="/pospayoutdashboard"
                    element={<POSPayoutDashboard />}
                  />

                  <Route path="/excelUpload" element={<ExcelUpload />} />
                  <Route path="/notificationqc" element={<NotificationQC />} />
                  <Route path="/primaryassessment" element={<PrimaryAssessment />} />

                  <Route path="/revivalDashboard" element={<RevivalDashboard />} />
                  <Route path="/revivalwithDGH" element={<RevivalWithDGH />} />
                  <Route path="/foreclosure" element={<Foreclosure />} />

                  <Route element={<ProtectedRoute allowedRoles={["21"]} />}>
                    <Route path="/emailadmin" element={<EmailManagementAdmin />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["4"]} />}>
                    <Route path="/posexdashboard" element={<POSExDashboard />} />
                  </Route>

                  <Route
                    path="/pospayoutapproverdashboard"
                    element={<POSApproverDashboardPayout />}
                  />

                  <Route path="/paadmin" element={<PAAdminDashboard />} />

                  <Route
                    path="/paexecutivedashbaord"
                    element={<PAExecutiveDashboard />}
                  />

                  <Route
                    path="/posnonpayoutadmindashboard"
                    element={<PosAdminDashboardNonPayOut />}
                  />

                  <Route path="/paapprover" element={<PAApproverDashboard />} />

                  <Route
                    element={<ProtectedRoute allowedRoles={["posapprover", "admin"]} />}
                  >
                    <Route path="/posapprover" element={<POSApproverDashboard />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["6"]} />}>
                    <Route path="/posapprover1" element={<PayeeCodeApproval />} />
                  </Route>

                  <Route
                    element={<ProtectedRoute allowedRoles={["posapprover2", "7"]} />}
                  >
                    <Route path="/posapprover2" element={<PayeeCodeApproval />} />
                  </Route>

                  <Route
                    element={<ProtectedRoute allowedRoles={["posapprover3", "8"]} />}
                  >
                    <Route path="/posapprover3" element={<PayeeCodeApproval />} />
                  </Route>

                  <Route
                    element={<ProtectedRoute allowedRoles={["posapprover4", "9"]} />}
                  >
                    <Route path="/posapprover4" element={<PayeeCodeApproval />} />
                  </Route>

                  <Route
                    element={<ProtectedRoute allowedRoles={["nbadmin", "admin", "13"]} />}
                  >
                    <Route path="/nbadmin" element={<NBAdminDashboard />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["5"]} />}>
                    <Route
                      path="/blacklisted-policy"
                      element={<BlacklistedPolicyPage />}
                    />
                  </Route>

                  <Route>
                    {userRoles?.map((role) => (
                      <Route
                        key={role}
                        path={`/${role}`}
                        element={<UsersDashboard />}
                      />
                    ))}
                  </Route>

                  <Route path="/pospayoutexec" element={<PosPayoutExecutive />} />
                  <Route path="/pospayoutadmin" element={<PosPayoutAdmin />} />

                  <Route
                    path="/posPayoutExecUser"
                    element={<PosPayoutExecUser />}
                  />

                  <Route element={<ProtectedRoute allowedRoles={["19"]} />}>
                    <Route
                      path="/claimsadmindashboard"
                      element={<ClaimsAdminDashboard />}
                    />
                  </Route>

                  <Route
                    path="/claimsnotificationuser"
                    element={<ClaimsQCUserDashboard />}
                  />

                  <Route
                    path="/callcenteruserdashboard"
                    element={<CallCenterDashboard />}
                  />

                  <Route
                    path="/claimsprimaryuser"
                    element={<PrimaryAssesorDashboard />}
                  />

                  <Route
                    path="/claimsassessmentchecker"
                    element={<AssessmentCheckerDashboard />}
                  />

                  <Route
                    path="/claimsapprover"
                    element={<ClaimsApproverDashboard />}
                  />

                  <Route element={<ProtectedRoute allowedRoles={["38"]} />}>
                    <Route
                      path="/GroupEmsUserDashboard"
                      element={<GroupEmsUserDashboard />}
                    />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["39"]} />}>
                    <Route
                      path="/GroupEmsAdminDashboard"
                      element={<GroupEmsAdminDashboard />}
                    />
                  </Route>

                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Suspense>
            </>
          ) : (
            <Login />
          )}
        </>
      )}
    </>
  );
};

export default Routing;
