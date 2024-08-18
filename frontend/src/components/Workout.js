import { useState,useEffect } from "react";

const Workout = () => {
  const [count, setCount] = useState(0);
  const [resources, setResources] = useState('');
// Mounting : awel mara ysir render ll component
  useEffect(() => {
    console.log('resources type is changed');
    // this array is a dependency
  }, []);
  // updating : ki ysir changement ll dependency
  useEffect(() => {
    console.log('resources type is changed lol');
    // this array is a dependency
  }, [resources]);

  const add = () => {
    setCount(count + 1);
  };

  const remove = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const posts = () => {
    setResources('post');
  };

  const users = () => {
    setResources('users');
  };

  const cmmnts = () => {
    setResources('cmmnts');
  };





  return (
    <>
      <div>
        <button onClick={add}>+</button>
        <span>{count}</span>
        <button onClick={remove}>-</button>
      </div>

      <div>
        <button onClick={posts}>Posts</button>
        <button onClick={users}>Users</button>
        <button onClick={cmmnts}>Cmmnts</button>
        <div>{resources}</div>
      </div>
    </>
  );
};

export default Workout;
