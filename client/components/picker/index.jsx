import React, { Component } from 'react';

export default class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 2
        }
    }
    componentDidMount() {
        const $ul = this.refs.ul;
        const liHeight = this.props.liHeight || 35;
        $ul.addEventListener('touchend', () => {
            console.log('top top top', $ul.scrollTop)
            const scrollTop = $ul.scrollTop + 35 * 2;
            
            // 滑动到一列中间，判断向上或者向下滚动
            const distance = scrollTop % liHeight;
            const isAdd = distance > 17.5 ? 1 : 0;
            const index = Math.floor(scrollTop / liHeight);
            
            console.log('scrollTop', scrollTop)
            console.log('distance', distance)

            this.setState({
                selectedIndex: index + isAdd
            })
            $ul.style.top += '-40px'
        })
    }

    render() {
        return (
            <ul ref="ul">
                {
                    this.props.list.map((item, index) => {
                        return (
                            <li className={index === this.state.selectedIndex ? 'selected' : ''}>{item}</li>
                        )
                    })
                }
                <li>222</li>
            </ul>
        );
    }
}