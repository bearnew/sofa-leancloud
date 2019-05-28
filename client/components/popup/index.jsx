import React, { Component } from 'react';
import style from './style.pcss';

export default class Popup extends Component {
    render () {
        return (
            <div className={style.wrapper}>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
            </div>
        );
    }
}
