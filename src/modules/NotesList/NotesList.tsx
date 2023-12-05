import { List, Typography, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/store';
import styles from './NotesList.module.scss';
import { TagsList } from '@/components/TagsList';

const { Title, Text } = Typography;

export default function NotesList() {
  const notes = useAppSelector((state) => state.notes.list);

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
      renderItem={({ desc, tags }) => (
        <List.Item>
          <div className={styles.content}>
            <Text>{desc}</Text>
            <TagsList className={styles.tagList} tags={tags} />
          </div>

          <div className={styles.buttons}>
            <Button type="primary" icon={<EditOutlined />} />
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </div>
        </List.Item>
      )}
    />
  );
}
