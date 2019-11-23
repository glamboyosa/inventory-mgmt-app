import React from 'react';
import classes from './inventoryList.module.scss';
import { IoIosClose } from 'react-icons/io';
const InventoryList = React.memo(props => {
  return (
    props.inventory && (
      <div className={classes.uCenter}>
        <h2 className={classes.headingSecondary}>STOCK LEFT</h2>
        <div className={classes.inventoryList}>
          <ul>
            {props.inventory.map(el => (
              <div key={el.id}>
                <li key={el.id}>
                  <span>{el.name}</span>
                  <span>{el.amount}</span>
                  <span onClick={() => props.deleteHandler(el.id)}>
                    <IoIosClose className={classes.inventoryList__delete} />
                  </span>
                </li>
                <div className={classes.uCenter}>
                  <button
                    className={classes.inventoryList__decrease}
                    onClick={() => props.decreaseInventory(el.id)}
                  >
                    Decrease
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  );
});

export default InventoryList;
