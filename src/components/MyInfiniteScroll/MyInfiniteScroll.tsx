import React from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
const Wrapper = styled.div`
	overflow: auto;
	height: ${(props: { height: number }) => props.height + 'px'};
`;

const Footer = styled.footer`
	color: #ddd;
	font-size: 14px;
`;
interface IProps {
	totalCounts: number;
	loadMore: () => void;
	loading: boolean;
	hasMore: boolean;
	children: React.ReactNode;
	height: number;
}
export const MyInfiniteScroll = ({
	children,
	loadMore,
	loading,
	hasMore,
	totalCounts,
	height,
}: IProps) => {
	return (
		<Wrapper height={height}>
			<InfiniteScroll
				initialLoad={false}
				pageStart={0}
				loadMore={loadMore}
				hasMore={!loading && hasMore}
				useWindow={false}>
				<Spin spinning={loading} delay={300}>
					{children}
				</Spin>
			</InfiniteScroll>
			{totalCounts !== 0 && (
				<Footer>已获取了{totalCounts}条动态，貌似没有了哦!</Footer>
			)}
		</Wrapper>
	);
};
