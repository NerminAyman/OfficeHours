import t from 'tcomb-form';

// Validation Engine
const validate = (type, validators) => {
  let message = 'This field is required';

  const validator = t.refinement(type, v => {
    if (!String(v)) {
      return false;
    } else if (validators) {
      if (validators.length <= 1) {
        if (!t.validate(v, validators[0]).isValid()) {
          message = t.validate(v, validators[0]).firstError().message;
          return false;
        }
      } else if (!t.validate(v, t.intersection(validators)).isValid()) {
        message = t.validate(v, t.intersection(validators)).firstError().message;
        return false;
      }
    }
    message = 'This field is required';
    return true;
  });

  validator.getValidationErrorMessage = () => message;
  return validator;
};

export default validate;


// Validators

export const Min = length => {
  const validator = t.refinement(t.String, v => String(v).length >= length);
  validator.getValidationErrorMessage = () => `Minimum length is ${length}`;
  return validator;
};

export const Max = length => {
  const validator = t.refinement(t.String, v => String(v).length <= length);
  validator.getValidationErrorMessage = () => `Maximum length is ${length}`;
  return validator;
};

export const Email = () => {
  const validator = t.refinement(t.String, v => Boolean(v.match('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')));
  validator.getValidationErrorMessage = () => 'Please enter valid email';
  return validator;
};

export const File = () => {
  const Input = t.irreducible('File', x => {
    return x instanceof Input;
  });
};
