import React from "react";
import { Tooltip, Progress } from "antd";

// Images
import Assistance from "../../assets/images/handshake.png";
import payoutsImg from "../../assets/images/payout.svg";
import archivedImg from "../../assets/images/archived-tickets.svg";
import dmsImg from "../../assets/images/DMS.svg";
import scrollImg from "../../assets/images/scroll[1].svg";
import transactionImg from "../../assets/images/transactiondocuments.svg";
import upcomingImg from "../../assets/images/upcoming_renewal.svg";

// ================== CONSTANTS ==================

const TOOLTIP_PLACEMENT = "leftTop";

const UPCOMING_ALLOWED_ROLES = [
  1, 4, 5, 11, 12, 14, 20, 21, 22, 31, 32, 33, 34,
];

// ================== REUSABLE COMPONENTS ==================

const SidebarItem = ({ title, onClick, children }) => {
  return (
    <div className="item">
      <Tooltip placement={TOOLTIP_PLACEMENT} title={title}>
        <span onClick={onClick} className="sidebar-btn" aria-label={title}>
          {children}
        </span>
      </Tooltip>
    </div>
  );
};

const WidgetGroup = ({ children }) => <div className="widgets" style={{cursor:'pointer'}}>{children}</div>;

// ================== MAIN COMPONENT ==================

const SidebarWidgets = ({
  onAssistance,
  onLastPayments,
  onPayouts,
  onOpenTickets,
  onArchivedTickets,
  onDms,
  ondmsnew,
  onTransactionDocs,
  onProfile,
  onRupeeClick,
  onHistorical,
  customerProfile,
  loggedUser,
  onPolicyEnquiry,
}) => {
  const showUpcoming = UPCOMING_ALLOWED_ROLES.includes(loggedUser?.role);

  return (
    <aside className="fixed-nav active">
      <div className="widgets-1">
        {/* Group 1 */}
        <WidgetGroup>
          <SidebarItem title="Assistance / FAQ" onClick={onAssistance}>
            <img src={Assistance} alt="Assistance" />
          </SidebarItem>

          <SidebarItem title="DMS Old" onClick={onDms}>
            <img src={dmsImg} width={40} height={40} alt="DMS Old" />
          </SidebarItem>
        </WidgetGroup>

        {/* Group 2 */}
        <WidgetGroup>
          <SidebarItem title="Payments" onClick={onLastPayments}>
            <i className="bi bi-currency-rupee" style={{ color: "#B21F1F", fontSize: 30 }} />
          </SidebarItem>

          <SidebarItem title="Payouts" onClick={onPayouts}>
            <img src={payoutsImg} width={40} height={40} alt="Payouts" />
          </SidebarItem>
        </WidgetGroup>

        {/* Group 3 */}
        <WidgetGroup>
          <SidebarItem title="Oasis Tickets" onClick={onOpenTickets}>
            <i className="bi bi-ticket" style={{ color: "#B21F1F", fontSize: 30 }}/>
          </SidebarItem>

          <SidebarItem title="Archived Tickets" onClick={onArchivedTickets}>
            <img
              src={archivedImg}
              width={40}
              height={40}
              alt="Archived Tickets"
            />
          </SidebarItem>

          <SidebarItem title="DMS" onClick={ondmsnew}>
            <img src={dmsImg} width={40} height={40} alt="DMS" />
          </SidebarItem>

          <SidebarItem
            title="Transaction Documents"
            onClick={onTransactionDocs}
          >
            <img
              src={transactionImg}
              width={40}
              height={40}
              alt="Transaction Documents"
            />
          </SidebarItem>

          <SidebarItem title="Profile" onClick={onProfile}>
            <Progress
              type="circle"
              size={35}
              percent={customerProfile?.profileCompletedRatio || 0}
              strokeColor={customerProfile?.profileCompletedRatioColor}
            />
          </SidebarItem>

          {showUpcoming && (
            <SidebarItem
              title="Upcoming Renewal / Payout"
              onClick={onRupeeClick}
            >
              <img
                src={upcomingImg}
                width={40}
                height={40}
                alt="Upcoming Renewal"
              />
            </SidebarItem>
          )}
          <SidebarItem title="Policy Enquiry" onClick={onPolicyEnquiry}>
            <span className="sidebar-btn" aria-label="Policy Enquiry">
              <i
                className="bi bi-person-fill-gear"
                style={{ color: "#e53935", fontSize: 30 }}
              />
            </span>
          </SidebarItem>
           <SidebarItem title="Historical Communication" onClick={onHistorical}>
           <span
              onClick={onHistorical}
              className="sidebar-btn"
              aria-label="Historical Communication"
            >
              <img src={scrollImg} width={40} height={40} alt="History" />
            </span>
          </SidebarItem>
        </WidgetGroup>

        {/* Group 4 */}
        {/* <div className="item">
          <Tooltip
            placement={TOOLTIP_PLACEMENT}
            title="Historical Communication"
          >
            <span
              onClick={onHistorical}
              className="sidebar-btn"
              aria-label="Historical Communication"
            >
              <img src={scrollImg} width={40} height={40} alt="History" />
            </span>
          </Tooltip>
        </div> */}

        {/* Added by Akshada: PolicyEnquiry - Add as last widget */}
        {/* <div className="item">
          <Tooltip placement={TOOLTIP_PLACEMENT} title="Policy Enquiry">
            <span
              onClick={onPolicyEnquiry}
              className="sidebar-btn"
              aria-label="Policy Enquiry"
            >
              <i
                className="bi bi-person-fill-gear"
                style={{ color: "#e53935", fontSize: 30 }}
              />
            </span>
          </Tooltip>
        </div> */}
      </div>
    </aside>
  );
};

export default SidebarWidgets;
