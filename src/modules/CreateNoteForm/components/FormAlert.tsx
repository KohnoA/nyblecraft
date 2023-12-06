import { memo } from 'react';
import { Alert, Typography } from 'antd';
import styles from '../styles.module.scss';

export function FormAlert() {
  return (
    <Alert
      className={styles.alert}
      message={
        <Typography.Text>
          You can designate <span className={styles.tag}>#tags</span> in your
          notes so you can conveniently filter them later.
        </Typography.Text>
      }
    />
  );
}

export const FormAlertMemo = memo(FormAlert);
