import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import CustomInput from 'common/Input/index';
import { Form, Select, Tag } from 'antd';
import { setLocalStorage, getLocalStorage } from 'utils';
import BasicFormItem from 'common/BasicFormItem';
import { useForm, FormInstance } from 'antd/lib/form/Form';
import './style.scss';
const options = [
	{ value: 'NodeJs' },
	{ value: 'JavaScript' },
	{ value: '日常' },
	{ value: 'CSS' },
	{ value: 'React' },
	{ value: 'VueJs' }
];
const tagRender = (props) => {
	const { label, value, closable, onClose } = props;
	return (
		<Tag color="purple" closable={closable} onClose={onClose}>
			{props.label}
		</Tag>
	);
};
const items = [
	{
		name: 'title',
		className: 'article-title',
		label: 'Title',
		controller: <CustomInput placeholder="请拟个文章标题" width="40%" />
	},
	{
		name: 'author',
		className: 'article-author',
		label: 'Title',
		controller: <CustomInput placeholder="请输入作者" width="20%" />
	},
	{
		name: 'tag',
		className: 'article-tag',
		label: 'Tags',
		controller: (
			<Select
				bordered={false}
				dropdownClassName="custom-dropdown"
				mode="tags"
				style={{ width: '50%' }}
				placeholder="分类"
				tagRender={tagRender}
				options={options}></Select>
		)
	},
	{
		name: 'description',
		label: 'Description',
		className: 'article-description',
		controller: <CustomInput placeholder="请简要描述文章" />
	}
];
export interface PostProfileExposed {
	getFormInstance: () => FormInstance;
}
export const PostProfile = forwardRef((props, ref) => {
	const [form] = useForm();
	useEffect(() => {
		const post_profile = getLocalStorage('post_profile');
		post_profile && form.setFieldsValue(post_profile);
	}, []);
	useImperativeHandle(ref, () => ({ getFormInstance: () => form }));
	return (
		<Form
			onValuesChange={(changedValues, allValues) => {
				setLocalStorage('post_profile', allValues);
			}}
			form={form}>
			{items.map((item) => (
				<BasicFormItem
					label={item.label}
					hasFeedback={false}
					required={true}
					key={item.name}
					name={item.name}
					customController={item.controller}
				/>
			))}
		</Form>
	);
});
