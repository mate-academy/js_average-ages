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
  let men = people.filter(person => person.sex === 'm');

  men = century
    ? people.filter(person => (Math.ceil(person.died / 100) === century)
    && person.sex === 'm')
    : men;

  return calculateAverageAge(men);
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
  let women = people.filter(person => person.sex === 'f');

  women = withChildren
    ? people.filter(person =>
      (people.some(child => child.mother === person.name)))
    : women;

  return calculateAverageAge(women);
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
  const children = onlyWithSon
    ? people.filter(child => (
      people.find(mother => (
        child.mother === mother.name)) && child.sex === 'm'))
    : people.filter(child => (
      people.find(mother => (
        child.mother === mother.name))));

  return children.reduce((sum, child) => {
    const motherBorn = people.find(mother => (
      child.mother === mother.name)).born;

    return sum + child.born - motherBorn;
  }, 0) / children.length;
}

function calculateAverageAge(filtredPeople) {
  return filtredPeople.reduce(
    (sum, obj) => sum + (obj.died - obj.born), 0) / filtredPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
