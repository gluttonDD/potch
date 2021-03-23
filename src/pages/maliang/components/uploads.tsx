import { useState } from 'react';
import { Row, Col, Input, Button, InputNumber, Checkbox, Radio, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, BoldOutlined,
  ItalicOutlined, UnderlineOutlined, StrikethroughOutlined, PlusOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color'
import { Choose, When, Otherwise } from 'babel-plugin-jsx-control-statements'
import styles from '../index.less';

const { Search } = Input;

const FileUpload = (props) => {
  const { listType = 'text', style, className, onSucCallback, value, showUploadList, datakey,
    fileType='image/jpg、image/jpeg、image/png', limit } = props;
  const [fileList, setFileList] = useState([]);

  const beforeUploadFile = (file: { name: string, size: number, type: string}) => {
    return new Promise((resolve, reject) => {
      const acceptType = fileType.split('、');
      const isLimit = file.size / 1024 / 1024 < (limit ? limit : 20)
      if (acceptType.indexOf(file.type) === -1) {
        reject(false);
        message.error(`只能上传${fileType}!`);
      } else if (!isLimit) {
        message.error(`文件不可超过${limit ? limit : 20}M!`)
        reject(false);
      } else {
        resolve(true);
      }
    });
  }
  const defaultProps = {
    name: 'upload',
    listType: listType || 'text',
    fileList: fileList,
    showUploadList: showUploadList || false,
    accept: '.jpg,.jpeg,.png',
    beforeUpload: beforeUploadFile,
    onChange(info) {
      debugger
      const currentList = info.fileList.slice(-1);
      const currentFile = currentList[0];
      const status = currentFile.status;
      if (status === 'done') {
        if (!currentFile.response.isOk) {
          message.error(`${currentFile.name} 上传失败`);
        } else {
          setFileList(currentList);
          onSucCallback(currentFile.response.msg)
          message.success(`${currentFile.name} 上传成功`);
        }
      } else if (status === 'error') {
        message.error(`${currentFile.name} 上传失败`);
      } else if (status === 'removed') {
      }
    },
  };
  return (
    <div className={className} style={style} datakey={datakey}>
      <Upload {...defaultProps}>
        <Choose>
          <When condition={listType === 'text'}>
            <Button icon={<UploadOutlined />}>上传文件</Button>
            <div>jpg、jpeg、png图片，10M内</div>
          </When>
          <Otherwise>
            <Choose>
              <When condition={value}>
                <img src={value} style={{ width: style.width, height: style.height }}/>
              </When>
              <Otherwise>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              </Otherwise>
            </Choose>
          </Otherwise>
        </Choose>
      </Upload>
    </div>
  )
}

export default FileUpload;
