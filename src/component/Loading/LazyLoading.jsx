import React,{useEffect} from 'react'
import "nprogress/nprogress.css"
import NProgress from 'nprogress'


export default function LazyLoading() {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    });

    return '';

}
