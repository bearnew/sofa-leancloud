import * as React from 'react';
import { TextareaItem } from 'antd-mobile';
import { storeName, storePlaceholder } from 'constant/store';

interface PropsType {
    item?: 'activityName' | 'shopName' | 'name' | 'phone' | 'advertise';
    onChangeValue: Function;
}

export default function TextArea(props: PropsType) {
    const { item, onChangeValue } = props;
    const onChange = (val: string) => {
        onChangeValue(item, val);
    }
    return (
        <TextareaItem
            title={`${storeName[item]}:`}
            placeholder={`${storePlaceholder[item]}`}
            onChange={onChange}
            autoHeight
        />
    )
}
