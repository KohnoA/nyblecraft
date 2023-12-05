import { memo } from 'react';
import { Typography } from 'antd';
import { FIND_TAGS } from '@/constants/regexps';
import styles from './ParagraphWithTags.module.scss';

const { Text } = Typography;

interface ParagraphWithTags {
  string: string;
  tags: string[];
}

const SEPARATOR = '|~|';

export function ParagraphWithTags({ string, tags }: ParagraphWithTags) {
  const testFunc = () => {
    const arr = string
      .replace(FIND_TAGS, (match) => `${SEPARATOR}${match.trim()}${SEPARATOR} `)
      .split(SEPARATOR);

    return (
      <Text>
        {arr.map((item, index) => {
          if (tags.includes(item)) {
            return (
              <span key={index} className={styles.tag}>
                {item}
              </span>
            );
          } else {
            return item;
          }
        })}
      </Text>
    );
  };

  return testFunc();
}

export const ParagraphWithTagsMemo = memo(ParagraphWithTags);
