import css from './style'
import React, { PureComponent } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Space } from 'antd';
import styles from './index.less'

const { Footer } = Layout;



class MyFooter extends PureComponent {
    render() {
        return (
            <Footer className={styles.footer}>
                Plasma Care ©2021
            </Footer>
        )
    }
}

export default MyFooter