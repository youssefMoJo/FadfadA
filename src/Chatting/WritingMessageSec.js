import React from "react";
import { Input } from "antd";
import { SmileOutlined, PaperClipOutlined } from "@ant-design/icons";

const inputStyles = {
  width: "85%",
  borderRadius: "20px",
  float: "right",
  resize: "none",
  textAlign: "center",
  outline: "none",
  marginRight: "10px",
};
const { TextArea } = Input;
const iconsStyles = {
  display: "inline",
  fontSize: "30px",
  marginLeft: "10px",
  outline: "none",
};

class WritingMessageSec extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextArea
            style={{ ...inputStyles }}
            placeholder="Enter Your Message"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </form>
        <SmileOutlined style={{ ...iconsStyles }} />
        <PaperClipOutlined style={{ ...iconsStyles }} />
      </div>
    );
  }
}

export default WritingMessageSec;
