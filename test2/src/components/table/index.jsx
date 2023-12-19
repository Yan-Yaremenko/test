import {
  setCatsAsync,
  addCatAsync,
  deleteCatAsync,
  updateCatAsync,
} from '../../Redux/actions/getCatsAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EditSVG from '../../components/icons/edit';

function Table() {
  const cats = useSelector((state) => state.data.cats);
  const dispatch = useDispatch();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newCat, setNewCat] = useState({
    name: '',
    breed: '',
    age: '',
    treats: {
      cans: 0,
      candies: 0,
    },
  });

  useEffect(() => {
    dispatch(setCatsAsync());
  }, [dispatch]);

  const renderEditIcon = (id) => {
    if (hoveredRow === id) {
      return (
        <EditSVG className='table-cats__edit' onClick={() => handleEdit(id)} />
      );
    }
    return null;
  };

  const handleEdit = (id) => {
    setEditingCat(id);
    const catToEdit = cats.find((cat) => cat.id === id);
    if (catToEdit) {
      setNewCat((prevCat) => ({ ...prevCat, ...catToEdit }));
    }
  };

  const handleSaveEdit = () => {
    dispatch(updateCatAsync(newCat));
    setNewCat({
      name: '',
      breed: '',
      age: '',
      treats: {
        cans: 0,
        candies: 0,
      },
    });
    setEditingCat(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Ви впевнені, що хочете видалити кота?'
    );
    if (confirmDelete) {
      dispatch(deleteCatAsync(id));
    }
  };

  const handleAddCat = () => {
    dispatch(addCatAsync(newCat));
    setNewCat({
      name: '',
      breed: '',
      age: '',
    });
    setShowAddPopup(false);
  };

  return (
    <div className='table'>
      <button className='button-add' onClick={() => setShowAddPopup(true)}>
        Додати кота <span>+</span>
      </button>

      <div className='table-columns'>
        <div className='table-columns__cell'>Id</div>
        <div className='table-columns__cell'>Ім'я</div>
        <div className='table-columns__cell'>Порода</div>
        <div className='table-columns__cell'>Вік</div>
      </div>
      {cats?.map((cat) => (
        <div
          key={cat.id}
          className='table-cats'
          onMouseEnter={() => setHoveredRow(cat.id)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div className='table-cats__cell'>{cat.id}</div>
          <div className='table-cats__cell'>{cat.name}</div>
          <div className='table-cats__cell'>{cat.breed}</div>
          <div className='table-cats__cell'>{cat.age}</div>
          <div className='table-cats__cans'>
            {cat.treats?.cans}
            {cat.treats?.cans ? <span>&#128031;</span> : null}
          </div>

          <div className='table-cats__candies'>
            {cat.treats?.candies}
            {cat.treats?.candies ? <span>&#127852;</span> : null}
          </div>
          {renderEditIcon(cat.id)}
          <button
            className='table-cats__delete'
            onClick={() => handleDelete(cat.id)}
          >
            X
          </button>
        </div>
      ))}
      {showAddPopup && (
        <div className='popup-add'>
          <h4>Додати кота</h4>

          <label htmlFor="Ім'я">Ім'я</label>

          <input
            type='text'
            placeholder="Ім'я"
            className='popup-input'
            value={newCat.name}
            onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
          />
          <label htmlFor='Порода'>Порода</label>
          <input
            type='text'
            placeholder='Порода'
            className='popup-input'
            value={newCat.breed}
            onChange={(e) => setNewCat({ ...newCat, breed: e.target.value })}
          />
          <label htmlFor='Вік'>Вік</label>
          <input
            type='text'
            placeholder='Вік'
            className='popup-input'
            value={newCat.age}
            onChange={(e) => setNewCat({ ...newCat, age: e.target.value })}
          />
          <label htmlFor='Кількість рибки'>Кількість консервів</label>

          <input
            type='text'
            placeholder='Кількість рибки'
            className='popup-input'
            value={newCat.treats.cans}
            onChange={(e) =>
              setNewCat((prevCat) => ({
                ...prevCat,
                treats: { ...prevCat.treats, cans: e.target.value },
              }))
            }
          />
          <label htmlFor='Кількість цукерок'>Кількість цукерок</label>

          <input
            type='text'
            placeholder='Кількість цукерок'
            className='popup-input'
            value={newCat.treats.candies}
            onChange={(e) =>
              setNewCat((prevCat) => ({
                ...prevCat,
                treats: { ...prevCat.treats, candies: e.target.value },
              }))
            }
          />
          <button className='popup-button' onClick={handleAddCat}>
            Додати кота
          </button>
          <button
            className='popup-button'
            onClick={() => setShowAddPopup(false)}
          >
            Закрити
          </button>
        </div>
      )}

      {editingCat && (
        <div className='popup-edit'>
          <h4>Редагування кота</h4>
          <label htmlFor="Ім'я">Ім'я</label>

          <input
            type='text'
            placeholder="Ім'я"
            className='popup-input'
            value={newCat.name}
            onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
          />
          <label htmlFor='Порода'>Порода</label>
          <input
            type='text'
            placeholder='Порода'
            className='popup-input'
            value={newCat.breed}
            onChange={(e) => setNewCat({ ...newCat, breed: e.target.value })}
          />
          <label htmlFor='Вік'>Вік</label>
          <input
            type='text'
            placeholder='Вік'
            className='popup-input'
            value={newCat.age}
            onChange={(e) => setNewCat({ ...newCat, age: e.target.value })}
          />
          <label htmlFor='Кількість рибки'>Кількість консервів</label>

          <input
            type='text'
            placeholder='Кількість рибки'
            className='popup-input'
            value={newCat.treats.cans}
            onChange={(e) =>
              setNewCat((prevCat) => ({
                ...prevCat,
                treats: { ...prevCat.treats, cans: e.target.value },
              }))
            }
          />
          <label htmlFor='Кількість цукерок'>Кількість цукерок</label>

          <input
            type='text'
            placeholder='Кількість цукерок'
            className='popup-input'
            value={newCat.treats.candies}
            onChange={(e) =>
              setNewCat((prevCat) => ({
                ...prevCat,
                treats: { ...prevCat.treats, candies: e.target.value },
              }))
            }
          />
          <button className='popup-button' onClick={handleSaveEdit}>
            Зберегти
          </button>
          <button className='popup-button' onClick={() => setEditingCat(null)}>
            Скасувати
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
