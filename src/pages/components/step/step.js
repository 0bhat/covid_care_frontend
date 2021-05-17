import { Steps, Button, message, Row, Typography, Space, Radio, Cascader   } from 'antd';
import React from 'react';
import styles from './step.less'
import store from 'store';


import Step0 from './step0/step.0'
import Step1Seeker from './step1/step.1.seeker'
import Step2SeekerPlasma from './step2/step.2.seeker.plasma'
import Step3SeekerPlasmaResults from './step3/step.3.seeker.plasma.results'


const { Step } = Steps;
const { Title } = Typography;

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
let pattern = new RegExp("^[0-9]{10}$");



//step1 render
const step1_render = (props) => {
  let ret;
  store.each((val, key) => {
    switch(key) {
      case 'donor': {
        ret = "Under COnstructtion";
        break;
      }
      case 'seeker': {
        ret = <Step1Seeker {...props}></Step1Seeker>;
        break;
      }
      case 'seller': {
        ret = "Under COnstructtion";
        break;
      }
    }
  })
  return ret;
}

//step2 render
const step2_render = (props) => {
  let ret = '';
  let dat;
  store.each((val, key) => {
    switch(key) {
      case 'donor': {
        dat = store.get('donor');
        let keys = Object.keys(dat);
        switch(keys[0]) {
          case 'plasma': {
            ret = 'Under Construction';
            break;
          }
          case 'other': {
            ret = 'Under Construction';
            break;
          }
        }
        break;
      }
      case 'seeker': {
        dat = store.get('seeker');
        let keys = Object.keys(dat);
        switch(keys[0]) {
          case 'plasma': {
            ret = <Step2SeekerPlasma {...props}></Step2SeekerPlasma>;
            break;
          }
          case 'other': {
            ret = 'Under Construction';
            break;
          }
        }
        break;
      }
      case 'seller': {
        dat = store.get('seller');
        let keys = Object.keys(dat);
        switch(keys[0]) {
          case 'plasma': {
            ret = 'Under Construction';
            break;
          }
          case 'other': {
            ret = 'Under Construction';
            break;
          }
        }
        break;
      }
    }
  });

  return ret;
}

//step3 render
const step3_render = (props) => {
  let ret = '';
  let dat;
  store.each((val, key) => {
    switch(key) {
      case 'donor': {
        dat = store.get('donor');
        let keys = Object.keys(dat);
        switch(keys[0]) {
          case 'plasma': {
            ret = 'Under Construction';
            break;
          }
          case 'other': {
            ret = 'Under Construction';
            break;
          }
        }
        break;
      }
      case 'seeker': {
        dat = store.get('seeker');
        let keys = Object.keys(dat);
        switch(keys[0]) {
          case 'plasma': {
            ret = <Step3SeekerPlasmaResults {...props}></Step3SeekerPlasmaResults>;
            break;
          }
          case 'other': {
            ret = 'Under Construction';
            break;
          }
        }
        break;
      }
      case 'seller': {
        dat = store.get('seller');
        let keys = Object.keys(dat);
        switch(keys[0]) {
          case 'plasma': {
            ret = 'Under Construction';
            break;
          }
          case 'other': {
            ret = 'Under Construction';
            break;
          }
        }
        break;
      }
    }
  });

  return ret;
}

//props will be the current step number
class MyStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || 0,
        }
        
      store.clearAll();
    }
  
    render() {
        const steps = [
            {
              title: 'First',
              content: Step0(),
            },
            {
              title: 'Second',
              content: step1_render(),
            },
            {
              title: 'Third',
              content: step2_render(),
            },
            {
              title: 'Last',
              content: step3_render(),
            },
        ];

      const { current } = this.state;


      const next = () => {
          let cur = this.state.current;
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
        this.setState({current: cur});
      };
    
      const prev = () => {
        let cur = this.state.current;
        --cur;
        this.setState({current: cur});
        };

      const startOver = () => {
        store.clearAll();
        this.setState({current: 0});
      }
  
      return (
        <div className={styles.main_div}>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div>{steps[current].content}</div>
        <div className={styles.steps_action}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={startOver}>
              Start Over
            </Button>
          )}
          {(current > 0 && current < steps.length - 1) && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
      );
    }
  }

  export default MyStep;