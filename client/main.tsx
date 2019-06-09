import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import Router from "routers/index";
import "common/icon/iconfont.js";
import "common/style/common.pcss";

// render react DOM
ReactDOM.render(
    <Provider>
        <Router />
    </Provider>,
    document.getElementById("root")
);
