import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LOCATIONS, CATEGORIES } from '../../constants/enums';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Card from '../common/Card';

const TaskForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    location: initialData.location || '',
    category: initialData.category || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
          placeholder="Enter task title"
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          required
          placeholder="Describe what help you need"
          rows={4}
        />

        <Select
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          options={LOCATIONS}
          required
          placeholder="Select your location"
        />

        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          options={CATEGORIES}
          required
          placeholder="Select task category"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            {initialData._id ? 'Update Task' : 'Create Task'}
          </Button>
        </motion.div>
      </form>
    </Card>
  );
};

export default TaskForm;