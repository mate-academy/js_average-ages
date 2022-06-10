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
const sum = (a, b) => a + b;
const averageAge = list => list.map(
  (person) => person.died - person.born).reduce(sum, 0) / list.length;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    const isMan = person.sex === 'm';

    return !century
      ? isMan
      : isMan && Math.ceil(person.died / 100) === century;
  });

  return averageAge(men);
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
  const women = people.filter(person => {
    const isWoman = person.sex === 'f';
    const hadKid = people.some(kid => kid.mother === person.name);

    return !withChildren
      ? isWoman
      : isWoman && hadKid;
  });

  return averageAge(women);
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
  const children = people.filter(person => {
    const kid = people.some(mother => mother.name === person.mother);
    const son = person.sex === 'm';

    return !onlyWithSon
      ? kid
      : kid && son;
  });

  const agesDiff = children.map(
    kid => kid.born - people.find(person => person.name === kid.mother).born);

  const averageAgeDiff = agesDiff.reduce(sum, 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
