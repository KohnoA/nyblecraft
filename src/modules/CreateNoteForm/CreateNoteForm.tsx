import { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '@/store';
import { addNote } from '@/store/slices/notesSlice';
import { message, Input, Button, Form, Alert } from 'antd';
import { TagsList } from '@/components/TagsList';
import { FormHeaderMemo } from './components/FormHeader';
import styles from './styles.module.scss';
import { getTagsFromString } from '@/helpers/getTagsFromString';

interface FormData {
  note: string;
}

const INITIAL_TAGS_VALUE: string[] = [];

export default function CreateNoteForm() {
  const [form] = Form.useForm<FormData>();
  const [tags, setTags] = useState<string[]>(INITIAL_TAGS_VALUE);
  const dispatch = useAppDispatch();

  const onFinish = (data: FormData) => {
    const { note } = data;

    dispatch(addNote({ id: Date.now(), desc: note, tags }));
    message.success('New note added!');
    form.resetFields();
    setTags(INITIAL_TAGS_VALUE);
  };

  const onFinishFailed = () => message.error('Submit failed!');

  const noteInputHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTags(getTagsFromString(value));
  };

  return (
    <div className={styles.form}>
      <FormHeaderMemo title="New Note" />
      <Form
        className={styles.form__body}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Alert
          className={styles.alert}
          message="You can designate #tags in your notes so you can conveniently filter them later."
        />

        <Form.Item
          name="note"
          label="Enter your note"
          rules={[{ required: true }, { type: 'string', min: 6 }]}
        >
          <Input
            onChange={noteInputHanlder}
            placeholder="I wanna go to #shop tomorrow"
          />
        </Form.Item>

        {tags.length > 0 && <TagsList tags={tags} />}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
