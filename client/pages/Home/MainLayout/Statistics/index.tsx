import * as React from "react";
import City from './City';
import Community from './Community';
import "./style.pcss";

export default class Statistics extends React.Component<any, any> {

    render() {
        return (
            <div className="statistics">
                <div className="form">
                    <div className="title">城市排行榜</div>
                    <City />
                </div>
                <div className="form">
                    <div className="title">社区排行榜</div>
                    <Community />
                </div>
            </div>
        )
    }
}
