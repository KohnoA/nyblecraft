import { useState, ChangeEvent, useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { INote } from '@/types';
import { List, Input, Button, message } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { editNote, removeNote } from '@/store/slices/notesSlice';
import { ParagraphWithTagsMemo } from '@/components/ParagraphWithTags';
import { getTagsFromString } from '@/helpers/getTagsFromString';
import { TagsList } from '@/components/TagsList';
import styles from '../styles.module.scss';
import { areArraysIdentical } from '@/helpers/areArraysIdentical';

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
      const trimDesc = newDesc.trim();

      if (trimDesc.length === 0) removeNoteHandler();
      else if (trimDesc !== desc) {
        dispatch(editNote({ id, newDesc: trimDesc, newTags }));
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
    const tagsGetedFromString = getTagsFromString(value);

    if (!areArraysIdentical(newTags, tagsGetedFromString)) {
      setNewTags(tagsGetedFromString);
    }

    setNewDesc(value);
  };

  return (
    <List.Item>
      <div className={styles.content}>
        {isEditMode ? (
          <Input
            defaultValue={newDesc}
            onChange={editNoteHanlder}
            onPressEnter={editModeHanlder}
            autoFocus
          />
        ) : (
          <ParagraphWithTagsMemo string={newDesc} />
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
