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
function calculateMenAverageAge(people, century) {
  let men = people.filter(x => x.sex === 'm');

  if (century !== undefined) {
    men = men.filter(x => Math.ceil(x.died / 100) === century);
  }

  const ageArr = men.map(x => x.died - x.born);

  return ageArr.reduce((a, b) => a + b) / ageArr.length;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(wom => wom.sex === 'f');

  if (withChildren !== undefined) {
    women = people.filter(wom => wom.sex === 'f'
     && people.some(kid => kid.mother === wom.name));
  }

  const ageArr = women.map(wom => wom.died - wom.born);

  return ageArr.reduce((a, b) => a + b) / ageArr.length;
  // write code here
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenWhihCh = people.filter(wom => wom.sex === 'f'
     && people.some(kid => kid.mother === wom.name));

  const difAge = [];

  if (onlyWithSon !== undefined) {
    for (let i = 0; i < womenWhihCh.length; i++) {
      for (let x = 0; x < people.length; x++) {
        if (womenWhihCh[i].name === people[x].mother
          && people[x].sex === 'm') {
          difAge.push(people[x].born - womenWhihCh[i].born);
        }
      }
    }
  }

  if (onlyWithSon === undefined) {
    for (let i = 0; i < womenWhihCh.length; i++) {
      for (let x = 0; x < people.length; x++) {
        if (womenWhihCh[i].name === people[x].mother) {
          difAge.push(people[x].born - womenWhihCh[i].born);
        }
      }
    }
  }

  const result = difAge.reduce((a, b) => a + b) / difAge.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
