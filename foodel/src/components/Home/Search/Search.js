import React from 'react';
import useAuth from '../../../hooks/useAuth';
import './Search.css';
import SearchResult from './SearchResult/SearchResult';

const Search = () => {
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), URL('./extraVolunteer.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    }

    const { foodContext } = useAuth();
    const { foods, search, setSearch } = foodContext;

    const handleSearch = e => {
        const searchText = e.target.value;
        const foundFoods = foods.filter(b => b.food.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        if (searchText) {
            setSearch(foundFoods);
        }
        else {
            setSearch([]);
        }
    }

    return (
        <div className="search" style={backgroundStyle}>

            <div className="d-flex justify-content-center align-items-center">
                <div className="mb-4">
                    <img src="./search-food-icon.png" width="70px" className="img-fluid" alt="search-food-icon" />
                </div>
                <h1 className="mb-5 p-2 limegreen">Search Your favourite Food Menu</h1>
            </div>
            {
                search.length ?
                    <div className="bg-dark col-md-3 mx-auto p-3 text-white my-3">
                        Result Found: {search?.length}
                    </div>
                    :
                    ""
            }
            <div className="search-section">
                <input onChange={handleSearch} type="text" className="search-bar p-3" placeholder="Search Item" /><button className="search-btn p-3"><i className="search-logo fas fa-search fa-2x"></i></button>
            </div>
            <div className="m-3">
                <div className="col-md-4 mx-auto">
                    {
                        search.map(s => <SearchResult result={s} key={s._id} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;