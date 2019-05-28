import { observable, action } from 'mobx';

class OverviewStore {
    @observable overviewList = [
        {
            icon: 'icon27',
            iconColor: '#27A9E3',
            text: '用户数量',
            count: 0,
            unit: '人'
        },
        {
            icon: 'iconfenzucopy',
            iconColor: '#28B779',
            text: '团长数量',
            count: 0,
            unit: '人'
        },
        {
            icon: 'iconicon-',
            iconColor: '#FFB748',
            text: '订单数量',
            count: 0,
            unit: '笔'
        },
        {
            icon: 'iconyingyee',
            iconColor: '#DA552A',
            text: '平台营业',
            count: 0,
            unit: '元'
        },
        {
            icon: 'icontuikuan',
            iconColor: '#2255A4',
            text: '平台退款',
            count: 0,
            unit: '元'
        },
        {
            icon: 'iconyongjin',
            iconColor: '#F4516C',
            text: '订单佣金',
            count: 0,
            unit: '元'
        }
    ]
    
    @action
    updateOverview() {
        // this.options = {};
    }
}

export default new OverviewStore();
