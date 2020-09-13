// 配合react用于路由懒加载

import Loadable from 'react-loadable'
import Loading from '../components/Loading'

// 有加载动画
export function loadable(loader, loading = Loading, delay = 250, timeout = 10000) {
    return Loadable({
        loader,
        loading,
        delay,
        timeout
    })
}

// 无加载动画
export function silentLoadable(loader, delay = 250, timeout = 10000) {
    const LoadableComponent = Loadable({
        loader,
        loading: () => null,
        delay,
        timeout
    })
    return LoadableComponent;
}