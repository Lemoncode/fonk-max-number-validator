import { ValidationSchema, createFormValidation } from '@lemoncode/fonk';
import { maxNumber } from '@lemoncode/fonk-max-number-validator';

const validationSchema: ValidationSchema = {
  field: {
    myField: [
      {
        validator: maxNumber.validator,
        customArgs: { maxValue: 5, strictTypes: true },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

Promise.all([
  formValidation.validateField('myField', 10),
  formValidation.validateField('myField', 1),
]).then(([failedResult, succeededResult]) => {
  document.getElementById('app').innerHTML = `
<div style="flex-grow: 1;margin-left:2rem;">
  <h2>Example with failed result:</h2>

<pre>
  formValidation.validateField('myField', 10)
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(failedResult, null, 2)}
</pre>
</div>

<div style="flex-grow: 1;">
  <h2>Example with succeeded result:</h2>

<pre>
formValidation.validateField('myField', 1)
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(succeededResult, null, 2)}
</pre>
</div>
`;
});
