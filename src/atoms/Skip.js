import React from 'react';
import { NextConsumer } from 'context';

const Skip = () => (
  <NextConsumer>
    {nextAction => nextAction()}
  </NextConsumer>
);

export default Skip;
