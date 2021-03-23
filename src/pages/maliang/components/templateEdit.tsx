import React, { useState } from 'react';
import { Row, Col, Input, Button, Tooltip, Popover } from 'antd';
import { useRef } from 'react';
import {Rnd} from 'react-rnd';
import { Choose, When, Otherwise } from 'babel-plugin-jsx-control-statements'
import { useClickAwayInRange } from '@/customerHooks/useClickAwayInRange';
import TemplateSetting from './templateSetting';
import FileUpload from './uploads';
import { mapFontStyle } from '../constants';
import styles from '../index.less';

const { TextArea } = Input;

import useMaterialsManageModal from '../hoxModel';

const TemplateEdit = () => {

  const [isDelete, setShowDelete] = useState('');
  const templateToCanvas = useRef();
  const templateOperArea = useRef();
  const materialManage = useMaterialsManageModal();
  const { updateBoxInfo, deleteBoxInfo, materialsData } = materialManage;
  const { layout = {}, name, editable, currentActiveBox } = materialsData;
  const { comBoxInfo = [], width, height, bgUrl } = layout;
  useClickAwayInRange(
    (e) => {
    if (!isNaN(currentActiveBox)) {
      updateBoxInfo(currentActiveBox, { editable: false })
    }
  },
    [
      () => document.querySelector(`[datakey=box-${currentActiveBox}]`),
    ], templateOperArea);
  const dragStop = (i, e, d, ) => {
    updateBoxInfo(i, {top: d.y, left: d.x})
  }
  const resizeStop = (i, ref, position) => {
    const width = parseInt(ref.style.width) - 4;
    const height = parseInt(ref.style.height) - 4;
    updateBoxInfo(i, {top: position.y, left: position.x, width, height})
  }

  const content = (
    <div>
      <p>1、双击组件框可以进入编辑模式，可以输入文字或者上传图片</p>
      <p>2、点击当前编辑组件之外的其他模板区域，可以退出编辑模式 </p>
      <p>3、编辑模式下组件不能拖拽和扩大缩小 </p>
    </div>
  );
  // 图片编辑，边框拖拽后宽度问题待解决
  return (
    <Row className={styles.templateEditArea}>
      <Col flex="auto" ref={templateOperArea}>
        <h3 className={styles.materialTitle}>
          {bgUrl && (`${name || '新上传底片'}(宽：${width}; 高：${height})`)}
          {
            bgUrl && (
              <Popover content={content} className={styles.tips}>
                <span>温馨提示</span>
              </Popover>
            )
          }
          </h3>
        <div>
          {
            bgUrl &&
            <div
              ref={templateToCanvas}
              className={styles.templateBgArea}
              style={{width: width, height: height}}
            >
              <img crossOrigin="anonymous" src={bgUrl} />
              <Choose>
                <When condition={editable}>
                  {
                    comBoxInfo.map((item, i) => {
                      const fontStyles = mapFontStyle(item.fontStyle, {fontSize: item.fontSize, color: item.color, textAlign: item.textAlign, fontFamily: item.fontFamily })
                      return (
                        <Choose>
                          <When condition={!item.editable}>
                           {/* <Tooltip title={item.type === 'text' ? '双击修改文字' : '双击替换图片'} getPopupContainer={() => (templateToCanvas.current)}>*/}
                            <Rnd
                              key={`box-${i}`}
                              className={`${styles.box}`}
                              size={{ width: item.width + 4, height: item.height + 4 }}
                              position={{ x: item.left, y: item.top }}
                              style={fontStyles}
                              onDragStop={(e, d) => {dragStop(i, e, d)}}
                              onResizeStop={(e, direction, ref, delta, position) => {resizeStop(i, ref, position)}}
                              onMouseEnter={() => setShowDelete(i)}
                              onMouseLeave={() => setShowDelete('')}
                              onDoubleClick={() => { updateBoxInfo(i, { editable: true }) }}
                            >
                              {item.type === 'text' ? <span>{item.value}</span> :
                                <img draggable='false' src={item.value} style={{width: item.width, height: item.height}} />}
                              {
                                isDelete === i && !item.editable &&
                                <Button size="small" className={styles.deleteButton} onClick={() => deleteBoxInfo(i)}>删除</Button>
                              }
                            </Rnd>
                           {/* </Tooltip>*/}
                          </When>
                          <Otherwise>
                            <Choose>
                              <When condition={item.type === 'text'}>
                                <TextArea
                                  key={`box-${i}`}
                                  datakey={`box-${i}`}
                                  className={`${styles.textBox}`}
                                  style={{ ...fontStyles, width: item.width, height: item.height, left: item.left, top: item.top }}
                                  onChange={(e) => { updateBoxInfo(i, { value: e.target.value }) }}
                                  value={item.value}
                                />
                              </When>
                              <Otherwise>
                                <FileUpload
                                  key={`box-${i}`}
                                  datakey={`box-${i}`}
                                  value={item.value}
                                  className={`${styles.imageBox}`}
                                  style={{ width: item.width, height: item.height, left: item.left, top: item.top }}
                                  listType="picture-card"
                                  onSucCallback={(value) => { updateBoxInfo(i, {value}); }}
                                />
                              </Otherwise>
                            </Choose>
                          </Otherwise>
                        </Choose>
                      )
                    })
                  }
                </When>
                <Otherwise>
                  {
                    comBoxInfo.map((item, i) => {
                      const fontStyles = mapFontStyle(item.fontStyle, {fontSize: item.fontSize, color: item.color, textAlign: item.textAlign, fontFamily: item.fontFamily })
                      return (
                        <Choose>
                          <When condition={item.type === 'text'}>
                            <div
                              key={`box-${i}`}
                              style={{...fontStyles, position: 'absolute', width: item.width, height: item.height, left: item.left, top: item.top}}
                            >
                              {item.value}
                            </div>
                          </When>
                          <Otherwise>
                            <img
                              key={`box-${i}`}
                              src={item.value}
                              crossOrigin="anonymous"
                              style={{position: 'absolute', width: item.width, height: item.height, left: item.left, top: item.top}}
                            />
                          </Otherwise>
                        </Choose>
                      )
                    })
                  }
                </Otherwise>
              </Choose>
            </div>
          }
        </div>
      </Col>
      <Col flex="240px">
        <TemplateSetting refName={templateToCanvas} />
      </Col>
    </Row>
  )
}

export default TemplateEdit;
