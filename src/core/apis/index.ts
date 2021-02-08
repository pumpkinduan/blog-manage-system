import { COMMENT_TYPE } from 'interfaces/comment.interface';
import { UserInterface, CommentInterface, PhotoInterface } from 'interfaces/index.interface';
import server from './server';

type User = UserInterface.ADMIN | UserInterface.NORMAL
const defaultParam: Params = { page: 1, pageSize: 10 }
export type Params = { page?: number, pageSize?: number }

// 登录与注册
export const login = async (data: UserInterface.loginInterface) => await server.post<{ accessToken: string }>('/login', data);

export const register = async (data: UserInterface.CreateUser) => await server.post('/register', data);

// comment
export const getComments = async (params: Params & { type?: COMMENT_TYPE } = defaultParam) => await server.get<CommentInterface.BasicComment[]>('/comments', params);

export const createComment = async (data: CommentInterface.CreateComment) => await server.post<CommentInterface.BasicComment>('/comments/create', data);

export const deleteComments = async (ids: string) => await server.delete(`/comments/${ids}`);

export const deleteReplies = async (ids: string) => await server.delete(`/reply/${ids}`);

// user
export const getUsers = async (params: Params & { type: UserInterface.USER_TYPE } = { pageSize: 10, page: 1, type: UserInterface.USER_TYPE.NORMAL }) => await server.get<User[]>('/users', params);

export const getUserProfile = async () => await server.get<User>('/users/profile');

export const createUser = async (data: UserInterface.CreateUser) => await server.post('/users', data);

export const updateAdminProfile = async (data: UserInterface.AdminProfiles) => await server.put(`/users/admin`, data);

export const deleteUser = async (id: string) => await server.delete(`/users/${id}`);

// photo
export const uploadPhoto = async (data: PhotoInterface.CreatePhoto) => await server.post<PhotoInterface.BasicPhoto>('/photo/upload', data);

export const deletePhotoById = async (id: string) => await server.delete(`/photo/${id}`);

export const deletePhotoByPath = async (params: { path: string }) => await server.delete(`/photo`, params);

/**
 * 根据type获取图片
 * @param data { type: POST | WALL }
 * @param page { 当前页面 }
 * @param pageSize { 每页大小 }
 */
export const getPhotos = async (params: Params & { type: PhotoInterface.PHOTO_TYPE } = { pageSize: 10, page: 1, type: PhotoInterface.PHOTO_TYPE.WALL }) => await server.get<PhotoInterface.CreatePhoto>('/photo/upload', params);

// post
export * from './post'

export { default as server } from './server'


