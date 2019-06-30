import * as React from 'react';
import TextInfo from 'components/home/TextInfo/index';
import ImageInfo from 'components/home/ImageInfo/index';
import { Tabs } from 'antd-mobile';

const tabTitles = [
    {
        title: '文字',
    },
    {
        title: '图片'
    }
]
export default class Login extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Tabs
                    tabs={tabTitles}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    <TextInfo />
                    <ImageInfo />
                </Tabs>
            </div>
        );
    }
}
