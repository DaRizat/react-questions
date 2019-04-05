import React from 'react';
import { NextConsumer, PrevConsumer } from 'context';

export default WrappedComponent => (
  <NextConsumer>
    {handleNext => (
      <PrevConsumer>
        {handlePrev => (
          <WrappedComponent handleNext={handleNext} handlePrev={handlePrev} />
        )}
      </PrevConsumer>
    )}
  </NextConsumer>
);
