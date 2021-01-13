type User = {
    id: string;
    username: string;
}
type Reply = Pick<BasicComment, 'id' | 'createdAt' | 'content'> & { targetUser: User; sourceUser: User };
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
