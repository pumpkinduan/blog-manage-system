import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { server } from 'core/apis';
import { UploadProps } from 'antd/lib/upload';

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
interface BasicUploadProps extends UploadProps {
	placehloder: string;
}
export const BasicUpload = ({ placehloder, ...rest }: BasicUploadProps) => {
	return (
		<div className="clearfix">
			<Upload
				action={server.baseURL + server.api_prefix + '/photo/upload'}
				listType="picture"
				key="upload"
				name="file"
				{...rest}>
				<Button icon={<UploadOutlined />}>{placehloder}</Button>
			</Upload>
		</div>
	);
};
