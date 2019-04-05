import React from 'react';
import { storiesOf } from '@storybook/react';
import { QuestionFlow } from 'organisms';
import { Question } from 'molecules';
// import { Field } from 'atoms';
import TitleForm from 'forms/TitleForm';

storiesOf('QA Flow')
  .add('Example Flow', () => (
    <QuestionFlow>
      <Question
        name="title"
        ask="What is the title of your project?"
        answer={TitleForm}
      />
      <Question
        required
        name="title"
        ask="No. really. What is the title of your project?"
        answer={TitleForm}
        condition={data => data.title !== undefined}
      />
      <Question
        name="address"
        ask="What is your address?"
        answer={() => <div>Address Form</div>}
      />
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
