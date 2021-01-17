import { useEffect } from 'react';

const useOutsideClick = (outsideTags, callback) => {
  const handleClick = (e) => {
    if (outsideTags.includes(e.target.tagName)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
