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

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  const menAges = men.map(man => man.died - man.born);

  const menAgesSum = menAges.reduce((sum, current) => sum + current);

  return menAgesSum / menAges.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(woman => {
      return people.some(person => person.mother === woman.name);
    });
  }

  const womenAges = women.map(woman => woman.died - woman.born);

  const womenAgesSum = womenAges.reduce((sum, current) => sum + current);

  return womenAgesSum / womenAges.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => {
    return onlyWithSon
      ? people.some(mother => {
        return (mother.name === child.mother) && child.sex === 'm';
      })
      : people.some(mother => mother.name === child.mother);
  });

  const ageDiff = children
    .map(child => {
      return child.born - (people.find(mother => {
        return mother.name === child.mother;
      }).born);
    })
    .reduce((sum, current) => sum + current);

  return ageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
