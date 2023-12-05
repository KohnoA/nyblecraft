import { FIND_TAGS } from '@/constants/regexps';

export function getTagsFromString(str: string) {
  const matchArr = Array.from(str.match(FIND_TAGS) ?? [], (tag) => tag.trim());
  const uniqueTagsList = [...new Set(matchArr)];

  return uniqueTagsList;
}
