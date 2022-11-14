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

function average(array) {
  if (!array.length) {
    return 0;
  };

  return array.reduce((a, b) => a + b) / array.length;
};

function findGender(people, sex = 'm') {
  return people.filter(person => person.sex === sex);
};

function calculateMenAverageAge(people, century) {
  const allMen = findGender(people, 'm');

  const filteredMen = century
    ? allMen.filter(men => Math.ceil(men.died / 100) === century)
    : allMen;

  return average(filteredMen.map(men => men.died - men.born));
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
  const allWomen = findGender(people, 'f');

  const filteredWomen = withChildren
    ? allWomen
      .filter(woman => people.some(person => person.mother === woman.name))
    : allWomen;

  return average(filteredWomen.map(woman => woman.died - woman.born));
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
  const allChildren = people.filter(person =>
    findGender(people, 'f').find(woman => person.mother === woman.name));

  const filteredChildren = onlyWithSon
    ? findGender(allChildren, 'm')
    : allChildren;

  const difference = filteredChildren
    .map(child => (child.born
      - people.find(mother => child.mother === mother.name).born));

  return average(difference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
