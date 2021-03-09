'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
*/
function calculateMenAverageAge(people, centure) {
  let filterArrFirst = [];
  let filterArr = [];
  let result;

  centure !== undefined
    ? filterArrFirst
    = people.filter((x) => Math.ceil(x.died / 100) === centure)
    : filterArrFirst = people;

  filterArr = filterArrFirst.filter((x) => x.sex === 'm');

  result = filterArr.reduce((total, x) => total
  + x.died - x.born, 0);

  result = result / filterArr.length;

  return result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let filterArrFirst = [];
  let filterArr = [];
  let result;

  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (people[i].name === people[j].mother) {
        people[i].withChild = 'yes';
      }
    }
  }

  withChildren !== undefined
    ? filterArrFirst
    = people.filter((x) => x.withChild === 'yes')
    : filterArrFirst = people;

  filterArr = filterArrFirst.filter((x) => x.sex === 'f');

  result = filterArr.reduce((total, x) => total
  + x.died - x.born, 0);

  result = result / filterArr.length;

  return result;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let result;

  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (people[i].name === people[j].mother) {
        people[j].isChild = 'yes';
        people[j].mother = people[i];
      }
    }
  }

  const filterArrFirst
  = people.filter((x) => x.isChild === 'yes');

  const haveSon = filterArrFirst.filter((x) => x.sex === 'm');

  if (onlyWithSon === true) {
    result = haveSon.reduce((total, y) => total
    + y.born - y.mother.born, 0);
    result = result / haveSon.length;

    return result;
  }

  result = filterArrFirst.reduce((total, y) => total
  + y.born - y.mother.born, 0);
  result = result / filterArrFirst.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
