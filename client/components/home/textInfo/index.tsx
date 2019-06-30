import * as React from 'react';
import { List, TextareaItem, Button, WhiteSpace, Toast } from 'antd-mobile';
import request, { API } from 'utils/request';
import TextArea from './TextArea';
import { storeName } from 'constant/store';
import './style.pcss';

interface StoreInfo {
    activityName: string,
    shopName: string,
    name: string,
    phone: string,
    advertise: string
}

interface TextInfoState {
    defaultVal: StoreInfo;
    currentVal: StoreInfo;
}

export default class TextInfo extends React.Component<any, TextInfoState> {
    constructor(props: any) {
        super(props);
        const obj = {
            activityName: '',
            shopName: '',
            name: '',
            phone: '',
            advertise: ''
        }
        this.state = {
            defaultVal: obj,
            currentVal: obj
        }
    }
    componentDidMount() {
        this.getActivityInfo();
    }
    getActivityInfo = () => {
        request(API.getStoreText, 'get')
            .then((res: any) => {
                this.setState({
                    defaultVal: res.data
                })
            }).catch((err: any) => {
                console.error(err);
            })
    }
    onChangeValue = (item: any, val: any) => {
        console.log(this.state.currentVal)
        this.setState(prevState => ({
            currentVal: {
                ...prevState.currentVal,
                [item]: val
            }
        }));
    }
    save = () => {
        request(API.updateStoreText, 'post', {
            ...this.state.currentVal
        }).then(res => {
            Toast.success(res.msg, 2);
            this.getActivityInfo();
        }).catch(err => {
            console.error(err);
        })
    }
    render() {
        const list = ['activityName', 'shopName', 'name', 'phone', 'advertise'];
        return (
            <div>
                <List renderHeader={() => '修改前'}>
                    {
                        list.map((item?: 'activityName' | 'shopName' | 'name' | 'phone' | 'advertise') => (
                            <TextareaItem
                                key={item}
                                title={`${storeName[item]}:`}
                                value={this.state.defaultVal[item]}
                                disabled
                            />
                        ))
                    }
                </List>
                <List renderHeader={() => '修改后'}>
                    {
                        list.map((item?: 'activityName' | 'shopName' | 'name' | 'phone' | 'advertise') => (
                            <TextArea
                                key={item}
                                item={item}
                                onChangeValue={this.onChangeValue}
                            />
                        ))
                    }
                    <WhiteSpace />
                    <div className="save">
                        <Button type="primary" onClick={this.save}>确认修改</Button>
                    </div>
                </List>
            </div>
        );
    }
}
