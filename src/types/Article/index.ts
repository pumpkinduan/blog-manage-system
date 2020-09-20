// 文章列表的每一个item具备的属性
export interface listItemInterface {
	id: string | number;
	coverUrl: string;
	title: string;
	createdAt: string | number;
	likes: string | number; // 点赞数量
	visitors: string | number; // 访客数量
	comments: string | number; // 留言数量
}
// 文章状态
type published = "published"; // 已发布
type drafted = "drafted"; // 存至草稿
// 一篇文章所具备的属性
export interface articleProps extends listItemInterface {
	status: published | drafted;
	content: string; // 文章内容，格式为html字符串
}
