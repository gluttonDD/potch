import { Row, Col } from 'antd';
import TemplateList from './components/templateList';
import TemplateEdit from './components/templateEdit'
import styles from './index.less';


const MaterialsManage = () => {
  return (
    <div className={styles.materialsManage}>
      <Row>
        {/*<Col flex="200px">
          <TemplateList />
        </Col>*/}
        <Col flex="auto">
          <TemplateEdit />
        </Col>
      </Row>
    </div>
  )
}

export default MaterialsManage;
