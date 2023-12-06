import { memo } from 'react';
import { Space, Tag } from 'antd';
import styles from './TagsList.module.scss';

interface TagsListProps {
  className?: string;
  tags: string[];
}

export function TagsList({ className, tags }: TagsListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.tagsList} ${className ?? ''}`}>
      <Space size={[0, 'small']} wrap>
        {tags.map((tag) => (
          <Tag key={tag} color="processing">
            {tag}
          </Tag>
        ))}
      </Space>
    </div>
  );
}

export const TagsListMemo = memo(TagsList);
