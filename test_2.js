#!/usr/bin/env ./node_modules/.bin/babel-node
import * as yup from 'yup';

class Main {
  constructor() {
    this.run();
  }

  async run() {
    const params = {};
    const no_sort_edges = [];
    const field_labels = {
      company: {
        name_legal: 'Name Legal',
        first_name: 'First Name',
        age: 'Age',
      },
      owner1: {
        first_name1: 'First Name1',
        surname1: 'Surname1',
        age1: 'Age1',
      },
      owner2: {
        first_name2: 'First Name2',
        surname2: 'Surname2',
        age2: 'Age2',
      },
    };

    for (const index in field_labels) {
      const labels = field_labels[index];
      for (const item in labels) {
        const fields = Object.keys(labels).filter((label) => label !== item);
        console.log('fields=',fields);
        no_sort_edges.unshift(fields);
        params[item] = yup.string().when(
          fields,
          {
            is: (...field_values) => {
              console.log('field_values=',field_values);
              for (const field_value of field_values) {
                if (!!field_value) {
                  console.log('is true because field_value=',field_value);
                  return true;
                }
              }
              console.log('is false');
              return false;
            },
            then: yup.string().required(),
          }
        );
      }
    }
    console.log('no_sort_edges=',no_sort_edges);
    const myNameSchema = yup.object().shape(params, no_sort_edges);

    const values = {
      first_name1: 'bob',
      age1: '23',
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
