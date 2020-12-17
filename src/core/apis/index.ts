import { UserInterface, CommentInterface } from 'interfaces/index.interface';
import server from './server';



// 登录与注册
export const login = async (data: UserInterface.loginInterface) => await server.post<{ accessToken: string }>('/login', data);

export const register = async (data: UserInterface.CreateUser) => await server.post('/register', data);

// comment
export const getComments = async (page: number, pageSize: number) => await server.get<CommentInterface.BasicComment[]>('/comments', { page, pageSize });

export const createComment = async (data: CommentInterface.CreateComment) => await server.post<CommentInterface.BasicComment>('/comments/create', data);

export const deleteComment = async (id: string) => await server.delete(`/comments/${id}`);

// user
export const getUsers = async (page, pageSize, type: UserInterface.USER_TYPE) => await server.get<UserInterface.ADMIN[] | UserInterface.NORMAL[]>('/users', {
    page, pageSize, type
});

export const createUser = async (data: UserInterface.CreateUser) => await server.post('/users', data);

export const updateAdminProfile = async (id: string, data: UserInterface.AdminProfiles) => await server.put(`/users/admin/${id}`, data);

export const deleteUser = async (id: string) => await server.delete(`/users/${id}`);

// post
export * from './post'


