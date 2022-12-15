import React, { Component } from 'react'
import './HeaderLogo.css'

export default class HeaderLogo extends Component {
    render() {
        return (
            <div className='header-logo'>
                <a href='/' >
                    <img
                        src='https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg'
                        alt='NotNull'
                    />
                    N<span>ot</span>N<span>ull</span>
                </a>
            </div>
        )
    }
}
