import React, { useCallback, useState } from 'react';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import './style';

import moment from 'moment';

const DatePickerHolder = () => {
  const [date, setDate] = useState(moment(moment.now()).format('YYYY-MM-DD'));
  const onChange = useCallback((date) => {
    console.log('date changed', date,  moment(date));
    setDate(date);
  });
  return (
    <>
      <DatePickerInput
        onChange={onChange}
        value={date}
        className='my-custom-datepicker-component'
      />
  
      <DatePicker onChange={onChange} value={date} />
    </>
  );
}

export default DatePickerHolder;