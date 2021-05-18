import store from 'store';
import { message  } from 'antd';

const step0NextHandler = (props) => {
    let i = 0;
    store.each((val, key) => {
      i++;
    })
    if(i == 0) {
      message.error("Please select an option!");
      return 1;
    }
}

export default step0NextHandler;