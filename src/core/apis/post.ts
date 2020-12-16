import { PostInterface } from 'interfaces/index.interface';
import server from './server';

export const getPostLists = async (page: number, pageSize: number) => await server.get<PostInterface.BasicPost>('/posts', { page, pageSize });

export const getPostDetail = async (id: string) => await server.get<PostInterface.DetailPost>(`/posts/${id}/comments`);

export const createPost = async (data: PostInterface.CreatePost) => await server.post<PostInterface.BasicPost>('/posts/create', data);

export const updatePost = async (id: string, data: PostInterface.UpdatePost) => await server.put(`/posts/${id}`, data);

export const deletePost = async (id: string) => await server.delete(`/posts/${id}`);
