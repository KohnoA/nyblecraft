import { Layout } from 'antd';
import styles from './MainPage.module.scss';
import CreateNoteForm from '@/modules/CreateNoteForm';
import NotesList from '@/modules/NotesList';
import FilterNotes from '@/modules/FilterNotes';

const { Content } = Layout;

export default function MainPage() {
  return (
    <Content>
      <div className={`page container ${styles.wrapper}`}>
        <CreateNoteForm />

        <div>
          <FilterNotes />
          <NotesList />
        </div>
      </div>
    </Content>
  );
}
