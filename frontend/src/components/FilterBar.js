import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div>
      <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterBar;
