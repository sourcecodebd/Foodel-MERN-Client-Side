import { useState, useEffect } from 'react';

const useWorker = () => {
    const [workers, setWorkers] = useState([]);
    const [search, setSearch] = useState([]);
    useEffect(() => {
        fetch('https://evil-coffin-47333.herokuapp.com/delivery-workers')
            .then(res => res.json())
            .then(data => {
                setWorkers(data);
            })
    }, [])

    return {
        workers,
        setWorkers,
        search,
        setSearch
    }
}

export default useWorker;