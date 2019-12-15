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
  const [restockState, setRestockState] = useState(false);
  const [btnState, setBtnState] = useState(true);
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
    console.log(formData);
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
  const restock = useCallback(() => {
    setRestockState(true);
    setBtnState(false);
  }, []);
  const restockHandler = useCallback(
    formData => {
      const { name, amount } = formData;
      const newData = [...data];
      const index = newData.findIndex(el => el.name === name);
      console.log(amount);
      console.log(index);
      newData[index].amount = amount + newData[index].amount;
      setData(newData);
      localStorage.setItem('data', JSON.stringify(data));
      setRestockState(false);
      setBtnState(true);
    },
    [data]
  );
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
              btnInfo="Restock"
              restockstate={restock}
              btnstate={btnState}
            >
              {el.name} only has {el.amount} left.
              <br /> Consider re-stocking soon.
            </Modal>
          )
        );
      })}
      <Nav />
      <InventoryForm
        restockstate={false}
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

  if (restockState) {
    return (
      <Modal
        className={classes.main__modal}
        close={closeModal}
        dismiss={dismissModal}
      >
        <InventoryForm
          restockstate={true}
          submitHandler={restockHandler}
          dropdown={fetchedData}
          isLoading={isLoading}
          error={error}
        />
      </Modal>
    );
  }
  return content;
};

export default Inventory;
