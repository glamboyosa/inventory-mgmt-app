import React, { useState, useCallback, useContext, useEffect } from 'react';
import classes from './inventory.module.scss';
import InventoryList from './inventoryList';
import InventoryForm from './inventoryForm';
import Modal from './UI/modal';
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
    fetchData();
  }, [fetchData]);
  const submitHandler = useCallback(data => {
    setData(prevState => prevState.concat(data));
  }, []);
  const IncrementInventoryHandler = useCallback(
    id => {
      const index = data.findIndex(el => el.id === id);
      const newData = [].concat(...data);
      newData[index].amount = newData[index].amount + 1;
      setData(newData);
    },
    [data]
  );

  const decrementInventoryHandler = useCallback(
    id => {
      const index = data.findIndex(el => el.id === id);
      const newData = [].concat(...data);
      newData[index].amount = newData[index].amount - 1;
      setData(newData);
    },
    [data]
  );
  const deleteInventoryHandler = useCallback(
    id => {
      let newData = [...data];
      const index = newData.findIndex(el => el.id === id);
      console.log(index);
      newData.splice(index, 1);

      setData(newData);
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
          console.log(amt);
          quarterTheAmt = amt * 0.25;
          console.log(quarterTheAmt);
          localStorage.setItem('quarterTheAmount', quarterTheAmt);
          setRunOnce(false);
        }
        quarterTheAmt = localStorage.getItem('quarterTheAmount');
        console.log(el.amount < quarterTheAmt);
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
      <InventoryForm submitHandler={submitHandler} />
      <InventoryList
        inventory={data}
        deleteHandler={deleteInventoryHandler}
        decreaseInventory={decrementInventoryHandler}
      />
    </div>
  );
  if (authContext.isAuth) {
    content = <Redirect to="/auth" />;
  }
  console.log(fetchedData);
  return content;
};

export default Inventory;
