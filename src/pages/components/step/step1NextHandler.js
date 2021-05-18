import store from 'store';
import { message  } from 'antd';

const step1_seeker_case_handler = (key_g) => {
    let dat = store.get(key_g);
    if(Object.keys(dat).length == 0) {
      message.error("Please select an option!");
      return;
    } else if(dat.other && dat.other.service == undefined) {
      message.error("Please type a service!");
      return;
    }
}

const step1NextHandler = (props) => {
    let key_g;
    store.each((val, key) => {
      key_g = key;
    });
    switch(key_g) {
      case 'seeker': {
        step1_seeker_case_handler(key_g);
        break;
      }
    }
}

export default step1NextHandler;