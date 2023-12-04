import { memo } from 'react';
import { Typography } from 'antd';
import styles from '../styles.module.scss';

const { Title } = Typography;

interface FormHeaderProps {
  title: string;
}

export function FormHeader({ title }: FormHeaderProps) {
  return (
    <div className={styles.form__header}>
      <Title className={styles.title} level={4}>
        {title}
      </Title>
    </div>
  );
}

export const FormHeaderMemo = memo(FormHeader);