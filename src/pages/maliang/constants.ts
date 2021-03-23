export const randomNum = (minNum: number, maxNum: number) => {
  if (isNaN(maxNum)) {
    return parseInt(Math.random()*minNum+1,10);
  }
  if (isNaN(minNum) && isNaN(maxNum)) {
    return 0;
  }
  return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
}

const styleMap = {
  'bold': { fontWeight: 'bold' },
  'italic': {fontStyle: 'italic'},
  'underline': {textDecoration: 'underline'},
  'lineThrough': {textDecoration: 'line-through'},
}
export const mapFontStyle = (fontStyle: Array = [], otherStyle) => {
  let style = {...otherStyle};
  fontStyle.forEach((item) => {
    style = {...style, ...styleMap[item]}
  })
  return style;
}

export const base64toFile = (dataurl, filename = 'file') => {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}


export const dataUrlToFile = (dataUrl, fileName) => {
  const blob = dataURLtoBlob(dataUrl);
  return blobToFile(blob, fileName = 'upload');
}

//将base64转换为blob
const dataURLtoBlob = (dataUrl) => {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

//将blob转换为file
const blobToFile = (theBlob, fileName) => {
  let bolb = theBlob;
  bolb.lastModifiedDate = new Date();
  bolb.name = fileName;
  return bolb;
}

export const fontFamilyMap = [
  {name: '默认', value: ''},
  {name: '思源黑体', value: 'SourceHanSansCN'},
  {name: '思源宋体', value: 'SourceHanSerifSC'},
]
