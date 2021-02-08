import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { server } from 'core/apis';
import { UploadProps } from 'antd/lib/upload';
interface BasicUploadProps extends UploadProps {
	placehloder: string;
}
export const BasicUpload = ({ placehloder, ...rest }: BasicUploadProps) => {
	return (
		<Upload
			action={server.baseURL + server.api_prefix + '/photo/upload'}
			headers={{
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}}
			listType="picture"
			key="upload"
			name="file"
			{...rest}>
			<Button icon={<UploadOutlined />}>{placehloder}</Button>
		</Upload>
	);
};
