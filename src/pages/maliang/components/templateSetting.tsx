import { useState, useEffect, useRef } from 'react';
import { Row, Col, Input, Button, InputNumber, Checkbox, Radio, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, BoldOutlined,
  ItalicOutlined, UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color'
import { If } from 'babel-plugin-jsx-control-statements'
import { isEmpty } from 'lodash';
import html2canvas from "html2canvas";
import styles from '../index.less';
import FileUpload from './uploads';
import { dataUrlToFile, fontFamilyMap } from '../constants';
import useMaterialsManageModal from '../hoxModel';

const { Search } = Input;

const TemplateSetting = (props) => {

  const { refName } = props;
  const [isShowColor, setShowColor] = useState(false);
  const [textData, setText] = useState({});
  const [imgData, setImg] = useState({});
  const titleName = useRef();

  const materialManage = useMaterialsManageModal();
  const { addComBoxInfo, updateBoxInfo, updateImgUrl, updateMaterialData, materialsData } = materialManage;
  const { editable, templateUrl, layout = {}, name, currentName, currentActiveBox, templateId, saveAsNew } = materialsData;
  const { comBoxInfo = [], bgUrl, width, height } = layout;
  const textValueChange = (value) => {setText({...textData, ...value})};
  const imgValueChange = (value) => {setImg({...imgData, ...value})};
  const currentBox = comBoxInfo[currentActiveBox] || {};
  /**
   * 点击按钮增加一个矩形框并清空输入值；如果未上传底片不允许添加
   */
  const buttonClick = (type) => {
    if (bgUrl) {
      const data = type === 'text' ? textData : imgData;
      addComBoxInfo({...data, type});
      setText({});
    } else {
      message.error('请先上传底片')
    }
  }

  const fontStyleChange = (value) => {
    let excludeStyle = '';
    if (currentBox && value.includes('underline') && value.includes('lineThrough')) {
      excludeStyle = currentBox.fontStyle.includes('underline') ? 'underline' : 'lineThrough';
    }
    const fontStyle = value.filter((item) => item !== excludeStyle);
    updateBoxInfo(currentActiveBox, {fontStyle});
  }

  const templateSave = ({ saveAsNew }) => {
    const nameValue = titleName.current.state.value;
    if (nameValue && nameValue.length > 20) {
      message.error('模板标题不可超过20字符');
      return;
    }
    if (nameValue || (!saveAsNew && templateId !== undefined)) {
      updateMaterialData({ editable: false, saveAsNew })
    } else {
      message.error('请输入模板标题')
    }
  }

  useEffect(() => {
    if (bgUrl && !editable) {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop; // 获取页面滚动高度
      html2canvas(refName.current, {
        useCORS: true,
        width,
        height,
        scrollY: -scrollTop,
        scrollX: 0,
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        updateMaterialData({ templateUrl: dataURL })
     /*   if (dataURL !== "" && bgUrl && !editable) {
          const file = dataUrlToFile(dataURL)
          // 生成FormData对象
          let fd = new FormData();
          // 注：此处 file 应和后台接收参数匹配
          fd.append('upload', file, Date.now() + '.png');
        }*/
      });
    }
  }, [editable])

  const fileUploda = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      let bgUrl = this.result;
      updateImgUrl(bgUrl);
    }
  }
  return (
    <If condition={!isEmpty(materialsData)}>
      <div className={styles.settingArea}>
        <h3 className={styles.settingTitle}>编辑区</h3>
        <input type="file" onChange={fileUploda} />
        <FileUpload
          fileType={'image/jpg、image/jpeg、image/png'}
          limit={10}
          onSucCallback={(bgUrl) => { updateImgUrl(bgUrl); }}
          className={styles.temUpload}
        />
        <div
          className={styles.operArea}
          style={editable && layout.bgUrl ? {} : { display: 'none'}}
        >
          <div>
            <h4 className={styles.settingTitle}>自定义文本组件</h4>
            <Row gutter={8}>
              <Col>
                <InputNumber min={1} max={999} style={{width: 66}} placeholder="宽" value={textData.width} onChange={(v) => textValueChange({ width: v })}/>
              </Col>
              <Col>
                <InputNumber min={1} max={999} style={{width: 66}} placeholder="高" value={textData.height} onChange={(v) => textValueChange({ height: v })}/>
              </Col>
              <Button
                disabled={!(textData.width > 1 && textData.height > 1)}
                onClick={() => buttonClick('text')}
              >
                添加
              </Button>
            </Row>
          </div>
          <div>
            <h4 className={styles.settingTitle}>替换图片组件</h4>
            <Row gutter={8}>
              <Col>
                <InputNumber min={1} max={999} style={{width: 66}} placeholder="宽" value={imgData.width} onChange={(v) => imgValueChange({ width: v })}/>
              </Col>
              <Col>
                <InputNumber min={1} max={999} style={{width: 66}} placeholder="高" value={imgData.height} onChange={(v) => imgValueChange({ height: v })}/>
              </Col>
              <Button
                disabled={!(imgData.width > 1 && imgData.height > 1)}
                onClick={() => buttonClick('img')}
              >
                添加
              </Button>
            </Row>
          </div>
        </div>
        <div
          className={styles.operArea}
          datakey="operTextArea"
          style={!isNaN(currentActiveBox) && currentBox.type === 'text' ? {} : { display: 'none'}}
        >
          <h4 className={styles.settingTitle}>设定文本格式</h4>
          <div className={styles.settingTitle}>字体</div>
          <Select
            style={{ width: '84%' }}
            value={currentBox.fontFamily || ''}
            onChange={(value) => {updateBoxInfo(currentActiveBox, {fontFamily: value})}}>
            {
              fontFamilyMap.map((item) => {
                return (
                  <Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
          <div className={styles.settingTitle}>
            字号
          </div>
          <InputNumber
            style={{ width: '84%' }}
            min={1}
            value={currentBox.fontSize == undefined ? 14 : currentBox.fontSize}
            onChange={(value) => {updateBoxInfo(currentActiveBox, {fontSize: value})}}
          />
          <div className={styles.checkboxButtonGroup}>
            <Checkbox.Group
              value={currentBox.fontStyle}
              onChange={fontStyleChange}
            >
              <Checkbox value="bold"><BoldOutlined /></Checkbox>
              <Checkbox value="italic"><ItalicOutlined /></Checkbox>
              <Checkbox value="underline"><UnderlineOutlined /></Checkbox>
              <Checkbox value="lineThrough"><StrikethroughOutlined /></Checkbox>
            </Checkbox.Group>
          </div>
          <div>
            <Radio.Group
              value={currentBox.textAlign}
              onChange={(e) => { updateBoxInfo(currentActiveBox, {textAlign: e.target.value}); }}
            >
              <Radio.Button value="left"><AlignLeftOutlined /></Radio.Button>
              <Radio.Button value="center"><AlignCenterOutlined /></Radio.Button>
              <Radio.Button value="right"><AlignRightOutlined /></Radio.Button>
            </Radio.Group>
          </div>
          <div className={styles.colorPicker}>
            <h4 className={styles.settingTitle}>颜色</h4>
            <div
              className={styles.swatch}
              style={{background: currentBox.color || '#000000d9' }}
              onClick={ () => {setShowColor(true)}
              }>
            </div>
            {
              isShowColor ?
              <div className={styles.popover}>
                <div className={styles.cover} onClick={ () => {setShowColor(false)} } />
                <SketchPicker
                  color={currentBox.color == undefined ? '#000000d9' : currentBox.color}
                  onChange={(color) => {updateBoxInfo(currentActiveBox, {color: color.hex}); }}
                />
              </div> : null
            }
          </div>
        </div>
        <div className={styles.btnGroup}>
          <Input
            ref={titleName}
            value={ currentName || name }
            onChange={(e) => { updateMaterialData({ currentName: e.target.value }) }}
            placeholder="输入模板标题"
          />
          <Row>
            <If condition={!editable}>
              <Col>
                <Button onClick={() => { updateMaterialData({ editable: true }) }}>编辑</Button>
              </Col>
            </If>
            <If condition={editable}>
              <Col>
                <Button onClick={templateSave}>保存</Button>
              </Col>
            </If>
            <If condition={!!templateId && editable}>
              <Col>
                <Button onClick={() => templateSave({ saveAsNew: true })}>另存</Button>
              </Col>
            </If>
            <If condition={templateUrl}>
              <Col>
                <Button><a href={templateUrl} download={'img'}>下载</a></Button>
              </Col>
            </If>
          </Row>
        </div>
      </div>
    </If>
  )
}

export default TemplateSetting;
