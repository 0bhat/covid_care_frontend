import { Form, Select , message, Row, Typography,
     Space, Radio, Spin, Input, InputNumber, 
     Cascader, Result, List, Avatar,
    Card, Tag, Descriptions, Popover  } from 'antd';


import InfiniteScroll from 'react-infinite-scroller';
import styles_this from './step3.seeker.plasma.results.less'



import React from 'react';
import store from 'store';
import styles from '../step.less'
import axios from 'axios';

const {Title} = Typography;
const { Option } = Select;
const { Meta } = Card;




//extra details card
const DetailsCard = (props) => {
    return (
        <Descriptions size="small" style={{marginTop: "20px"}} title="Donor Details">
            <Descriptions.Item label="Blood Group">{props.bloodGroup}</Descriptions.Item>
            <Descriptions.Item label="Contact No.">{props.contactNumber}</Descriptions.Item>
            <Descriptions.Item label="City">{props.city}</Descriptions.Item>
            <Descriptions.Item label="Vaccinated">{props.vaccinated}</Descriptions.Item>
            <Descriptions.Item label="Verified On">{props.verifiedOn}</Descriptions.Item>
            <Descriptions.Item label="Remarks">
                <Popover content={props.remarks} title="Remarks" trigger="hover">
                    <Popover content={props.remarks} title="Remarks" trigger="click">
                        <span style={{color: 'blue'}}>{props.remarks.slice(0, 11)}</span>
                    </Popover>
                </Popover>
            </Descriptions.Item>
        </Descriptions>
    )
}

const ListDiscription = (props) => {
    return (
        <div className={styles_this.list_desc_list}>
            Date of Covid-Recovery: {props.dateOfCovidRecovery}
        </div>
    )
}


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
        const handleInfiniteOnLoad = (page) => {
            console.log(this.state.data);
            this.setState({hasMore: false});
        }
        
        return(
            <div className={styles.steps_content}>
                <Spin className={styles_this.spin} spinning={this.state.fetching}>
                    {this.state.dataLength == 0 ? 
                    <Result
                        title="No donor found!"
                        subTitle="But please be assured that you will be intimated as soon as we find a donor!"
                    /> :
                    <Space className={styles_this.result_space} direction="vertical" align="center">
                        <Row>
                            <Title level={5}>We found the following results!</Title>
                        </Row>
                        <Row className={styles_this.card_result_row}>
                            <div className={styles_this.demo_infinite_container}>
                            <InfiniteScroll
                                initialLoad={false}
                                pageStart={0}
                                loadMore={handleInfiniteOnLoad}
                                hasMore={this.state.hasMore}
                                useWindow={false}
                            >
                                {this.state.data.map((dat) => {
                                    return (
                                        <Card key={dat.id} className={styles_this.card_result}>
                                            <Meta
                                            avatar={
                                                dat.type == 'free' ? <Tag color="green">Free</Tag> : <Tag color="red">Paid</Tag>
                                            }
                                            title={dat.donorName}
                                            description={<ListDiscription {...dat}></ListDiscription>}
                                            />
                                            <DetailsCard {...dat}></DetailsCard>
                                        </Card>  
                                    )      
                                })}
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