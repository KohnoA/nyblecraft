import { memo } from 'react';
import { Typography } from 'antd';
import { FIND_TAGS } from '@/constants/regexps';
import styles from './ParagraphWithTags.module.scss';

const { Paragraph } = Typography;

interface ParagraphWithTags {
  string: string;
}

const SEPARATOR = '|~|';
const TAG_DESIGNATION = '#';

export function ParagraphWithTags({ string }: ParagraphWithTags) {
  const getMarkupFromString = () => {
    const arr = string
      .replace(FIND_TAGS, (match) => `${SEPARATOR}${match.trim()}${SEPARATOR} `)
      .split(SEPARATOR);

    return (
      <Paragraph className={styles.paragraph}>
        {arr.map((item, index) => {
          if (item.includes(TAG_DESIGNATION)) {
            return (
              <span key={index} className={styles.tag}>
                {item}
              </span>
            );
          } else {
            return item;
          }
        })}
      </Paragraph>
    );
  };

  return getMarkupFromString();
}

export const ParagraphWithTagsMemo = memo(ParagraphWithTags);
