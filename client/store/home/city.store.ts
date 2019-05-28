import { observable, action } from 'mobx';
import { ColumnProps, SorterResult } from 'antd/lib/table/interface';
import { PaginationConfig } from 'antd/lib/pagination/Pagination';

interface RecordModel {
    name?: string;
    address?: string;
    age?: number;
}

class CityStore {
    @observable
    columns: ColumnProps<RecordModel>[] = [{
        title: 'Name',
        dataIndex: 'name',
        filters: [{
            text: 'Joe',
            value: 'Joe',
        }, {
            text: 'Jim',
            value: 'Jim',
        }, {
            text: 'Submenu',
            value: 'Submenu',
            children: [{
                text: 'Green',
                value: 'Green',
            }, {
                text: 'Black',
                value: 'Black',
            }],
        }],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value: string, record: RecordModel) => record.name.indexOf(value) === 0,
        sorter: (a: RecordModel, b: RecordModel) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    }, {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a: RecordModel, b: RecordModel) => a.age - b.age,
    }, {
        title: 'Address',
        dataIndex: 'address',
        filters: [{
            text: 'London',
            value: 'London',
        }, {
            text: 'New York',
            value: 'New York',
        }],
        filterMultiple: false,
        onFilter: (value: string, record: RecordModel) => record.address.indexOf(value) === 0,
        sorter: (a: RecordModel, b: RecordModel) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
    }];
    
    @observable
    data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }, {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }];

    @action
    onChange<T>(pagination: PaginationConfig, filters: object[], sorter: SorterResult<T>) {
        console.log('params', pagination, filters, sorter);
    }
}

export default new CityStore();
