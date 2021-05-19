import store from 'store';
import { message  } from 'antd';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
let pattern = new RegExp("^[0-9]{10}$");

let file_return_value = 0;

const step2_seeker_case_handler = (key_g) => {
    let dat = store.get(key_g);
    
    //if plasma is selected
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
        return 1;
      }
    }
    /////////////////
    ////////////////////


    //if other is selected
    if(dat.other) {
      if(Object.keys(dat.other.formData).length === 0) {
        message.error("Please fill the form below!");
        return 1;
      }

      let invalid = [];
      if(!dat.other.formData.name) invalid.push('name');
      if(dat.other.formData.email) {
        if(!validateEmail(dat.other.formData.email)) {
          invalid.push('email');
        }
      } else {
        invalid.push('email');
      }
      if(dat.other.formData.contactNumber) {
        if(!pattern.test(dat.other.formData.contactNumber)) {
          invalid.push('contactNumber');
        }
      } else  {
        invalid.push('contactNumber');
      }
      if(!dat.other.formData.city) invalid.push('city');


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
          case 'city': {
            message.error("Please select city!");
            break;
          }
        }
      }


      if(invalid.length > 0 ) {
        return 1;
      }

    }
    ///////
    ////////
}

const step2NextHandler = (props) => {
    let key_g;
    store.each((val, key) => {
      key_g = key;
    });
    switch(key_g) {
      case 'seeker': {
        file_return_value = step2_seeker_case_handler(key_g)
          break;
      }
    }

    return file_return_value;
}

export default step2NextHandler;