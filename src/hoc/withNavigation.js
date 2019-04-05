import React from 'react';
import { NextConsumer, PrevConsumer } from 'context';

const WithNavigation = wrapped => (
  <NextConsumer>
    {handleNext => (
      <PrevConsumer>
        {(handlePrev) => {
          const WrappedComponent = React.cloneElement(
            wrapped,
            {
              ...wrapped.props,
              handleNext,
              handlePrev,
            },
          );
          return (
            <WrappedComponent />
          );
        }}
      </PrevConsumer>
    )}
  </NextConsumer>
);

export default WithNavigation;
