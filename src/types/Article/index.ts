// 文章列表的每一个item具备的属性
export interface ListItemInterface {
	id: string | number;
	coverUrl: string;
	title: string;
	createdAt: string;
	likes: string | number; // 点赞数量
	visitors: string | number; // 访客数量
	comments: string | number; // 留言数量
}
// 文章状态
export type published = "published"; // 已发布
export type drafted = "drafted"; // 存至草稿
export type updated = "updated";
export type deleted = "deleted";
export type PostStatus = published | drafted | updated | deleted;
export enum STATUS {
	PUBLISHED = "published",
	DRAFTED = "drafted",
	UPDATED = "updated",
	DELETED = "deleted",
}
// 一篇文章所具备的属性
export interface articleProps extends ListItemInterface {
	status: PostStatus;
	author?: string;
	content: string; // 文章内容，格式为html字符串
	description: string;
	tags: string[];
	downloads: number | string;
}
