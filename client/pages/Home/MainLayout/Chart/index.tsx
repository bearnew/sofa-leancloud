import * as React from "react";
import * as echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import chartStore from 'store/home/chart.store';

import "./style.pcss";

export default class Chart extends React.Component<any, any> {
    componentDidMount() {
        const ec = echarts as any;
        const chartDom: HTMLElement = document.getElementById("chart");
        const myChart = ec.init(chartDom);

        // 绘制图表
        myChart.setOption(chartStore.options);
    }
    render() {
        return <div id="chart"></div>;
    }
}
