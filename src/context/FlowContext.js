import React from 'react';

const context = React.createContext({});

export const QuestionProvider = context.Provider;
export const QuestionConsumer = context.Consumer;
