import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useAppDispatch } from '@/store';
import { INote } from '@/types';
import { List, Input, Button } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { editNote, removeNote } from '@/store/slices/notesSlice';
import { ParagraphWithTagsMemo } from '@/components/ParagraphWithTags';
import { getTagsFromString } from '@/helpers/getTagsFromString';
import { TagsList } from '@/components/TagsList';
import styles from '../styles.module.scss';

interface NoteItemProps {
  data: INote;
}

export default function NoteItem({ data }: NoteItemProps) {
  const { id, desc, tags } = data;
  const [newTags, setNewTags] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newNoteDesc, setNewNoteDesc] = useState<string>('');
  const dispatch = useAppDispatch();

  const editModeHanlder = () => {
    if (isEditMode) {
      dispatch(editNote({ id, newDesc: newNoteDesc, newTags }));
      setIsEditMode(false);
    } else {
      setNewNoteDesc(desc);
      setNewTags(tags);
      setIsEditMode(true);
    }
  };

  const removeNoteHandler = () => dispatch(removeNote(id));

  const editNoteHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewTags(getTagsFromString(value));
    setNewNoteDesc(value);
  };

  const inputKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') editModeHanlder();
  };

  return (
    <List.Item>
      <div className={styles.content}>
        {isEditMode ? (
          <Input
            defaultValue={desc}
            onChange={editNoteHanlder}
            onKeyDown={inputKeyDownHanlder}
            autoFocus
          />
        ) : (
          <ParagraphWithTagsMemo string={desc} tags={tags} />
        )}
        <TagsList
          className={styles.tagList}
          tags={newTags.length === 0 ? tags : newTags}
        />
      </div>

      <div className={styles.controls}>
        <Button
          type="primary"
          icon={isEditMode ? <CheckOutlined /> : <EditOutlined />}
          onClick={editModeHanlder}
        />
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={removeNoteHandler}
        />
      </div>
    </List.Item>
  );
}
