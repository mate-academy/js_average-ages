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
  const male = (person) => (person.sex === 'm');
  const didInCentury
    = (person) => (male(person) && (Math.ceil(person.died / 100) === century));
  const peopleDate
    = people.filter(century ? didInCentury : male);

  const result = peopleDate.reduce((prev, year) => (
    prev + (year.died - year.born)
  ), 0) / peopleDate.length;

  return result;
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
  const female = (person) => (person.sex === 'f');
  const hasChildren = (person) => (female(person)
    && people.some(one => one.mother === person.name));
  const peopleDate = people.filter(withChildren ? hasChildren : female);

  const result = peopleDate.reduce((prev, year) => (
    prev + (year.died - year.born)
  ), 0) / peopleDate.length;

  return result;
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
  const child = (person) => (
    people.some(mother => mother.name === person.mother)
  );
  const children = (person) => (child(person) && person.sex === 'm');
  const sons = people.filter(onlyWithSon ? children : child);
  const mothers = people.filter(person => (
    sons.some(son => son.mother === person.name))
  );
  const family = (person) => (
    mothers.find(one => one.name === person.mother)
  );
  const peopleDate = sons.map(year => (
    year.born - family(year).born)
  );
  const result
    = peopleDate.reduce((prev, current) => prev + current) / sons.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
