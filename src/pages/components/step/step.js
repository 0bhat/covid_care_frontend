import { Steps, Button, message, Row, Typography, Space, Radio, Cascader   } from 'antd';
import React from 'react';
import styles from './step.less'
import store from 'store';

import nextHandler from './stepNextHandler'

import Step0 from './step0/step.0'
import Step1Seeker from './step1/step.1.seeker'
import Step2SeekerPlasma from './step2/step.2.seeker.plasma'
import Step3SeekerPlasmaResults from './step3/step.3.seeker.plasma.results'


const { Step } = Steps;
const { Title } = Typography;

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


      const next = nextHandler;
    
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
            <Button type="primary" onClick={() => next(this)}>
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