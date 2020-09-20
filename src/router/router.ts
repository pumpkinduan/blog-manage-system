import { silentLoadable } from "utils/loadable";
export const routers = [
	{
		path: "/dashboard",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/DashBoard/index")),
	},
	{
		path: "/articleList",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/ArticleList/index")),
	},
	{
		path: "/articleCreate",
		exact: true,
		requireAuth: true,
		component: silentLoadable(
			() => import("containers/ArticleCreate/index")
		),
	},
	{
		path: "/comment",
		exact: true,
		requireAuth: true,
		component: silentLoadable(() => import("containers/Comment/index")),
	},
];
