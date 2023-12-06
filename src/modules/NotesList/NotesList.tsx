import { List, Typography } from 'antd';
import { useAppSelector } from '@/store';
import styles from './styles.module.scss';
import NoteItem from './components/NoteItem';
import { selectNotesByFilter } from '@/store/selectors';

const { Title } = Typography;

export default function NotesList() {
  const notes = useAppSelector(selectNotesByFilter);

  return (
    <List
      className={styles.notes}
      dataSource={notes}
      bordered
      header={
        <Title className={styles.title} level={4}>
          Notes list
        </Title>
      }
      renderItem={(note) => <NoteItem {...note} />}
    />
  );
}
