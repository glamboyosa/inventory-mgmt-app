import React, { useState, useCallback, useContext, useEffect } from 'react';
import classes from './inventory.module.scss';
import InventoryList from './inventoryList';
import InventoryForm from './inventoryForm';
import Modal from './UI/modal';
import Nav from './UI/nav';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './context/auth-context';
import useHttp from './hooks/http';
const Inventory = () => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [runOnce, setRunOnce] = useState(true);
  const [dismissModal, setDismissModal] = useState(false);
  const { isLoading, fetchedData, error, fetchData } = useHttp();
  useEffect(() => {
    if (authContext.token !== null) {
      fetchData(authContext.token);
    }
    if (localStorage.getItem('data')) {
      setData(JSON.parse(localStorage.getItem('data')));
    }
    return () => null;
  }, [fetchData, authContext]);
  const submitHandler = useCallback(formData => {
    setData(prevState => prevState.concat(formData));
    const array = [];
    array.push(formData);
    const oldData = JSON.parse(localStorage.getItem('data'));
    if (oldData) {
      oldData.push(formData);
      localStorage.setItem('data', JSON.stringify(oldData));
    } else {
      localStorage.setItem('data', JSON.stringify(array));
    }
  }, []);

  const decrementInventoryHandler = useCallback(
    id => {
      const index = data.findIndex(el => el.id === id);
      const newData = [].concat(...data);
      newData[index].amount = newData[index].amount - 1;
      setData(newData);
      localStorage.setItem('data', JSON.stringify(data));
    },
    [data]
  );
  const deleteInventoryHandler = useCallback(
    id => {
      let newData = [...data];
      const index = newData.findIndex(el => el.id === id);
      newData.splice(index, 1);
      setData(newData);
      localStorage.setItem('data', JSON.stringify(newData));
    },
    [data]
  );
  const closeModal = () => setDismissModal(true);
  let content = (
    <div className={classes.main}>
      {data.map(el => {
        let amt;
        let quarterTheAmt;
        if (runOnce) {
          amt = el.amount;
          quarterTheAmt = amt * 0.25;
          localStorage.setItem('quarterTheAmount', quarterTheAmt);
          setRunOnce(false);
        }
        quarterTheAmt = localStorage.getItem('quarterTheAmount');
        return (
          el.amount < quarterTheAmt && (
            <Modal
              className={classes.main__modal}
              close={closeModal}
              dismiss={dismissModal}
            >
              {el.name} only has {el.amount} left.
              <br /> Consider re-stocking soon.
            </Modal>
          )
        );
      })}
      <Nav />
      <InventoryForm
        submitHandler={submitHandler}
        dropdown={fetchedData}
        isLoading={isLoading}
        error={error}
      />
      <InventoryList
        inventory={data}
        deleteHandler={deleteInventoryHandler}
        decreaseInventory={decrementInventoryHandler}
      />
    </div>
  );
  if (!authContext.isAuth) {
    content = <Redirect to="/auth" />;
  }
  console.log(fetchedData);
  return content;
};

export default Inventory;
