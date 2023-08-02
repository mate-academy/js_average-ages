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
  const newPeoples = century ? people.filter(
    person => person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = newPeoples.reduce(
    (acc, per) => acc + (per.died - per.born), 0);

  return totalAge / newPeoples.length;
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
  const woman = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(mother => person.name === mother.mother))
    : people.filter(person => person.sex === 'f');

  const totalAge = woman.reduce(
    (acc, per) => acc + (per.died - per.born), 0);

  return totalAge / woman.length;
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
    ? people.filter(person =>
      people.some(child => child.name === person.mother)
    && person.sex === 'm')
    : people.filter(person =>
      people.some(child => child.name === person.mother));

  let motherAge = 0;

  children.forEach(person => {
    const mothers = people.find(mother => mother.name === person.mother);

    if (mothers) {
      const difference = person.born - mothers.born;

      motherAge += difference;
    }
  });

  return motherAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
