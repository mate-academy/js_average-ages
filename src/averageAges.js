'use strict';

function calculateAverageAge(people) {
  return people.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0) / people.length;
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
  const filteredManArray = people.filter(person => century
    ? (person.sex === 'm') && (Math.ceil(person.died / 100) === century)
    : person.sex === 'm'
  );

  return calculateAverageAge(filteredManArray);
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
  const womanFilteredArray = people
    .filter(person => withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
    );

  return calculateAverageAge(womanFilteredArray);
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
  const notOrphans = people.filter(child => people
    .some(person => onlyWithSon
      ? (person.name === child.mother) && (child.sex === 'm')
      : person.name === child.mother
    ));

  return notOrphans.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / notOrphans.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
