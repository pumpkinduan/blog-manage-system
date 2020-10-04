import { silentLoadable } from "utils/loadable";
export const routers = [
	{
		path: "/dashboard",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/DashBoard")),
	},
	{
		path: "/articleList",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/ArticleList")),
	},
	{
		path: "/articleCreate",
		exact: false,
		requireAuth: true,
		component: silentLoadable(() => import("containers/ArticleCreate")),
	},
	{
		path: "/comment",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/Comment")),
	},
	{
		path: "/personalCenter",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/PersonalCenter")),
	},
];
