import React from "react";
import CustomInput from "../../../common/Input/index";
import "./index.scss";

const ArticlInfo = (props) => {
  const {
    handleTitleChange,
    handleAuthorChange,
    handleTagChange,
    handleDescChange,
  } = props;
  return (
    <div className="articl-info-container">
      <div className="article-title">
        <CustomInput
          onChange={handleTitleChange}
          placeholder="请拟个文章标题"
          width="40%"
          prefix="Title:"
        />
      </div>
      <div className="article-author">
        <CustomInput
          onChange={handleAuthorChange}
          placeholder="请输入作者"
          width="20%"
          prefix="Author:"
        />
      </div>
      <div className="articla-tag">
        <CustomInput
          onChange={handleTagChange}
          placeholder="请输入文章分类"
          width="20%"
          prefix="Tag:"
        />
      </div>
      <div className="article-description">
        <CustomInput
          onChange={handleDescChange}
          placeholder="请简要描述文章"
          prefix="Description:"
        />
      </div>
      
    </div>
  );
};
export default ArticlInfo;
