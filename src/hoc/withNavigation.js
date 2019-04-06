import React from 'react';
import { NextConsumer, PrevConsumer } from 'context';

const WithNavigation = (WrappedComponent) => {
  const { props } = WrappedComponent;
  return (
    <NextConsumer>
      {handleNext => (
        <PrevConsumer>
          {handlePrev => (
            <WrappedComponent {...props} handleNext={handleNext} handlePrev={handlePrev} />
          )}
        </PrevConsumer>
      )}
    </NextConsumer>
  );
};

export default WithNavigation;
