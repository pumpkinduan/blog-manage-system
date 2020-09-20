import React from "react";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import "./index.scss";
interface IProps extends InputProps {
	width?: string;
}
class CutomInput extends React.PureComponent<IProps> {
	render() {
		const {
			prefix = "",
			placeholder,
			width = "100%",
			onChange,
			value,
		} = this.props;
		return (
			<div className="custom-input" style={{ width: width || "100%" }}>
				<Input
					value={value}
					onChange={onChange}
					autoFocus={true}
					placeholder={placeholder}
					prefix={prefix}
					className="override-ant-input-affix-wrapper"
				/>
			</div>
		);
	}
}
export default CutomInput;
