import React from 'react';
import { IndexConsumer, NextConsumer, PrevConsumer } from 'context';

const WithNavigation = (WrappedComponent) => {
  const { props } = WrappedComponent;
  return (() => (
    <NextConsumer>
      {handleNext => (
        <PrevConsumer>
          {handlePrev => (
            <IndexConsumer>
              {index => (
                <WrappedComponent
                  {...props}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  current={index.current}
                  total={index.total}
                />
              )}
            </IndexConsumer>
          )}
        </PrevConsumer>
      )}
    </NextConsumer>
  ));
};

export default WithNavigation;
