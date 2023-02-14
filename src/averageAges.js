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
  const menArr = century
    ? people.filter(person => person.sex === 'm'
        && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return calculateAverageAge(menArr);
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
  const womenArr = withChildren
    ? people.filter(person => person.sex === 'f'
        && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return calculateAverageAge(womenArr);
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
    ? people.filter(person => {
      return person.sex === 'm'
        && people.some(mother => mother.name === person.mother);
    })
    : people.filter(child => {
      return people.some(mother => child.mother === mother.name);
    });

  const sumAge = children.reduce((sum, person) => {
    const motherInfo = people.find(mother => mother.name === person.mother);

    return person.born - motherInfo.born + sum;
  }, 0);

  return sumAge / children.length;
}

function calculateAverageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
