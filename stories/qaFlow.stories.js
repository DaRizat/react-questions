import React from 'react';
import { storiesOf } from '@storybook/react';
import { QuestionFlow } from 'organisms';
import { Question, Answer } from 'molecules';
import { Field } from 'atoms';

storiesOf('QA Flow')
  .add('Example Flow', () => (
    <QuestionFlow>
      <Question asks="What is the title of your project?">
        <Answer name="title">
          <Field component={({ input: { handleChange } }) => (
            <input
              type="text"
              onChange={handleChange}
            />
          )} />
        </Answer>
      </Question>
      <Question asks="What type of project is this?">
        <Answer>
          <Field component={({ input: { handleChange } }) => (
            <select onChange={handleChange}>
              <option>Movie</option>
              <option>Television</option>
            </select>
          )} />
        </Answer>
      </Question>
      <Question
        asks="What is the MPAA rating of your project?"
        if={{ type: 'Movie' }}
      >
        <Answer name="rating">
          <Field component={({ input: { handleChange } }) => (
            <select onChange={handleChange}>
              <option>NR</option>
              <option>R</option>
              <option>PG-13</option>
              <option>PG</option>
              <option>G</option>
            </select>
          )} />
        </Answer>
      </Question>
      <Question
        asks="What is the television rating of your project?"
        if={{ type: 'Television' }}
      >
        <Answer name="rating">
          <Field component={({ input: { handleChange } }) => (
            <select onChange={handleChange}>
              <option>TV-MA</option>
              <option>TV-14</option>
              <option>TV-PG</option>
              <option>TV-G</option>
            </select>
          )} />
        </Answer>
      </Question>
    </QuestionFlow>
  ));
