import { TableProps } from 'antd/lib/table';
export interface BaseTableProps<RecordType = any> extends TableProps<RecordType> {
    loading?: boolean;
}
export interface AdvancedTableProps extends BaseTableProps {
    headerControllerConfig: { type: string, component: React.ReactNode }[]
}