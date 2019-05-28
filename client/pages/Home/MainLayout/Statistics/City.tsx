import * as React from 'react';
import { Table } from 'antd';
import cityStore from 'store/home/city.store';

export default function city() {
    const {
        columns,
        data,
        onChange
    } = cityStore;
    return (
        <Table columns={columns} dataSource={data} onChange={onChange} />
    );
}
