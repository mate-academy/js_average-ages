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
  const filterMen = people.filter(person => person.sex === 'm');
  const sortMen = !century ? filterMen : filterMen
    .filter(man => Math.ceil(man.died / 100) === century);
  const sumAges = sortMen.reduce((sum, man) => sum + (man.died - man.born), 0);

  return sumAges / sortMen.length;
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
  const filterWomen = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person =>
      (people.find(child => child.mother === person.name)));
  const sumAges = filterWomen
    .reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return sumAges / filterWomen.length;
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
  const filterKid = people
    .filter(person => people.find(mother => person.mother === mother.name));

  const sortKid = !onlyWithSon ? filterKid : filterKid
    .filter(kid => kid.sex === 'm');

  const difference = sortKid
    .reduce((sum, kid) =>
      sum + (kid.born - people.find(mother =>
        (mother.name === kid.mother)).born), 0);

  return difference / sortKid.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
