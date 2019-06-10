import React from 'react';

export const ChangeContext = React.createContext(() => {});
export const ChangeProvider = ChangeContext.Provider;
export const ChangeConsumer = ChangeContext.Consumer;

export const ErrorsContext = React.createContext({});
export const ErrorsProvider = ErrorsContext.Provider;
export const ErrorsConsumer = ErrorsContext.Consumer;

export const FormContext = React.createContext({});
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;

export const InputContext = React.createContext({});
export const InputProvider = InputContext.Provider;
export const InputConsumer = InputContext.Consumer;

export const NextContext = React.createContext(() => {});
export const NextProvider = NextContext.Provider;
export const NextConsumer = NextContext.Consumer;

export const PrevContext = React.createContext(() => {});
export const PrevProvider = PrevContext.Provider;
export const PrevConsumer = PrevContext.Consumer;

export const ValidationContext = React.createContext(() => {});
export const ValidationProvider = ValidationContext.Provider;
export const ValidationConsumer = ValidationContext.Consumer;

export const ValuesContext = React.createContext({});
export const ValuesProvider = ValuesContext.Provider;
export const ValuesConsumer = ValuesContext.Consumer;
