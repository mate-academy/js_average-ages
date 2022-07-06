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
  const filteredPeople = century
    ? people.filter(({ died, sex }) => {
      return century === Math.ceil(died / 100) && sex === 'm';
    })
    : people.filter(({ sex }) => sex === 'm');

  const sumOfAges = filteredPeople.reduce((sum, { died, born }) => {
    return sum + (died - born);
  }, 0);

  return sumOfAges / filteredPeople.length;
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
  const filteredPeople = withChildren
    ? people.filter(({ name, sex }) => {
      return people.some(child => child.mother === name) && sex === 'f';
    })
    : people.filter(({ sex }) => sex === 'f');

  const sumOfAges = filteredPeople.reduce((sum, { died, born }) => {
    return sum + (died - born);
  }, 0);

  return sumOfAges / filteredPeople.length;
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
  const ageDiff = [];
  const mothers = onlyWithSon
    ? people.filter(person =>
      people.some(child => child.mother === person.name && child.sex === 'm'))
    : people.filter(person =>
      person.sex === 'f' && people.some(child => {
        return child.mother === person.name;
      }));

  mothers.map(mother => {
    const children = onlyWithSon
      ? people.filter(child =>
        child.mother === mother.name && child.sex === 'm')
      : people.filter(child => child.mother === mother.name);

    children.map(child => ageDiff.push(child.born - mother.born));
  });

  return ageDiff.reduce((sum, age) => sum + age, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
