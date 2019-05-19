import React from 'react';
import * as _ from 'lodash';
import t from 'tcomb-form';

import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import PasswordInput from 'grommet/components/PasswordInput';
import Select from 'grommet/components/Select';

const FormsLayout = locals => {
  const inputs = _.map(locals.inputs, (value, key) => value);

  return (
    <Form pad='none' plain={true} className='dashboard-form'>
      <FormFields>
        <For each='item' of={inputs} index='i'>
          <div key={i}>
            {item}
          </div>
        </For>
      </FormFields>

      { locals.config.description }

      { locals.config.footer }
    </Form>
  );
};

export class TextLayout extends t.form.Component {
  getTemplate() {
    return locals => {
      return (
        <FormField error={(locals.error) ? <span></span> : false} label={locals.label}>
          <TextInput
            onDOMChange={e => locals.onChange(e.target.value)}
            value={locals.value}
            placeHolder={locals.config.placeholder || ''}
          />
          <div className='grommetux-form-field__error'>{locals.error}</div>
        </FormField>
      );
    };
  }
}

export class PasswordLayout extends t.form.Component {
  getTemplate() {
    return locals => {
      return (
        <FormField error={locals.error} label={locals.label}>
          <PasswordInput
            onChange={e => locals.onChange(e.target.value)}
            value={locals.value}
            placeholder={locals.config.placeholder || ''}
          />
        </FormField>
      );
    };
  }
}

export class CheckboxesLayout extends t.form.Component {
  getTemplate() {
    return locals => {
      return (
        <FormField error={(locals.error) ? <span></span> : false} label={locals.label}>
          <Select
            placeHolder='None'
            multiple={true}
            inline={true}
            options={locals.config.choices}
            value={[ ...locals.value ]}
            onChange={e => locals.onChange(e.value)}
          />
          <div className='grommetux-form-field__error'>{locals.error}</div>
        </FormField>
      );
    };
  }
}

export default FormsLayout;
