import React from 'react';
import { storiesOf } from '@storybook/react';
import { QuestionFlow } from 'organisms';
import { Ask, Branch } from 'molecules';
// import { Field } from 'atoms';
import TitleForm from 'forms/TitleForm';
import TextForm from 'forms/TextForm';

storiesOf('QA Flow', module)
  .add('Example Flow', () => (
    <QuestionFlow>
      <Ask name="title" question="What is the title of your project?">
        <TitleForm />
      </Ask>
      <Branch when={values => values.title === 'Batman'}>
        <Ask name="joker" question="Ever dance with the Devil in the pale moonlight?">
          <TextForm />
        </Ask>
      </Branch>
    </QuestionFlow>
  ));

/*
      <Question name="type" ask="What type of project is this?" answer={ProjectTypeForm} />
      <Question
        name="rating"
        if={data => data.type === 'Movie'}
        asks="What is the MPAA rating of your project?"
        component={MpaaRatingForm}
      />
      <Answer>
        <Field component={({ input: { handleChange } }) => (
          <select onChange={handleChange}>
            <option>NR</option>
            <option>R</option>
            <option>PG-13</option>
            <option>PG</option>
            <option>G</option>
          </select>
        )}
        />
      </Answer>
      <Question
        name="rating"
        asks="What is the television rating of your project?"
        if={data => data.type === 'Television'}
      >
        <Answer>
          <Field component={({ input: { handleChange } }) => (
            <select onChange={handleChange}>
              <option>TV-MA</option>
              <option>TV-14</option>
              <option>TV-PG</option>
              <option>TV-G</option>
            </select>
          )}
          />
        </Answer>
      </Question>
*/
