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
  const filteredMen = people.filter(man => {
    const isMan = man.sex === 'm';

    return (century !== undefined)
      ? Math.ceil(man.died / 100) === century && isMan
      : isMan;
  });

  const sumOfAges = filteredMen.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0);

  return sumOfAges / filteredMen.length;
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
  const milfs = people.filter(milf => {
    return (withChildren === true)
      ? (people.some(hasThisMother => hasThisMother.mother === milf.name))
      : milf.sex === 'f';
  });

  const sumFilteredAges = milfs.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0);

  return sumFilteredAges / milfs.length;
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
  const children = people.filter(child => {
    return (onlyWithSon === true)
      ? people.some(mother => mother.name === child.mother) && child.sex === 'm'
      : people.some(mother => mother.name === child.mother);
  });

  const ageDiggerence = children.reduce((sum, boy) => {
    const dif = boy.born - people.find(mom => mom.name === boy.mother).born;

    return sum + dif;
  }, 0);

  return ageDiggerence / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
