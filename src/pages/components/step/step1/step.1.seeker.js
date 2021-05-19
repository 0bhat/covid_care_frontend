import { Steps, Select , message, Row, Typography, Space, Radio, Spin, Skeleton } from 'antd';
import React from 'react';
import store from 'store';
import styles from '../step.less'
import axios from 'axios';

const {Title} = Typography;
const { Option } = Select;


class Step1Seeker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          fetching: true,
          data: [],
          defaultValueRadio: store.get('seeker').plasma ? 'plasma' : (store.get('seeker').other ? 'other' : undefined),
          selectValue: store.get('seeker').other ? (store.get('seeker').other.service ? store.get('seeker').other.service : []) : [],
        }

        if(store.get('seeker').other) {
            this.state.showOthers = 'block';
        } else {
            this.state.showOthers = 'none';
        }
    }

    componentDidMount() {
        axios.get('http://vc.claytech.in:4433/getServiceTypes')
        .then((data) => {
            this.setState({fetching: false, data: data.data});
        })
    }

    onChange = (val) => {
        let dat = store.get('seeker');
        dat.other.service = val;
        this.setState({selectValue: val});
        store.set('seeker', dat);
    }      

    onRadioSelect = (e) => {
        store.set('seeker', {});
        let dat = {};
        switch(e.target.value.toString()) {
            case 'plasma': {
                dat.plasma = {};
                store.set('seeker', dat);
                this.setState({showOthers: 'none', selectValue: []});
                break;
            }
            case 'other': {
                dat.other = {};
                store.set('seeker', dat);
                this.setState({showOthers: 'block', selectValue: []});
                break;
            }
        }          
    }

    render() {
        return(
            <div className={styles.steps_content}>
                <Spin spinning={this.state.fetching}>
                    <Space direction="vertical" align="center">
                        <Row>
                            <Title level={1}>What are you looking for?</Title>
                        </Row>
                        <Row>
                            <Radio.Group defaultValue={this.state.defaultValueRadio} onChange={this.onRadioSelect} size="large" buttonStyle="solid">
                                <Radio.Button value="plasma">Plasma</Radio.Button>
                                <Radio.Button value="other">Others</Radio.Button>
                            </Radio.Group>
                        </Row>
                        <Row style={{display: this.state.showOthers}}>
                            <Select
                                showSearch
                                allowClear
                                mode="multiple"
                                style={{ width: 400 }}
                                defaultValue={this.state.defaultValueSelect}
                                value={this.state.selectValue}
                                placeholder="Type a service"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {this.state.data.map((dat) => {
                                    return <Option key={dat.id} value={dat.id}>{dat.serviceType}</Option>
                                })}
                            </Select>
                        </Row>
                    </Space>  
                </Spin>         
            </div>
        )
    }
}

export default Step1Seeker;