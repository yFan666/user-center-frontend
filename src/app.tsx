import Footer from '@/components/Footer';
import { queryCurrentUser } from '@/services/backend/userController';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { AvatarDropdown } from './components/RightContent/AvatarDropdown';
import { requestConfig } from './requestConfig';

const loginPath = '/user/login';

// 从 localStorage 获取持久化的状态
const getPersistedState = () => {
  try {
    const state = localStorage.getItem('initialState');
    return state ? JSON.parse(state) : undefined;
  } catch (error) {
    return undefined;
  }
};

// 持久化状态到 localStorage
const persistState = (state: any) => {
  try {
    localStorage.setItem('initialState', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to persist state:', error);
  }
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  // 尝试从持久化存储中获取状态
  const persistedState = getPersistedState();
  if (persistedState?.currentUser) {
    return persistedState;
  }

  const initialState: InitialState = {
    currentUser: undefined,
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    try {
      const user = await queryCurrentUser();
      initialState.currentUser = user;
      // 持久化新的状态
      persistState(initialState);
    } catch (error: any) {
      // 如果未登录
    }
  }
  return initialState;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    avatarProps: {
      render: () => {
        return <AvatarDropdown />;
      },
    },

    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: (location: Location) => {
      const whiteList = ['/user/login', '/user/register'];
      if (whiteList.includes(location.pathname)) {
        return;
      }
      // 如果用户未登录且不在白名单中，重定向到登录页
      if (!initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...defaultSettings,
    // 添加全局样式
    style: {
      height: '100vh',
      overflow: 'hidden',
    },
    // 内容区域样式
    contentStyle: {
      height: 'calc(100vh - 56px)', // 减去头部高度
      overflow: 'auto',
      padding: '24px',
      background: '#f0f2f5',
    },
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
