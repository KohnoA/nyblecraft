import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { INote } from '@/types';
import { List, Input, Button, message } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { editNote, removeNote } from '@/store/slices/notesSlice';
import { ParagraphWithTagsMemo } from '@/components/ParagraphWithTags';
import { getTagsFromString } from '@/helpers/getTagsFromString';
import { TagsList } from '@/components/TagsList';
import styles from '../styles.module.scss';

type NoteItemProps = INote;

export default function NoteItem({ id, desc, tags }: NoteItemProps) {
  const [newTags, setNewTags] = useState<string[]>(tags);
  const [newDesc, setNewDesc] = useState<string>(desc);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewTags(tags);
    setNewDesc(desc);
  }, [desc, tags]);

  const editModeHanlder = () => {
    if (isEditMode) {
      if (newDesc.length === 0) removeNoteHandler();
      else if (newDesc !== desc) {
        dispatch(editNote({ id, newDesc, newTags }));
        message.success('Note successfully modified');
      }
    }

    setIsEditMode((prev) => !prev);
  };

  const removeNoteHandler = () => {
    dispatch(removeNote(id));
    message.warning(`Note deleted!`);
  };

  const editNoteHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewTags(getTagsFromString(value));
    setNewDesc(value);
  };

  const inputKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') editModeHanlder();
  };

  return (
    <List.Item>
      <div className={styles.content}>
        {isEditMode ? (
          <Input
            defaultValue={newDesc}
            onChange={editNoteHanlder}
            onKeyDown={inputKeyDownHanlder}
            autoFocus
          />
        ) : (
          <ParagraphWithTagsMemo string={newDesc} tags={newTags} />
        )}
        <TagsList className={styles.tagList} tags={newTags} />
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
