import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import Router from "routers/index";
import "common/icon/iconfont.js";
import "common/style/common.pcss";

// render react DOM
ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Router />
    </LocaleProvider>,
    document.getElementById("root")
);
