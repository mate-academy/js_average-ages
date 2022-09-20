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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlyMan = people.filter(person => person.sex === 'm');
  const onlyCenruty = century ? people.filter(person => person.sex === 'm'
  && Math.ceil(person.died / 100) === century) : onlyMan;

  const averManAge = onlyCenruty.reduce((sum, m) => sum + (m.died - m.born), 0)
  / onlyCenruty.length;

  return averManAge;
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
  // write code here
  const onlyWomen = people.filter(person => person.sex === 'f');
  const womenWithCh = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => person.name === child.mother)) : onlyWomen;
  const averWomenAge = womenWithCh.reduce((sum, f) =>
    sum + (f.died - f.born), 0) / womenWithCh.length;

  return averWomenAge;
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
  // write code here
  const onlySon = onlyWithSon
    ? people.filter(child =>
      (people.find(mother => mother.name === child.mother)
    && child.sex === 'm'))
    : people.filter(child =>
      (people.find(mother => mother.name === child.mother)));

  const age = onlySon.reduce((sum, child) => {
    return sum + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / onlySon.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
