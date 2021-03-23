import { useState, useEffect } from "react";
import { createModel } from "hox";
import { message } from 'antd';
import { randomNum } from './constants';

const defaultData = {
  templateUrl: '',
  name: '',
  editable: true,
  layout: {
    bgUrl: 'http://file.xyz.cn/filesystem/image/11575326',
    width: 513,
    height: 654,
    comBoxInfo: [{
      height: 33,
      left: 58,
      top: 372,
      type: "text",
      width: 146,
      value: '亲爱的朋友们',
      fontStyle: ['bold'],
      fontSize: 18,
    },{
      height: 141,
      left: 1,
      top: 64,
      type: "img",
      width: 172,
      value: 'http://file.xyz.cn/filesystem/image/11575434',
    }]
  }
}

const defaultList = {
  dataList: [],
}
function useMaterialsManage() {
  const [materialsData, setMaterialsData] = useState({editable: true});
  const [materialTemList, setTempList] = useState(defaultList);
  const updateMaterialData = (info) => {
    const { comBoxInfo } = materialsData.layout;
    setMaterialsData({
      ...materialsData,
      currentActiveBox: undefined,
      layout: {
        ...materialsData.layout,
        comBoxInfo: comBoxInfo.map(item => ({...item, editable: false})),
      },
      ...info
    })
  }
  // 切换当前模板信息
  const switchMaterialData = (data) => {
    setMaterialsData({
      ...data,
      editable: true,
      layout: JSON.parse(data.layout),
    })
  }

  // 替换当前模板底片
  const updateImgUrl = (bgUrl) => {
    const { name, templateId } = materialsData;
    let img = new Image();
    img.src = bgUrl;
    img.onload = () => {
      setMaterialsData(
        {
          name,
          templateId,
          editable: true,
          layout: {
            comBoxInfo: [],
            bgUrl,
            width: img.width,
            height: img.height,
          }
        }
        )
    }
  };
  // 新增一个选中框，并随机生成在底片放置位置
  const addComBoxInfo = (box) => {
    const { layout = {} } = materialsData;
    const randomLeft = randomNum(0, layout.width - box.width);
    const randomTop = randomNum(0, layout.height - box.height);
    setMaterialsData({
      ...materialsData,
      layout: {
        ...layout,
        comBoxInfo: [...layout.comBoxInfo, {...box, left: randomLeft, top: randomTop}],
      }
    })
  }
  // 选中框移动或者拉大缩小更新对应的值，如果top和left小于0则直接置为0
  const updateBoxInfo = (i, box) => {
    setMaterialsData((materialsData) => {
      const { layout } = materialsData;
      let boxs = layout.comBoxInfo;
      const currentIndex = Number(i);
      const currentBox = {...boxs[currentIndex], ...box};
      const { left, top, width, height, editable } = currentBox;
      const maxLeft = parseInt(layout.width) - parseInt(width);
      const maxTop = parseInt(layout.height) - parseInt(height);
      const currentLeft = left < 0 ? 0 : (left > maxLeft ? maxLeft : left);
      const currentTop = top < 0 ? 0 : (top > maxTop ? maxTop : top);
      if (editable) {
        // 如果当前box为激活状态，则把其他所有项置为未激活
        boxs = boxs.map(item => ({...item, editable: false}));
      }
      return {
        ...materialsData,
        currentActiveBox: editable ? i : undefined,  // 保存当前激活box
        layout: {
          ...materialsData.layout,
          comBoxInfo: [
            ...boxs.slice(0, currentIndex),
            {...currentBox, left: currentLeft, top: currentTop, editable },
            ...boxs.slice(currentIndex + 1, boxs.length),
          ]
        }
      }
    })
  }

  // 删除当前选择框
  const deleteBoxInfo = (i) => {
    setMaterialsData((materialData) => {
      const boxs = materialData.layout.comBoxInfo;
      const currentIndex = Number(i);
      return {
        ...materialData,
        layout: {
          ...materialData.layout,
          comBoxInfo: [
            ...boxs.slice(0, currentIndex),
            ...boxs.slice(currentIndex + 1, boxs.length),
          ]
        }
      }
    })
  }

  return {
    materialsData,
    materialTemList,
    switchMaterialData,
    addComBoxInfo,
    updateBoxInfo,
    deleteBoxInfo,
    updateImgUrl,
    updateMaterialData,
    setTempList,
    setMaterialsData,
  };
}

export default createModel(useMaterialsManage);
