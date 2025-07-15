import React from 'react';
import { Search, Filter } from 'lucide-react';
import { LOCATIONS, CATEGORIES, TASK_STATUS } from '../../constants/enums';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const TaskFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions = Object.values(TASK_STATUS);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="mr-2" size={20} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filter Tasks
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          placeholder="All Locations"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          options={LOCATIONS}
        />

        <Select
          placeholder="All Categories"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          options={CATEGORIES}
        />

        <Select
          placeholder="All Status"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={statusOptions}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default TaskFilters;