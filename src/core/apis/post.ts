import { PostInterface } from 'interfaces/index.interface';
import server from './server';
import { Params } from './'
const defaultParam: Params = { page: 1, pageSize: 10 }
/**
 * 获取文章列表
 */
export const getPostLists = async (params = defaultParam) => await server.get<PostInterface.BasicPost[]>('/posts', params);

/**
 * 获取指定文章详情
 */
export const getPostDetail = async (id: string) => await server.get<PostInterface.DetailPost>(`/posts/${id}/detail`);

/**
 * 获取文章分类
 */
export const getPostCategories = async () => await server.get<PostInterface.Category[]>(`/posts/categories`);
/**
 * 获取文章归档
 */
export const getPostArchives = async () => await server.get<PostInterface.Archive[]>(`/posts/archives`);

/**
 * 获取指定文章下的留言
 */
export const getPostComments = async (id: string, params = defaultParam) => await server.get<PostInterface.DetailPost>(`/posts/${id}/comments`, params);


export const createPost = async (data: PostInterface.CreatePost) => await server.post<PostInterface.BasicPost>('/posts/create', data);

export const updatePost = async (id: string, data: PostInterface.UpdatePost) => await server.put(`/posts/${id}`, data);

export const deletePost = async (id: string) => await server.delete(`/posts/${id}`);
