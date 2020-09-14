// 文章列表的每一个item具备的属性
export interface listItemInterface {
	id: string | number;
	coverUrl: string;
	title: string;
	createdAt: string | number;
	likes: string | number;
	visitors: string | number;
	comments: string | number;
}
