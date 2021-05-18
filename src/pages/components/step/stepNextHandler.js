import store from 'store';
import { message  } from 'antd';

import step0NextHandler from './step0NextHandler'
import step1NextHandler from './step1NextHandler'
import step2NextHandler from './step2NextHandler'


let nextHandler = (that) => {
    let thiss = that;
    let cur = thiss.state.current;
    switch(cur) {
      case 0: {
          step0NextHandler();
          break;
      }
      case 1: {
          step1NextHandler();
          break;
      }
      case 2: {
          step2NextHandler();
        break;
      }
    }  
    
    
    ++cur;
    thiss.setState({current: cur});
}

export default nextHandler;