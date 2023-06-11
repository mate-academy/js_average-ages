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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const menArray = people.filter(
    person => person.sex === 'm'
      && (century ? Math.ceil(person.died / 100) === century : true)
  );

  const years = menArray.map(person => person.died - person.born);

  return calculateAverageAge(years);
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
  const womenArray = people.filter(
    (person, index, arr) => {
      return person.sex === 'f'
        // eslint-disable-next-line max-len
        && (withChildren ? arr.some(item => item.mother === person.name) : true);
    });

  const years = womenArray.map(person => person.died - person.born);

  return calculateAverageAge(years);
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
  // const differences = people.map(person => people.find(person.mother));
  const children = people.filter(person =>
    (!onlyWithSon || person.sex === 'm')
    && people.some(item => item.name === person.mother));

  const differences = children.map(person =>
    person.born - people.find(item => item.name === person.mother).born);

  return calculateAverageAge(differences);
}

function calculateAverageAge(years) {
  const sumOfAge = years.reduce((sum, age) => sum + age, 0);

  return sumOfAge / years.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
