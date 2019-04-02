import React from 'react';

const ValuesContext = React.createContext({});
const ErrorsContext = React.createContext({});
const ActionsContext = React.createContext({});
const FormContext = React.createContext({});
const InputContext = React.createContext({});

export const ValuesProvider = ValuesContext.Provider;
export const ValuesConsumer = ValuesContext.Consumer;

export const ErrorsProvider = ErrorsContext.Provider;
export const ErrorsConsumer = ErrorsContext.Consumer;

export const ActionsProvider = ActionsContext.Provider;
export const ActionsConsumer = ActionsContext.Consumer;

export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;

export const InputProvider = InputContext.Provider;
export const InputConsumer = InputContext.Consumer;
