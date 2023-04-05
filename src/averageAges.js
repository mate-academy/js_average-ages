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
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => {
      const isMan = person.sex === 'm';
      const fitCentury = Math.ceil(person.died / 100) === century;

      return isMan && fitCentury;
    })
    : people.filter(person => person.sex === 'm');

  const menSumAge = men.reduce((acc, man) => acc + man.died - man.born, 0);

  return Number((menSumAge / men.length).toFixed(2));
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
  const mothers = withChildren
    ? people.filter(person => {
      const isWomen = person.sex === 'f';
      const hasChild = people.some(child => child.mother === person.name);

      return isWomen && hasChild;
    })
    : people.filter(person => person.sex === 'f');

  const momSumAge = mothers.reduce((sum, mom) => sum + mom.died - mom.born, 0);

  return (momSumAge / mothers.length);
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
  const kids = people.filter(kid => onlyWithSon
    ? kid.sex === 'm' && people.some(mom => mom.name === kid.mother)
    : people.some(mom => mom.name === kid.mother));

  const diffAges = kids.reduce((sum, kid) => {
    const mother = people.find(mom => mom.name === kid.mother);

    return sum + kid.born - mother.born;
  }, 0);

  return (diffAges / kids.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
