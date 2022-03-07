#!/usr/bin/env ./node_modules/.bin/babel-node
import * as yup from 'yup';

class Main {
  constructor() {
    this.run();
  }

  async run() {
    const myNameSchema = yup.object().shape({
      first_name: yup.string().when(['surname', 'age'], {
        is: (surname, age) => surname || age,
        then: yup.string().required()
      }),
      surname: yup.string().when(['first_name', 'age'], {
        is: (first_name, age) => first_name || age,
        then: yup.string().required()
      }),
      age: yup.number().when(['first_name', 'surname'], {
        is: (first_name, surname) => first_name || surname,
        then: yup.number().required()
      }),
      i_am_optional: yup.string(),
    }, [
      ['first_name', 'surname'], // <--- adding your fields which need validation
      ['first_name', 'age'],
      ['surname', 'age']
    ]);

    const values = {
      first_name: 'bob',
      i_am_optional: 'foo',
    };
    try {
      await myNameSchema.validate(values, {
        abortEarly: false,
        context: values,
      });
    } catch (e) {
      console.log('e=',e);
    }
    console.log('done');
  }
}

const main = new Main();
