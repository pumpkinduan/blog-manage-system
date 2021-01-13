export enum PHOTO_TYPE {
    POST = 'POST', // 文章的图片
    WALL = 'WALL'// 相册墙
}
export interface CreatePhoto {
    type: PHOTO_TYPE;
}

export interface BasicPhoto {
    id: string;
    path: string;
    createdAt: string;
    originalname: string;
}

