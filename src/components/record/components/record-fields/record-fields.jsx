import React from "react";
import PropTypes from 'prop-types';

import { convertCamelToSnake } from "../../../../utils/common";
import { RecordField } from "../../record";

const RecordFields = ({ record }) => {
  return (
    <div className="record__fields">
      {Object.entries(record).filter(([key]) => key !== `id`).map(([key, value], i) => {
        const fieldTitle = RecordField[convertCamelToSnake(key).toUpperCase()];
        const isInlineValue = typeof value === `string` || typeof value === `number`;
        return (
          <div className="record__item" key={`field-${i}`}>
            <h3 className="record__item-title">{fieldTitle}</h3>
            {isInlineValue
              ? <p className="record__item-content">{value}</p>
              : <ul className="record__services-list">
                {value.map((item, i) => (
                  <li key={`item-${i}`} className="record__services-item">
                    <p className="record__item-content">{item}</p>
                  </li>
                ))}
              </ul>}
          </div>
        );
      })}
    </div>
  );
};

RecordFields.propTypes = {
  record: PropTypes.object.isRequired,
};

export default RecordFields;
