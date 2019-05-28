import * as React from "react";
import { Menu, Icon, Switch } from "antd";

const SubMenu = Menu.SubMenu;

interface MenuState {
    theme: any;
    current: string;
}

export default class AsideMenu extends React.Component<any, MenuState> {
    state: MenuState = {
        theme: "dark",
        current: "0"
    };
    changeTheme = (checked: Boolean) => {
        this.setState({
            theme: checked ? "dark" : "light"
        });
    };
    handleClick = (e: any) => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    };
    render() {
        return (
            <Menu
                theme={this.state.theme}
                onClick={this.handleClick}
                defaultOpenKeys={["sub1"]}
                selectedKeys={[this.state.current]}
                mode="inline"
            >
                <Menu.Item key="0">概览</Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail" />
                            <span>Navigation One</span>
                        </span>
                    }
                >
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="appstore" />
                            <span>Navigtion Two</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <Icon type="setting" />
                            <span>Navigation Three</span>
                        </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
                <Menu.Item>
                    <Switch
                        checked={this.state.theme === "dark"}
                        onChange={this.changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </Menu.Item>
            </Menu>
        );
    }
}
