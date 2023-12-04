import { Layout, List, Typography } from 'antd';
import styles from './MainPage.module.scss';
import CreateNoteForm from '@/modules/CreateNoteForm';

const { Title } = Typography;
const { Content } = Layout;

export default function MainPage() {
  return (
    <Content>
      <div className={`page container ${styles.wrapper}`}>
        <CreateNoteForm />

        <List
          className={styles.notes}
          header={
            <Title className={styles.title} level={4}>
              Notes list
            </Title>
          }
          bordered
        />
      </div>
    </Content>
  );
}
