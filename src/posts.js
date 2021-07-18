  
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Posts(limitParam) {

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ postList, setPostList ] = useState([]);
    const [ hasMore, setHasMore ] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts',
            params: { _limit: limitParam }
        }).then(res => {
            setPostList([...res.data]);
            setHasMore(res.data.length > 0);
            setLoading(false);
        }).catch(e => {
            setError(true);
        })
    }, [limitParam])

    return { loading, error, postList, hasMore };
  
}