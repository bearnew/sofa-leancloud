import * as React from 'react';
import { List, InputItem, Toast } from 'antd-mobile';

export default class TextInfo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            value: '',
            activityName: '',
            shopName: '',
            name: '',
            phone: '',
            advertise: ''
        }
    }
    componentDidMount() {
        this.getActivityInfo();
    }
    getActivityInfo = () => {
        const info = {
            activityName: '哈哈大笑',
            shopName: '沙发',
            name: '苏大强',
            phone: '12345678',
            advertise: '沙发沙发沙发'
        }

        this.setState({
            ...info
        })
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onChange = (value: String) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
    }
    render() {
        const {
            activityName,
            shopName,
            name,
            phone,
            advertise
        } = this.state;
        console.log(activityName)
        return (
            <div>
                <List>
                    <InputItem
                        value={activityName}
                        disabled
                    >
                        活动名:
                    </InputItem>
                    <InputItem
                        value={shopName}
                        disabled
                    >
                        店名:
                    </InputItem>
                    <InputItem
                        value={name}
                        disabled
                    >
                        联系人:
                    </InputItem>
                    <InputItem
                        value={phone}
                        disabled
                    >
                        电话号码:
                    </InputItem>
                    <InputItem
                        value={advertise}
                        disabled
                    >
                        广告语:
                    </InputItem>
                </List>
                <List>
                    <InputItem
                        type="phone"
                        placeholder="input your phone"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}
                    >
                    手机号码
                    </InputItem>
                </List>
            </div>
        );
    }
}
