import step0NextHandler from './step0NextHandler'
import step1NextHandler from './step1NextHandler'
import step2NextHandler from './step2NextHandler'

let return_from_next = 0;


let nextHandler = (that) => {
    let thiss = that;
    let cur = thiss.state.current;
    switch(cur) {
      case 0: {
        return_from_next = step0NextHandler();
          break;
      }
      case 1: {
        return_from_next = step1NextHandler();
          break;
      }
      case 2: {
        return_from_next = step2NextHandler();
        break;
      }
    }
    if(!return_from_next) {
        ++cur;
        thiss.setState({current: cur});
    }
}

export default nextHandler;