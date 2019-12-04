import React, { useState } from 'react';
import classes from './inventoryForm.module.scss';
import Modal from './UI/modal';
// import classes from './inventoryForm.module.scss';
const InventoryForm = React.memo(props => {
  const [option, setOption] = useState('');
  const [amount, setAmount] = useState(0);
  const [dismissModal, setDismissModal] = useState(false);
  const submitHandler = e => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000);
    props.submitHandler({
      name: option,
      amount: parseInt(amount),
      id
    });
  };
  const closeModal = () => setDismissModal(true);
  let content = (
    <div className={classes.section}>
      <form className={classes.form} onSubmit={submitHandler}>
        {!props.isLoading && props.dropdown !== null ? (
          <select onChange={e => setOption(e.target.value)}>
            <option selected>Pick inventory item</option>
            {props.dropdown.map(el => (
              <option key={el.id} value={el.items}>
                {el.items}
              </option>
            ))}
          </select>
        ) : (
          <p>Loading...</p>
        )}
        <input
          type="number"
          placeholder="Amount"
          onChange={e => setAmount(e.target.value)}
        />
        <button className={classes.submit} type="submit">
          submit
        </button>
      </form>
    </div>
  );
  if (props.error) {
    content = (
      <Modal close={closeModal} dismiss={dismissModal}>
        Trouble loading data. Please refresh the page.
      </Modal>
    );
  }
  return content;
});

export default InventoryForm;
