import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '川耶';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'foot1',
          title: 'foot1',
          href: 'https://yupi.icu',
          blankTarget: true,
        },
        {
          key: 'foot2',
          title: 'foot2',
          href: 'https://codefather.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> yFan666 Github
            </>
          ),
          href: 'https://github.com/yFan666',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
