const MESSAGES = {
  invalidFormat: 'Invalid format',
  isLength: (min, max) =>
    `${min && max ? `From ${min} - ${max} character(s)` : min ? `Greater than ${min} character(s)` : max ? `Less than ${max} character(s)` : ''}`,
  isObject: 'Must be an object',
  isString: 'Must be a string',
  equals: 'Mismatched',
  isArray: (min, max) =>
    `Must be an array${min && max ? ` between ${min} and ${max} element(s)` : min ? ` greater than or equal to ${min} element(s)` : max ? ` less than or equal to ${max} element(s)` : ''}`,
  notEmpty: 'Required',
  priority: 'Must be a string containing a single digit from 1 to 9',
  isNumeric: 'Must be a number',
  notFound: 'Not found',
  isEmail: 'Must be an email',
  isExisted: 'Already exists',
  doesNotMatch: 'Does not match',
  invalidToken: 'Invalid token',
  unauthorized: 'Unauthorized',
  forbidden: 'Forbidden',
  isIn: (values) => `Only accept ${values.join(', ')}`,
  success: 'Success',
  failure: 'Failure',
  isInt: (min, max) =>
    `Must be an integer${min && max ? ` between ${min} and ${max}` : min ? ` greater than or equal to ${min}` : max ? ` less than or equal to ${max}` : ''}`,
  isFloat: 'Must be a float',
  isDouble: 'Must be a double',
  isBoolean: 'Must be a boolean',
  missingToken: 'Missing token',
  invalid: 'Invalid'
}

export { MESSAGES }
