import { useAppSelector, useAppDispatch } from '@/store';
import { Typography, Select } from 'antd';
import styles from './FilterNotes.module.scss';
import { selectAllTags } from '@/store/selectors';
import { setFilter } from '@/store/slices/filterSlice';

const { Title, Paragraph } = Typography;

export default function FilterNotes() {
  const options = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();

  const onChangeSelectHanlder = (filter: string[]) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__header}>
        <Title className={styles.title} level={4}>
          Filters
        </Title>
      </div>

      <div className={styles.filters__body}>
        <Paragraph className={styles.label}>
          Select <span className={styles.tag}>#tags</span> to sort your notes:
        </Paragraph>

        <Select
          className={styles.select}
          mode="multiple"
          allowClear
          placeholder="#shop"
          onChange={onChangeSelectHanlder}
          options={options}
        />
      </div>
    </div>
  );
}
