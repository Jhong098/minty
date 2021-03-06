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

