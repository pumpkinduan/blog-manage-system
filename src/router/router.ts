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
		path: "/postCreator",
		exact: false,
		requireAuth: true,
		component: silentLoadable(() => import("containers/PostCreator")),
	},
	{
		path: "/comment",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/Comment")),
	},
	{
		path: "/personalCenter",
		exact: false,
		requireAuth: true,
		component: silentLoadable(() => import("containers/PersonalCenter")),
	},
];
