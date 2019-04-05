import React from 'react';

const ValuesContext = React.createContext({});
const ErrorsContext = React.createContext({});
const FormContext = React.createContext({});
const InputContext = React.createContext({});
const NextContext = React.createContext(() => {});
const PrevContext = React.createContext(() => {});
const ChangeContext = React.createContext(() => {});

export const ValuesProvider = ValuesContext.Provider;
export const ValuesConsumer = ValuesContext.Consumer;

export const ErrorsProvider = ErrorsContext.Provider;
export const ErrorsConsumer = ErrorsContext.Consumer;

export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;

export const InputProvider = InputContext.Provider;
export const InputConsumer = InputContext.Consumer;

export const ChangeProvider = ChangeContext.Provider;
export const ChangeConsumer = ChangeContext.Consumer;

export const NextProvider = NextContext.Provider;
export const NextConsumer = NextContext.Consumer;

export const PrevProvider = PrevContext.Provider;
export const PrevConsumer = PrevContext.Consumer;
