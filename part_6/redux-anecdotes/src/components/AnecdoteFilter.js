import React from "react";
import { useDispatch } from "react-redux";

import filterActions from "../store/actions/filterActions";

export default function () {
  const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    dispatch(filterActions.setFilter(event.target.value));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}
