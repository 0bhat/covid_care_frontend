import MyHeader from '../components/header/index'
import MyFooter from '../components/footer/index'
import { ConfigProvider, Layout } from 'antd'

import styles from './index.less'
import { Fragment } from 'react'

function BasicLayout(props) {
  return (
    <Layout>
      <Fragment>
      <div
            className={styles.container}
            id="primaryLayout"
      >
        <MyHeader/>
        {props.children}
        <MyFooter />
      </div>
      </Fragment>
    </Layout>
  );
}

export default BasicLayout;
