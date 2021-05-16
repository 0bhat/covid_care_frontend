import styles from './index.css';
import MyStep from './components/step/step'


export default function() {
  let step_props = {
    current: 0,
  }

  return (
    <div className={styles.normal}>
      <MyStep {...step_props}></MyStep>
    </div>
  );
}
