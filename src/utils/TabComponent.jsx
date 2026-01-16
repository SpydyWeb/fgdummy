// TabComponent.js
import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const TabComponent = ({ tabs, handleTabChange, activeTab,tabPosition }) => {
    return (
        <Tabs activeKey={activeTab} onChange={handleTabChange} tabPosition={tabPosition} type="card">
            {tabs.map(tab => (
                <TabPane tab={tab.title} key={tab.key} />
            ))}
        </Tabs>
    );
};

export default TabComponent;
