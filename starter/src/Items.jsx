import { useQuery } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import customFetch from './utils';
const Items = ({ items }) => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey:['tasks'],
    queryFn: async() => {
      const res = await customFetch('/');
      console.log(res);
      return res.data;
    }
  })

  if(isLoading){
    return <p>Loading</p>;
  }

  if(isError){
    return <p>{error.message}</p>
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
