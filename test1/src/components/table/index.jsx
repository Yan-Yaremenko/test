import React, { useState, useEffect } from 'react';
import DiamondSVG from '../../icons/diamond';
import BugSVG from '../../icons/bug';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAsync } from '../../Redux/actions/getOwnersAction';
import { getFactAsync } from '../../Redux/actions/getFactAction';
import SortSVG from '../../icons/sort';

function Table() {
  const initialOwners = useSelector((state) => state.data.owners);
  const fact = useSelector((state) => state.fact.fact);

  const dispatch = useDispatch();
  
  const [isFactVisible, setIsFactVisible] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const [owners, setOwners] = useState(initialOwners);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

  useEffect(() => {
    setOwners(initialOwners);
  }, [initialOwners]);

  const toggleFactVisibility = () => {
    dispatch(getFactAsync());
    setIsFactVisible(!isFactVisible);
  };

  const sortOwners = (field) => {
    let sortedOwners;
    if (field === 'points') {
      sortedOwners = [...owners].sort(
        (a, b) => (a[field] - b[field]) * (sortDirection === 'asc' ? 1 : -1)
      );
    } else {
      const direction = sortDirection === 'asc' ? 1 : -1;
      sortedOwners = [...owners].sort(
        (a, b) => a[field].localeCompare(b[field]) * direction
      );
    }
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setOwners(sortedOwners);
  };

  const filterOwners = (term) => {
    const filteredOwners = initialOwners.filter((owner) =>
      Object.values(owner).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(term.toLowerCase())
      )
    );
    setOwners(filteredOwners);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterOwners(value);
  };

  const renderOwners = () => {
    return owners?.map((owner) => (
      <div key={owner.id} className='table-owners__data'>
        <div>{owner.name}</div>
        <div>{owner.lastname}</div>
        <div>{owner.points}</div>
      </div>
    ));
  };

  const renderFact = () => {
    return (
      <div className='more-info__fact'>
        <h5>Цікавий факт про котиків:</h5>
        <p>{fact}</p>
      </div>
    );
  };

  return (
    <div className='table'>
      <div className='table-title'>
        <DiamondSVG />
        <h3>Статистика</h3>
      </div>
      <div className='table-owners'>
        <div className='table-owners__search'>
          <h4>Власники котиків</h4>
          <input
            type='text'
            placeholder='Пошук...'
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className='table-owners__columns'>
          <p>
            Ім'я
            <SortSVG onсlick={() => sortOwners('name')} />
          </p>
          <p>
            Прізвище
            <SortSVG onсlick={() => sortOwners('lastname')} />
          </p>
          <p>
            Бали
            <SortSVG onсlick={() => sortOwners('points')} />
          </p>
        </div>
        {renderOwners()}
      </div>
      <button className='more-info' onClick={toggleFactVisibility}>
        {isFactVisible ? 'Сховати' : 'Більше інформації'} <BugSVG />
      </button>
      {isFactVisible && renderFact()}
    </div>
  );
}

export default Table;
