import React, { PureComponent } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Space, Button } from 'antd';
import css from './style'
import styles from './index.less'
import logo from './logo-2.svg'
const { Header } = Layout;

let clicked = 0;

class MyHeader extends React.Component {

    onTwitterClick() {
        console.log("Clicked! " + ++clicked);
    }


    render() {
        return (
            <Header className={styles.header}>
                    <Row justify="center" align="middle">
                            <Col  sm={8} md={8} lg={12} xl={12}>
                                <img className={styles.logo}  src={logo} alt="logo"></img>
                            </Col>
                            <Col  sm={16} md={16} lg={12} xl={12}>
                                <Row className={styles.button_row} gutter={{ xs: 5, sm: 10, md: 10, lg: 10}} justify="end" align="middle">
                                    <Col>
                                        <Button type="primary" onClick={this.onTwitterClick} size="small">
                                            Twitter Leads
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type="primary"  size="small">
                                            Facebook Leads
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type="primary"  size="small">
                                            Instagram Leads
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                    </Row>
            </Header>

        )
    }
}

export default MyHeader