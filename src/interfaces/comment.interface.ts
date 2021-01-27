type User = {
    id: string;
    username: string;
    avatar: string;
}
export type Reply = Pick<BasicComment, 'id' | 'createdAt' | 'content'> & { targetUser: User; sourceUser: User };

export enum COMMENT_TYPE {
    POST = 'POST',
    ADMIN = 'ADMIN',
    ALL = 'ALL'
}
export interface BasicComment {
    id: string;
    content: string;
    createdAt: string;
    replies: Reply[];
    sourceUser: User;
}
export type CreateComment = {
    content: string;
    postId: string
}
