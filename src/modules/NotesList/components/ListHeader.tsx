import { useAppSelector, useAppDispatch } from '@/store';
import styles from '../styles.module.scss';
import { Typography, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { selectAllNotes } from '@/store/selectors';
import { removeAllNotes } from '@/store/slices/notesSlice';

const { Title } = Typography;

const MIN_ITEMS_WHEN_SHOW_BUTTON = 1;

export default function ListHeader() {
  const notes = useAppSelector(selectAllNotes);
  const dispatch = useAppDispatch();

  const removeListHandler = () => {
    dispatch(removeAllNotes());
    message.success('The list of notes has been deleted!');
  };

  return (
    <div className={styles.listHeader}>
      <Title className={styles.title} level={4}>
        Notes list
      </Title>

      {notes.length > MIN_ITEMS_WHEN_SHOW_BUTTON && (
        <Popconfirm
          title="Delete the list"
          description="Are you sure to want delete all notes?"
          onConfirm={removeListHandler}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      )}
    </div>
  );
}
