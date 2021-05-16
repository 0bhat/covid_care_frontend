import { Form, Select , message, Row, Typography,
     Space, Radio, Spin, Input, InputNumber, 
     Cascader, Result, List, Avatar } from 'antd';


import InfiniteScroll from 'react-infinite-scroller';
import styles_this from './step3.seeker.plasma.results.less'



import React from 'react';
import store from 'store';
import styles from '../step.less'
import axios from 'axios';

const {Title} = Typography;
const { Option } = Select;


class Step2SeekerPlasmaResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          fetching: true,
          data: [],
          dataLength: -1,
          hasMore: true,
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

        let listData;
        console.log(this.state.data);

        const handleInfiniteOnLoad = (page) => {
            console.log(this.state.data);
            this.setState({hasMore: false});
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
                            <Title level={1}>We found the following results!</Title>
                        </Row>
                        <Row>
                            <div className={styles_this.demo_infinite_container}>
                            <InfiniteScroll
                                initialLoad={false}
                                pageStart={0}
                                loadMore={handleInfiniteOnLoad}
                                hasMore={this.state.hasMore}
                                useWindow={false}
                            >
                                <List
                                    dataSource={this.state.data}
                                    renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="https://ant.design">{item.donorName}</a>}
                                        description={item.contactNumber}
                                        />
                                        <div>Content</div>
                                    </List.Item>
                                    )}
                                >
                                </List>
                            </InfiniteScroll>
                            </div>
                        </Row>
                    </Space>
                    } 
                </Spin>         
            </div>
        )
    }
}

export default Step2SeekerPlasmaResult;