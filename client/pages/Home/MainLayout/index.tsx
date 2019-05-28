import * as React from "react";
import { Layout, Breadcrumb } from "antd";
import SvgIcon from "components/common/SvgIcon/index";
import Chart from './Chart/index';
import Statistics from './Statistics/index';
import overviewStore from 'store/home/overview.store';
import './style.pcss';

const { Header, Content, Footer } = Layout;

interface overviewModel {
    icon: string;
    iconColor: string;
    text: string;
    count: number;
    unit: string;
}

interface overviewListState {
    overviewList: overviewModel[]
}

export default class AsideMenu extends React.Component<any, overviewListState> {
    state = {
        overviewList: overviewStore.overviewList
    }
    render() {
        const { overviewList } = this.state;
        return (
            <Layout tagName="main">
                <Header tagName="header">概览</Header>
                <Content tagName="section" style={{ margin: "0 16px" }}>
                    <div className="overview">
                        {
                            overviewList.map((overview, index) => (
                                <div className="overview-item" key={index}>
                                    <SvgIcon type={overview.icon} color={overview.iconColor} size={60} />
                                    <div className="right">
                                        <div className="text">{overview.text}</div>
                                        <div className="amount">{overview.count} {overview.unit}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Chart />
                    <Statistics />
                </Content>
            </Layout>
        );
    }
}
