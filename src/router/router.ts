import { silentLoadable } from "utils/loadable";
export const routers = [
	{
		path: "/dashboard",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/DashBoard")),
	},
	{
		path: "/postList",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/PostList")),
	},
	{
		path: "/postCreator",
		exact: false,
		requireAuth: true,
		component: silentLoadable(() => import("containers/PostCreator")),
	},
	{
		path: "/postDrafts",
		exact: false,
		requireAuth: true,
		component: silentLoadable(() => import("containers/PostDrafts")),
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
