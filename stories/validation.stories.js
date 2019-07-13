import React from 'react';
import { object, string } from 'yup';
import { storiesOf } from '@storybook/react';
import { QuestionFlow as Questions } from 'organisms';
import { Ask, Branch, Do } from 'molecules';
import TextForm from 'forms/TextForm';
import NameForm from 'forms/NameForm';

const schema = object().shape({
  email: string().email(),
  title: string().required(),
  name: object().shape({
    first: string().required(),
    last: string(),
  }),
  what: string(),
});

const effectCall = () => console.log('EFFECT HAPPENED');

storiesOf('Sample Flow', module)
  .add('Validate email', () => (
    <Questions validates={schema}>
      <Ask question="What is your email address?" name="email">
        <TextForm />
      </Ask>
      <Ask question="What is the title of your project?" name="title">
        <TextForm />
      </Ask>
      <Branch when={values => values.title === 'Special'}>
        <Ask question="What makes your project special?" name="what">
          <TextForm />
        </Ask>
        <Do action={effectCall} />
      </Branch>
      <Ask question="What is your name?" name="name">
        <NameForm />
      </Ask>
    </Questions>
  ));
