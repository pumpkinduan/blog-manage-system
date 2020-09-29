import React, { Component } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
interface IProps {
	placehloder: string;
	getUploadData: (fileList) => void;
}
class PicturesWall extends Component<IProps> {
	state = {
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: [
			{
				uid: '-1',
				name: 'image.png',
				// status: 'success',
				size: 4,
				type: 'png',
				url:
					'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			},
		],
	};

	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle:
				file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		});
	};

	handleChange = ({ fileList }) => {
		this.setState({ fileList });
		this.props.getUploadData(fileList);
	};

	render() {
		const { placehloder } = this.props;
		const {
			previewVisible,
			previewImage,
			fileList,
			previewTitle,
		} = this.state;
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div className="ant-upload-text">{placehloder}</div>
			</div>
		);
		return (
			<div className="clearfix">
				<Upload
					key="upload"
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				<Modal
					visible={previewVisible}
					title={previewTitle}
					footer={null}
					onCancel={this.handleCancel}
				>
					<img
						alt="cover"
						style={{ width: '100%' }}
						src={previewImage}
					/>
				</Modal>
			</div>
		);
	}
}
export default PicturesWall;
