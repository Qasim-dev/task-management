import React from 'react';
import { Select, Space } from 'antd';

const { Option } = Select;


const FilterBar = ({ filters, setFilters }) => {
  return (
    <Space>

      <Select
        placeholder="Select priority"
        style={{ width: 250 }}
        onChange={(value) => setFilters({ ...filters, priority: value })}
      >
        <Option value="">All Priorities</Option>
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>

      <Select
        placeholder="Select status"
        style={{ width: 250 }}
        onChange={(value) => setFilters({ ...filters, status: value })}
      >
        <Option value="">All Statuses</Option>
        <Option value="pending">Pending</Option>
        <Option value="in-progress">In Progress</Option>
        <Option value="completed">Completed</Option>
      </Select>


    </Space>
  );
};

export default FilterBar;
