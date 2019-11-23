import React, { useState } from 'react';
import classes from './inventoryForm.module.scss';
// import classes from './inventoryForm.module.scss';
const InventoryForm = React.memo(props => {
  const [option, setOption] = useState('');
  const [amount, setAmount] = useState(0);
  const submitHandler = e => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000);
    console.log({ name: option, amount, id });
    props.submitHandler({
      name: option,
      amount: parseInt(amount),
      id
    });
  };

  return (
    <div className={classes.section}>
      <form className={classes.form} onSubmit={submitHandler}>
        <select onChange={e => setOption(e.target.value)}>
          <option value="">Inventory List</option>
          <option value="client-counsellor form">Client-Counsellor Form</option>
          <option value="letterhead">Letterhead</option>
          <option value="A4">A4 Paper</option>
        </select>
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
});

export default InventoryForm;
