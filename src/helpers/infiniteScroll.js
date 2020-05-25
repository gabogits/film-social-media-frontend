import { useState, useEffect } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
       // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
       // eslint-disable-next-line
  }, [isFetching]);

  function handleScroll() {
    if (
      ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)  ||
      isFetching
    )
      return;
    setIsFetching(true);
  }
   // eslint-disable-next-line
  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
