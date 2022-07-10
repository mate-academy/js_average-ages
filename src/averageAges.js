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
  const mans = people.filter(human => {
    return human.sex !== 'm'
      ? false : century === undefined
        ? true : Math.ceil(human.died / 100) === century;
  });
  const lifeLength = mans.map(human => {
    return human.died - human.born;
  });

  return lifeLength.reduce((a, b) => a + b) / lifeLength.length;
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
  const women = people.filter(human => {
    return human.sex !== 'f'
      ? false : withChildren === undefined
        ? true : people.some(person => person.mother === human.name);
  });

  const lifeLength = women.map(human => {
    return human.died - human.born;
  });

  return lifeLength.reduce((a, b) => a + b) / lifeLength.length;
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
  const children = people.filter(human => {
    return (!people.find(person => person.name === human.mother))
      ? false : onlyWithSon
        ? people.find(person => person.name
          === human.mother && human.sex === 'm')
        : person => person.name === human.mother;
  });

  const ageDifference = children.map(human => {
    return human.born - people.find(person => {
      return person.name === human.mother;
    }).born;
  });

  return ageDifference.reduce((prev, current) => prev + current)
        / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
