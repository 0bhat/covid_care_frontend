import store from 'store';
import { message  } from 'antd';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
let pattern = new RegExp("^[0-9]{10}$");

let nextHandler = (that) => {
    let thiss = that;
    let cur = thiss.state.current;
    switch(cur) {
      case 0: {
        let i = 0;
        store.each((val, key) => {
          i++;
        })
        if(i == 0) {
          message.error("Please select an option!");
          return;
        }
        break;
      }
      case 1: {
        let key_g;
        store.each((val, key) => {
          key_g = key;
        });
        switch(key_g) {
          case 'seeker': {
            let dat = store.get(key_g);
            if(Object.keys(dat).length == 0) {
              message.error("Please select an option!");
              return;
            } else if(dat.other && dat.other.service == undefined) {
              message.error("Please type a service!");
              return;
            }
            break;
          }
        }

        break;
      }
      case 2: {
        let key_g;
        store.each((val, key) => {
          key_g = key;
        });
        switch(key_g) {
          case 'seeker': {
            let dat = store.get(key_g);



            if(dat.plasma) {
              let invalid = [];
              if(!dat.plasma.name) invalid.push('name');
              if(dat.plasma.email) {
                if(!validateEmail(dat.plasma.email)) {
                  invalid.push('email');
                }
              } else {
                invalid.push('email');
              }
              if(dat.plasma.contactNumber) {
                if(!pattern.test(dat.plasma.contactNumber)) {
                  invalid.push('contactNumber');
                }
              } else  {
                invalid.push('contactNumber');
              }
              if(!dat.plasma.bloodGroup) invalid.push('bloodGroup');
              if(!dat.plasma.city) invalid.push('city');

              for(let i of invalid) {
                switch(i) {
                  case 'name': {
                    message.error("Please enter your name!");
                    break;
                  }
                  case 'email': {
                    message.error("Please enter a valid email!");
                    break;
                  }
                  case 'contactNumber': {
                    message.error("Please enter a 10 digit contact number!");
                    break;
                  }
                  case 'bloodGroup': {
                    message.error("Please select blood group!");
                    break;
                  }
                  case 'city': {
                    message.error("Please select city!");
                    break;
                  }
                }
              }

              if(invalid.length > 0 ) {
                return;
              }
            }

            break;
          }
        }

        break;
      }
    }  
    
    
    ++cur;
    thiss.setState({current: cur});
}

export default nextHandler;