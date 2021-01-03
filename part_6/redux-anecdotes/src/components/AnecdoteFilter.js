import React from "react";
import { connect } from "react-redux";

import filterActions from "../store/actions/filterActions";

function Filter(props) {
  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    props.setFilter(event.target.value);
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}

const ConnectedFilter = connect(null, { setFilter: filterActions.setFilter })(
  Filter
);

export default ConnectedFilter;
