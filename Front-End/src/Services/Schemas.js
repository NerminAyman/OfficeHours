import t from 'tcomb-form';

import validate, {
  Min,
  Max,
  Email
} from '../Services/Validation';

export default {
  email: validate(t.String, [
    Email()
  ]),
  password: validate(t.String, [
    Min(3),
    Max(40)
  ]),
  name: validate(t.String, [
    Min(3),
    Max(40)
  ]),
  field: validate(t.String, [
    Min(3),
    Max(40)
  ]),
  username: validate(t.String, [
    Min(3),
    Max(40)
  ]),
  description: validate(t.String, [
    Min(3),
    Max(40)
  ]),
  message: validate(t.String, [
    Min(10),
    Max(1400)
  ]),
  Tag: validate(t.String, [
    Min(3),
    Max(40)
  ]),
  list: validate(t.list(t.String)),
  imgPath: validate(t.String)
};
