import { List } from 'antd';
import { useAppSelector } from '@/store';
import styles from './styles.module.scss';
import NoteItem from './components/NoteItem';
import { selectNotesByFilter } from '@/store/selectors';
import ListHeader from './components/ListHeader';

export default function NotesList() {
  const notes = useAppSelector(selectNotesByFilter);

  return (
    <List
      className={styles.notes}
      dataSource={notes}
      bordered
      header={<ListHeader />}
      renderItem={(note) => <NoteItem {...note} />}
    />
  );
}
