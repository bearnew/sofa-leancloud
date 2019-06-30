import * as React from 'react';
import { List, Button, ImagePicker, WingBlank } from 'antd-mobile';
import request, { API } from 'utils/request';
const AV = require('leancloud-storage');
AV.initialize('EIgBYotIgkBg6gI1Pilq0SAY-9Nh9j0Va', 'TK8nEix64Fy5Baz5tR1wG0Qe');

interface FileInfo {
    name: string;
}

interface FileModel {
    file: FileInfo;
    orientation: Number;
    url: string;
}

interface ImageInfoState {
    files: Array<FileModel>;
}

export default class ImageInfo extends React.Component<any, ImageInfoState> {
    state: ImageInfoState = {
        files: []
    }
    componentDidMount() {
        this.getPicList();
    }
    getPicList = () => {
        request(API.getStorePic, 'get')
            .then((res: any) => {
                this.setState({
                    files: res.data
                })
            }).catch((err: any) => {
                console.error(err);
            })
    }
    onChange = (files: Array<FileModel>) => {
        this.setState({
            files,
        });
    }
    save = async () => {
        const urls: Array<any> = [];
        const files: Array<any> = [];
        const { files: list } = this.state;

        list.map(i => {
            if (i.file) {
                // 需要上传的文件
                files.push(i);
            } else {
                // 无需上传的文件，直接push url
                urls.push(i);
            }
        })

        for (let i = 0; i < files.length; i++) {
            const item = files[i];
            const file = new AV.File(item.file.name, item.file);
            const result = await file.save()
            urls.push({
                url: result.url()
            });
        }

        request(API.updateStorePic, 'post', {
            urls
        }).then((res: any) => {

        }).catch((err: any) => {
            console.error(err);
        })
    }
    render() {
        const { files } = this.state;
        return (
            <WingBlank>
                <List renderHeader={() => '图片上传'}>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        // onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 7}
                        multiple
                    />
                    <div className="save">
                        <Button type="primary" onClick={this.save}>确认修改</Button>
                    </div>
                </List>
            </WingBlank>
        );
    }
}
