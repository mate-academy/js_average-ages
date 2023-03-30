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
  const men = people.filter(man => man.sex === 'm');
  const diedMen = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  function average(human) {
    return human.reduce((sum, person) =>
      sum + (person.died - person.born), 0) / human.length;
  };

  return century ? average(diedMen) : average(men);
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
  const women = people.filter(woman => woman.sex === 'f');
  const mothers = people.filter(person =>
    people.some(mom => (person.name === mom.mother && person.sex === 'f')));

  function average(human) {
    return human.reduce((sum, person) =>
      sum + (person.died - person.born), 0) / human.length;
  };

  return withChildren ? average(mothers) : average(women);
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
  const mothers = people.filter(person =>
    people.some(mom => (person.name === mom.mother && person.sex === 'f')));
  const children = people.filter(person =>
    mothers.some(mom => (person.mother === mom.name)));
  const onlySon = children.filter(son => son.sex === 'm');

  function getAllAge(humans) {
    return humans.map(child =>
      child.born - mothers.find(mom => child.mother === mom.name).born);
  };

  function averageAge(human) {
    return human.reduce((sum, age) => sum + age, 0)
      / human.length;
  };

  return onlyWithSon ? averageAge(getAllAge(onlySon))
    : averageAge(getAllAge(children));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
