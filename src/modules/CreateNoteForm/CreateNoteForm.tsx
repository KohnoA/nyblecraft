import { useEffect, useCallback, useState, FormEvent } from 'react';
import { message, Input, Button, Form, Alert } from 'antd';
import { FIND_TAGS } from '@/constants/regexps';
import { TagsList } from '@/components/TagsList';
import { FormHeaderMemo } from './components/FormHeader';
import styles from './styles.module.scss';

export default function CreateNoteForm() {
  const [form] = Form.useForm();
  const newNote = Form.useWatch('note', form);
  const [tags, setTags] = useState<string[]>([]);

  const onFinish = (event: FormEvent) => {
    console.log(event);

    message.success('New note added!');
    form.resetFields();
  };

  const onFinishFailed = () => message.error('Submit failed!');

  const noteInputHanlder = useCallback((str: string) => {
    const newTagsArr = str.match(FIND_TAGS) ?? [];

    setTags(Array.from(newTagsArr));
  }, []);

  useEffect(() => {
    if (newNote) {
      noteInputHanlder(newNote);
    }
  }, [noteInputHanlder, newNote]);

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
          <Input placeholder="I wanna go to #shop tomorrow" />
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
