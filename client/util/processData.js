// import { testData } from './testData';
import _ from 'lodash';

const filteredCategories = ['Interest', 'Credit'];

export function processAmountsData(data) {
}

export function processTransactionData(data) {

}

function isNotFiltered(category) {
  return !filteredCategories.some(filter => {
    return category.includes(filter);
  });
}

export function processCatogoriesData(data) {
  console.log('procesing data...')
  return data.reduce((result, item) => {
    const _category = item._id.category;
    if (_category && isNotFiltered(_category[0])) {
      result.push({ name: _category[0], value: item.count });
    }
    return result;
  }, []);
}

export function retrieveCategories(data) {
  let categories = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id.hasOwnProperty('category_1')) {
      categories.push(data[i]._id.category_1[0]);
    }
    if (data[i]._id.hasOwnProperty('category_2')) {
      categories.push(data[i]._id.category_2[0]);
    }
  }
  const res = _.uniq(categories);
  console.log(res)
  return res;
}
