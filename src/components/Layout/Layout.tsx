import { ReactNode } from 'react';
import { Layout as AntdLayout, Typography } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import styles from './Layout.module.scss';

import { AUTHOR_GITHUB } from '@/constants';

const { Header, Footer } = AntdLayout;
const { Title, Link, Text } = Typography;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AntdLayout className={styles.layout}>
      <Header className={styles.header}>
        <div className="container">
          <div className={styles.logo}>
            <ProfileOutlined className={styles.logo__icon} />
            <Title className={styles.text} level={3}>
              Notes
            </Title>
          </div>
        </div>
      </Header>

      {children}

      <Footer>
        <Text
          className={`container ${styles.copyright}`}
        >
          Prod. by <Link href={AUTHOR_GITHUB}>KohnoA</Link>
        </Text>
      </Footer>
    </AntdLayout>
  );
}
