'use strict';

function calculateAverageAge(obj) {
  const ageSum = obj.reduce((prev, person) => (
    prev + (person.died - person.born)
  ), 0);

  const averageAge = ageSum / obj.length;

  return averageAge;
}

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
  const onlyMen = century

    ? people.filter(person =>
      (Math.ceil(person.died / 100) === century) && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const menAgeAverage = calculateAverageAge(onlyMen);

  return menAgeAverage;
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
  // write code here
  const onlyWomen = withChildren

    ? people.filter(woman => people.some(person => (woman.name
      === person.mother && woman.sex === 'f')))
    : people.filter(woman => woman.sex === 'f');

  const womenAgeAverage = calculateAverageAge(onlyWomen);

  return womenAgeAverage;
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
  // write code here
  const onlyMothers = onlyWithSon

    ? people.filter(person =>
      people.some(mother => mother.name === person.mother)
    && person.sex === 'm')

    : people.filter(person =>
      people.some(mother => mother.name === person.mother));

  const differenceInAge = onlyMothers.map(person => person.born
      - people.find(mother => mother.name === person.mother).born);

  return differenceInAge.reduce((a, b) => a + b) / differenceInAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
