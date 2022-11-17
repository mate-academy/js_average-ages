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
  const men = getPeopleByGender(people, 'm');
  const menResult = century
    ? men.filter(person => (Math.ceil(person.died / 100) === century))
    : men;

  const averageMenLifeDuration
    = menResult.map(person => person.died - person.born);

  return averageMenLifeDuration.reduce((a, b) => a + b) / menResult.length;
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
  const women = getPeopleByGender(people, 'f');
  const womenResult = withChildren
    ? women.filter(person => people.find(item =>
      item.mother === person.name) !== undefined)
    : women;

  const averageWomenLifeDuration
    = womenResult.map(person => person.died - person.born);

  return averageWomenLifeDuration.reduce((a, b) => a + b) / womenResult.length;
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
  const children = people.filter(child =>
    people.find(woman => woman.name === child.mother));
  const childrenResult = onlyWithSon
    ? getPeopleByGender(children, 'm')
    : children;

  const ageDifference = childrenResult.map(child => (
    child.born - people.find(mother => child.mother === mother.name).born)
  );

  return ageDifference.reduce((a, b) => a + b) / childrenResult.length;
}

const getPeopleByGender = (people, sex) => {
  return people.filter(person => person.sex === sex);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
