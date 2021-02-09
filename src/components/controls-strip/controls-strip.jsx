import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './controls-strip.css';
import { setSearchValue } from "../../store/action";

const ControlsStrip = ({ handleSearchSubmit, handleInputBlur }) => {
  const [search, setSearch] = useState(``);

  const handleSearchChange = (evt) => setSearch(evt.target.value);

  return (
    <div className="controls-strip">
      <form className="controls-strip__search-form" onSubmit={handleSearchSubmit.bind(this, search)}>
        <input
          className="controls-strip__input"
          type="text"
          value={search}
          placeholder="Введите имя клиента"
          onChange={handleSearchChange}
          onBlur={handleInputBlur.bind(this, search)}
        />
        <button className="controls-strip__submit-btn" type="submit"/>
      </form>
    </div>
  );
};

ControlsStrip.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleSearchSubmit(searchValue, evt) {
    evt.preventDefault();
    dispatch(setSearchValue(searchValue));
  },
  handleInputBlur(searchValue) {
    if (!searchValue) {
      dispatch(setSearchValue(``));
    }
  },
});

export { ControlsStrip };
export default connect(null, mapDispatchToProps)(ControlsStrip);
