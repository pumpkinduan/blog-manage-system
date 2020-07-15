import { silentLoadable } from '../utils/loadable'
export const routers = [{
        path: '/',
        exact: true,
        requireAuth: true,
        component: silentLoadable(
            () =>
            import ('../containers/Home/index'))
    },
    {
        path: '/dashboard',
        exact: true,
        requireAuth: true,
        component: silentLoadable(
            () =>
            import ('../containers/DashBoard/index'))
    },
    // {
    //     path: '/login',
    //     exact: true,
    //     component: silentLoadable(
    //         () =>
    //         import ('../containers/Login/index'))
    // },
    {
        path: '/register',
        exact: true,
        component: silentLoadable(
            () =>
            import ('../containers/Register/index'))
    },

    {
        path: '/*',
        exact: false,
        component: silentLoadable(
            () =>
            import ('../views/Error/index'))
    }
]