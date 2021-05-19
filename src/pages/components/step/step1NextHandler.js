import store from 'store';
import { message  } from 'antd';

let file_return_value = 0;

const step1_seeker_case_handler = (key_g) => {
    let dat = store.get(key_g);
    if(Object.keys(dat).length == 0) {
      message.error("Please select an option!");
      return 1;
    } else if(dat.other && (dat.other.service == undefined || dat.other.service.length === 0) && (Object.keys(dat).length !== 2)) {
      message.error("Please type a service!");
      return 1;
    }
}

const step1NextHandler = (props) => {
    let key_g;
    store.each((val, key) => {
      key_g = key;
    });
    switch(key_g) {
      case 'seeker': {
        file_return_value = step1_seeker_case_handler(key_g);
        break;
      }
    }

    return file_return_value;
}

export default step1NextHandler;