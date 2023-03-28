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
  const onlyMale = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return onlyMale.reduce((accumulator, current) => {
    return accumulator + (current.died - current.born);
  }, 0) / onlyMale.length;
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
  const onlyFemale = withChildren
    ? people.filter(person => {
      return people.some(children => children.mother === person.name);
    })
    : people.filter(person => person.sex === 'f');

  return onlyFemale.reduce((accumulator, current) => {
    return accumulator + (current.died - current.born);
  }, 0) / onlyFemale.length;
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
  const childArray = onlyWithSon
    ? people.filter(person => {
      return person.sex === 'm'
        && people.some(mother => mother.name === person.mother);
    })
    : people.filter(person => {
      return people.some(mother => mother.name === person.mother);
    });

  return childArray.reduce((accumulator, current) => {
    const mother = people.find(person => current.mother === person.name);

    return accumulator + (current.born - mother.born);
  }, 0) / childArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
