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
 *
 */
const calculateAverageAge = function(array) {
  const length = array.length;

  return array.reduce((sum, age) => sum + age, 0) / length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const ages = people
    .filter((person) => century
      ? person.sex === 'm'
      && century === Math.ceil(person.died / 100)
      : person.sex === 'm')
    .map((person) => person.died - person.born);

  return calculateAverageAge(ages) || 0;
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
  const mothers = people
    .filter(person => person.mother)
    .map(person => person.mother);

  const ages = people
    .filter(person => withChildren
      ? person.sex === 'f' && mothers.includes(person.name)
      : person.sex === 'f')
    .map(person => person.died - person.born);

  return calculateAverageAge(ages) || 0;
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
  const mothersNames = people
    .filter(person => person.mother)
    .map(person => person.mother);

  const mothersBirthDate = people
    .filter(person => mothersNames.includes(person.name))
    .reduce((prev, person) => {
      return {
        ...prev,
        [person.name]: person.born,
      };
    }, {});

  const children = people
    .filter(person => onlyWithSon
      ? person.mother && person.sex === 'm'
      && Object.keys(mothersBirthDate).includes(person.mother)
      : person.mother
      && Object.keys(mothersBirthDate).includes(person.mother));

  const ageDifferences = children
    .map(person => person.born - mothersBirthDate[person.mother]);

  const sumOfdifferences
  = ageDifferences.reduce((sum, value) => sum + value, 0);

  return (sumOfdifferences / ageDifferences.length) || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
