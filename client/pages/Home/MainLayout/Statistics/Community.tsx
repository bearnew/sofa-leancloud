import * as React from 'react';
import { Table } from 'antd';
import communityStore from 'store/home/community.store';

export default function Community() {
    const {
        columns,
        data,
        onChange
    } = communityStore;
    return (
        <Table columns={columns} dataSource={data} onChange={onChange} />
    );
}
