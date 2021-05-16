import { Form, Select , message, Row, Typography,
     Space, Radio, Spin, Input, InputNumber, 
     Cascader, Result } from 'antd';


import React from 'react';
import store from 'store';
import styles from '../step.less'
import axios from 'axios';

const {Title} = Typography;
const { Option } = Select;


class Step2SeekerPlasma extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          fetching: true,
          data: {},
          dataLength: -1,
        }
    }

    componentDidMount() {
        let dat = store.get('seeker').plasma;
        axios.post('http://vc.claytech.in:4433/getPlasmaResults', dat)
        .then((data) => {
            console.log(data.data);
            this.setState({fetching: false, data: data.data, dataLength: data.data.length});
        })
    }

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'NA'];

        const onFormLayoutChange = () => {

        }
        const onBloodGrouphange = (e) => {
            let dat = store.get('seeker');
            dat.plasma.bloodGroup = e;
            store.set('seeker', dat);
        }

        const onNameChange = (e) => {
            let dat = store.get('seeker');
            dat.plasma.name = e.target.value;
            store.set('seeker', dat);
        }

        const onEmailChange = (e) => {
            let dat = store.get('seeker');
            dat.plasma.email = e.target.value;
            store.set('seeker', dat);
        }

        const onContactNumberChange = (e) => {
            let dat = store.get('seeker');
            dat.plasma.contactNumber = e.target.value;
            store.set('seeker', dat);
        }

        const onCityChange = (e) => {
            let dat = store.get('seeker');
            dat.plasma.city = e[1];
            store.set('seeker', dat);
        }

        function filter(inputValue, path) {
            return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
          }

        return(
            <div className={styles.steps_content}>
                <Spin spinning={this.state.fetching}>
                    {this.state.dataLength == 0 ? 
                    <Result
                        title="No donor found!"
                        subTitle="But please be asured that you will be intimidated as soon as we find a donor!"
                    /> :
                    <Space direction="vertical" align="center">
                        <Row>
                            <Title level={1}>Please enter your details!</Title>
                        </Row>
                        <Row>
                            <Form style={{width: 400}} {...layout}>
                                <Form.Item label="Name">
                                    <Input placeholder="Enter name" onChange={onNameChange}/>
                                </Form.Item>
                                <Form.Item  label="Email">
                                    <Input placeholder="Enter email" onChange={onEmailChange} />
                                </Form.Item>
                                <Form.Item  label="Contact Number">
                                    <Input placeholder="Enter contact number" onChange={onContactNumberChange} />
                                </Form.Item>
                                <Form.Item label="Blood Group">
                                    <Select
                                        showSearch
                                        style={{ textAlign: 'left' }}
                                        defaultValue={null}
                                        placeholder="Select Blood Group"
                                        optionFilterProp="children"
                                        onChange={onBloodGrouphange}
                                        filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {bloodGroups.map((dat) => {
                                            return <Option key={dat} value={dat}>{dat}</Option>
                                        })}                                        
                                    </Select>
                                </Form.Item>
                                <Form.Item label="City">
                                <Cascader
                                    options={this.state.cityOptions}
                                    onChange={onCityChange}
                                    placeholder="Please select city"
                                    showSearch={{ filter }}
                                />
                                </Form.Item>

                            </Form>
                        </Row>
                    </Space>
                    } 
                </Spin>         
            </div>
        )
    }
}

export default Step2SeekerPlasma;