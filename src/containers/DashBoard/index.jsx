import React from "react";
import { connect } from "react-redux";
import Statics from '../../components/DashBoard/Statics/index'
import {
  TeamOutlined,
  LikeOutlined,
  CommentOutlined,
  UploadOutlined,
} from "@ant-design/icons";
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statics: [
        {
          title: "网站访问量",
          counts: 150,
          icon: <TeamOutlined />,
        },
        {
          title: "文章获赞数",
          counts: 120,
          icon: <LikeOutlined />,
        },
        {
          title: "留言数",
          counts: 45,
          icon: <CommentOutlined />,
        },
        {
          title: "文章下载量",
          counts: 15,
          icon: <UploadOutlined rotate={180} />,
        },
      ],
    };
  }
  componentDidMount() {
    // request api
  }
  render() {
    const { statics } = this.state;
    return (
      <div className="dashboard-container">
          <Statics data={statics} />
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//     return {
//         likes: state.likes,
//         visitors: state.visitors,
//         comments: state.comments,
//         downloads: state.downloads
//     }
// }
export default connect()(DashBoard);
