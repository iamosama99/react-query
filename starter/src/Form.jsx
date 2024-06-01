import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import customFetch from './utils';
import {toast} from 'react-toastify';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');

  const queryClient = useQueryClient();
  const {mutate: createTask, isLoading} = useMutation({
    mutationFn: (taskTitle) =>  customFetch.post('/', {title: taskTitle}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : ['tasks']});
      toast.success('Task added');
      setNewItemName('');
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn'>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;