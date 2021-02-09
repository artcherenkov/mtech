import React from 'react';
import PropTypes from 'prop-types';

const FieldItem = ({ value, recordKey, isRecordEditing, setUpdatingRecord }) => {
  const handleChange = (evt) => {
    setUpdatingRecord((prevState) => ({ ...prevState, [recordKey]: evt.target.value }));
  };
  return (
    isRecordEditing && recordKey === `status`
      ? <input type="text" defaultValue={value} onChange={handleChange}/>
      : <p className="record__item-content">{value}</p>
  );
};

FieldItem.propTypes = {
  recordKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRecordEditing: PropTypes.bool.isRequired,
  setUpdatingRecord: PropTypes.func.isRequired,
};

export default FieldItem;
