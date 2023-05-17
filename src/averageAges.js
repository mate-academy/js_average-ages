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
function calculateMenAverageAge(people, century = 0) {

  function brosFilter() {
    return century > 0 ? people.filter(bro => bro.sex === 'm'
      && Math.ceil(bro.died / 100)) : people.filter(bro => bro.sex === 'm');
  }

  function brosReducing() {
    return brosFilter().reduce((sum, age) => sum + age.died - age.born);
  }

  return brosReducing();

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
  function withoutChildrens() {
    const foundation = people.filter(person => person.sex === 'f');
    const finallyFunc = foundation.reduce((sum, person) =>
      sum + person.died - person.born, 0);

    return finallyFunc / foundation.length;
  }

  function withChildrens() {
    const foundation = people.filter(person => person.sex === 'f'
    && people.some(mom => mom.mother === person.name));
    const finallyFunc = foundation.reduce((sum, person) =>
      sum + person.died - person.born, 0);

    return finallyFunc / foundation.length;
  }

  return withChildren === true ? withChildrens() : withoutChildrens();
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
    const hasMother = people.some(person => person.name === child.mother);

    return onlyWithSon ? hasMother && child.sex === 'm' : hasMother;
  });

  const diffs = children.reduce((acc, kid) => {
    const mother = people.find(mom => mom.name === kid.mother);

    return acc + (kid.born - mother.born);
  }, 0);

  return diffs / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
