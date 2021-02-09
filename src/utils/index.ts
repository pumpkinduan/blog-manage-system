// 公用的工具函数库
export const getLocalStorage = (key: string) => {
	let res = window.localStorage.getItem(key);
	return res && JSON.parse(res);
};

export const setLocalStorage = (key, value) =>
	window.localStorage.setItem(key, JSON.stringify(value));
export const removeLocalStorage = (key) => window.localStorage.removeItem(key);

// 全屏显示
export const setFullScreenStatus = () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
};
// 获取随机索引，索引值在[min,max]范围之间
export const createRandomInclusive = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min) + 1) + min;

// 随机生成颜色
export const createRandomColor = () => {
	let red = createRandomInclusive(0, 255);
	let green = createRandomInclusive(0, 255);
	let blue = createRandomInclusive(0, 255);
	// 避免生成白色
	if (red === 255 && green === 255 && blue === 255) {
		createRandomColor();
	} else {
		return `rgba(${red},${green},${blue})`;
	}
};

export const pick = <T = { [key: string]: any }>(obj: T, keys: (keyof T)[]) => {
	const r: any = {};
	keys.forEach((key) => {
		r[key] = obj[key];
	});
	return r;
};


export const getBase64 = (file: File | Blob): Promise<any> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

/**
 *  压缩图片文件成webp格式
 *  @param target 图片文件
 *  @param quality 压缩的图片质量 (0-1) 1表示最佳质量 
 */
export const compressImage = ({
	file,
	quality = 0.92,
}: { file: File, quality?: number }): Promise<File> => {
	return new Promise((resolve, reject) => {
		/**
		 * 小于1.2M的图片不压缩
		 */
		if (file.size < 1024 * 1024 * 1.2) { resolve(file) }
		/**
		 * 创建 画布
		 */
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		/**
		 * 创建 图片 实例
		 */
		const image = new Image();
		/**
		 * 为上传/下载的文件、流媒体文件生成一个 URL 字符串
		 */
		const url = URL.createObjectURL(file);

		image.src = url;

		image.onload = () => {
			/**
			 * 释放 url 实例
			 */
			URL.revokeObjectURL(url);

			/**
			 * 图片的原始大小
			 */
			canvas.width = image.naturalWidth;
			canvas.height = image.naturalHeight;

			/**
			 * 将得到的图片画到canvas上去
			 */
			context?.drawImage(image, 0, 0, canvas.width, canvas.height);

			canvas.toBlob((blob) => {
				if (!blob) { reject('图片加载错误'); return; };
				resolve(new File([blob], file.name.split('.')[0] + '.webp', { type: 'image/webp', lastModified: Date.now() }));
			}, 'image/webp', quality)
		}

		image.onerror = () => {
			reject('图片加载错误');
		}
	});
}
