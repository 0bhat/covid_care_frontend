import { Steps, Button, message, Row, Typography, Space, Radio } from 'antd';
import store from 'store';
import styles from '../step.less'

const {Title} = Typography;

const Step0 = (props) => {
    const onSelect = (e) => {
        store.clearAll();
        switch (e.target.value.toString()) {
            case 'donor': {
                store.set("donor", {});
                break;
            }
            case 'seeker': {
                store.set("seeker", {});
                break;
            }
            case 'seller': {
                store.set("seller", {});
                break;
            }
        }
    }
    let defaultValue = false;
    if(store.get("donor")) { defaultValue = 'donor';}
    if(store.get("seeker")) { defaultValue = 'seeker';}
    if(store.get("seller")) { defaultValue = 'seller';}
    return (
        <div className={styles.steps_content}>
            <Space direction="vertical" align="center">
                    <Row>
                        <Title level={1}>Are you a Donor, Seeker or Seller?</Title>
                    </Row>
                    <Row>
                    <Radio.Group defaultValue={defaultValue || ''} onChange={onSelect} size="large" buttonStyle="solid">
                        <Radio.Button value="donor">Donor</Radio.Button>
                        <Radio.Button value="seeker">Seeker</Radio.Button>
                        <Radio.Button value="seller">Seller</Radio.Button>
                    </Radio.Group>
                    </Row>
            </Space>           
        </div>
    )
}

export default Step0;