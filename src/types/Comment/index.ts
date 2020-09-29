export interface replyItemProps {
	id: string | number;
	created_at: string;
	content: string;
	avatar: string;
	name: string;
}
export interface commentItemProps extends replyItemProps {
	article_title: string;
	article_cover: string;
	replys: replyItemProps[];
}
