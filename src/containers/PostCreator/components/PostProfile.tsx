import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import CustomInput from 'common/Input/index';
import { Form, Select, Tag } from 'antd';
import { setLocalStorage, getLocalStorage } from 'utils';
import BasicFormItem from 'common/BasicFormItem';
import { useForm, FormInstance } from 'antd/lib/form/Form';
import { CreatePost } from 'interfaces/post.interface';
import './style.scss';
const tagOptions = [
	{ value: 'NodeJs' },
	{ value: 'JavaScript' },
	{ value: 'TypeScript' },
	{ value: 'CSS' },
	{ value: 'React' },
	{ value: 'VueJs' },
	{ value: '运动' }
];
const categoryOptions = [
	{ value: '前端' },
	{ value: '后端' },
	{ value: '生活' },
	{ value: '数据库' },
	{ value: '阅读' },
	{ value: '闲言细语' }
];
const tagRender = (props) => {
	const { label, closable, onClose } = props;
	return (
		<Tag color="purple" closable={closable} onClose={onClose}>
			{label}
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
		name: 'tags',
		className: 'article-tag',
		label: 'Tags',
		controller: (
			<Select
				bordered={false}
				dropdownClassName="custom-dropdown"
				mode="tags"
				style={{ width: '50%' }}
				placeholder="标签"
				tagRender={tagRender}
				options={tagOptions}
			/>
		)
	},
	{
		name: 'category',
		className: 'article-category',
		label: 'Category',
		controller: (
			<Select
				dropdownClassName="custom-dropdown"
				style={{ width: '200px' }}
				placeholder="分类"
				options={categoryOptions}
			/>
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
	getFormInstance: () => FormInstance<
		Omit<CreatePost, 'content' | 'coverUrl'>
	>;
}
export const PostProfile = forwardRef<PostProfileExposed>((props, ref) => {
	const [form] = useForm<Omit<CreatePost, 'content' | 'coverUrl'>>();
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
