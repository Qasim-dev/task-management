import React from 'react';
import { Layout, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import FilterBar from './FilterBar';

const { Header } = Layout;

const AppHeader = (props) => {
  const { filters, setFilters, fromCreateTask } = props
  const { loginUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      dispatch(logout())
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={
        {
          background: 'white',
          padding: '0 16px',
          display: 'flex',
          justifyContent: fromCreateTask ? 'end' : 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }
      }
    >
      {/* Left Side Filters */}
      {!fromCreateTask && (
        <FilterBar filters={filters} setFilters={setFilters} />

      )}

      {/* Right Side User Info */}
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Button>
          {loginUser?.username} ({loginUser?.role}) <DownOutlined />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
