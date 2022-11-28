import React from 'react';
import "./TabList.css"

const Tab = (props) => {
    const tabName = props.tab.tabName;
    const isOn = props.tab.isOn;
    const tabId = props.tab.id;

    const changeTab = () => {
        document.querySelector('.tabList li a.on').classList.remove('on');
        document.querySelector('.tabList li a#' + tabId).classList.add('on');
    }

    return(
        <li role="presentation" style={{minWidth: props.minWidth + 'px'}}>
            <a href="#" 
                role="tab" 
                tabIndex="0" 
                id={tabId}
                aria-selected={isOn.toString()} 
                className={isOn ? 'on' : ''}
                onClick={changeTab}>
                <span>{tabName}</span>
            </a>
        </li>
    )
};

const TabList = () => {
    const tabList = [
        {tabName: '인기순', id: 'popular', isOn: true},
        {tabName: '최신순', id: 'latest', isOn: false},
        {tabName: '규모순', id: 'bigger', isOn: false},
    ];
    
    // 각 Tab의 넓이 지정
    var minWidth = Math.floor(100 / tabList.length);
    return(
        <div className="tabBox">
            <ul className="tabList" role="tablist">
            {
                tabList &&
                tabList.map(v => {
                    return <Tab key={v.id}
                                tab={v}
                                minWidth={minWidth} />

                })
            }
            </ul>
        </div>
    );
};

export default TabList;