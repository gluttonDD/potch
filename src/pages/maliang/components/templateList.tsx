import { useEffect } from 'react';
import { Input, Pagination, Row, Col, Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { If } from 'babel-plugin-jsx-control-statements';
import styles from '../index.less';
import MaterialRequest from '../../requests/materialRequest';
import useMaterialsManageModal from '../../model';

const { Search } = Input;

const TemplateList = () => {

  const materialManage = useMaterialsManageModal();
  const { materialTemList = {}, switchMaterialData, getTemListRequest, setMaterialsData, materialsData } = materialManage;
  const { dataList = [], totalCount, currentPage } = materialTemList;
  const getTemInfoRequest = useRequest(MaterialRequest.getTemplateInfo, {
    manual: true,
    onSuccess: (result) => {
      switchMaterialData(result.data)
    }
  })
  const onTemplateSearch = (value) => {
    getTemListRequest.run({name: value});
  }
  const showSwitchConfirm = (specialTemplateId) => {
    if (materialsData && materialsData.layout) {
      Modal.confirm({
        title: '确认替换当前模板?',
        okText: '确认',
        icon: <ExclamationCircleOutlined />,
        content: '将不会保留之前编辑的结果，请提前做好保存',
        onOk() {
          getTemInfoRequest.run({ specialTemplateId })
        },
        onCancel() {
        },
      });
    } else {
      getTemInfoRequest.run({ specialTemplateId })
    }
  }
  useEffect(() => {
    getTemListRequest && getTemListRequest.run();
  }, [])
  return (
    <div className={styles.templateArea}>
      <Search
        placeholder="搜索底片名称"
        onSearch={onTemplateSearch}
        size="small"
      />
      <div className={styles.templateList}>
        <div className={styles.titleArea}>
          <h3 className={styles.title}>模板</h3>
          <Button size="small" type="primary" onClick={() => { setMaterialsData({editable: true}) }}>新增模板</Button>
        </div>
        <Row>
        {
          dataList?.map((item) => {
            return (
              <Col
          span={12}
          align="middle"
          className={styles.temListRow}
          key={item.templateId}
          onClick={() => showSwitchConfirm(item.templateId)}
          >
          <img src={item.templateUrl} className={styles.thumbnail} />
          <div>{item.name}</div>
          </Col>
          )
          })
        }
        </Row>
        <If condition={dataList && dataList.length > 0}>
          <Pagination
            size="small"
            simple
            total={totalCount}
            showTotal={total => `共${total}条`}
            pageSize={10}
            current={currentPage}
            onChange={(page, pageSize) => getTemListRequest.run({ pageIndex: page })}
          />
        </If>
      </div>
    </div>
  )
}

export default TemplateList;
