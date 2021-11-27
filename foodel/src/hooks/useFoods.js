import { useState, useEffect } from 'react';

const useFoods = () => {
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState([]);
    useEffect(() => {
        fetch('https://evil-coffin-47333.herokuapp.com/deliveries')
            .then(res => res.json())
            .then(data => {
                setFoods(data);
            })
    }, [])

    return {
        foods,
        setFoods,
        search,
        setSearch
    }
}

export default useFoods;