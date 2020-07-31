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
  const menAll = people.filter(person => person.sex === 'm');
  const ageMenAll = menAll.map(({ died, born }) => died - born);
  const sumAgeMenAll = ageMenAll.reduce((sum, age) => sum + age, 0);
  const men = people.filter(person => person.sex === 'm'
  && Math.ceil(person.died / 100) === century);
  const ageMen = men.map(({ died, born }) => died - born);
  const sumAgeMen = ageMen.reduce((sum, age) => sum + age, 0);

  return (century === undefined) ? sumAgeMenAll / ageMenAll.length
    : sumAgeMen / ageMen.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f'
  && people.some(child => child.mother === person.name));
  const ageWomen = women.map(({ died, born }) => died - born);
  const sumAgeWomen = ageWomen.reduce((sum, age) => sum + age, 0);
  const womenAll = people.filter(person => person.sex === 'f');
  const ageWomenAll = womenAll.map(({ died, born }) => died - born);
  const sumAgeWomenAll = ageWomenAll.reduce((sum, age) => sum + age, 0);

  return (withChildren === undefined) ? sumAgeWomenAll / ageWomenAll.length
    : sumAgeWomen / ageWomen.length;

  // write code here
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
  const children = people.filter(person => people.some(mom =>
    person.mother === mom.name));
  const son = people.filter(person => people.some(mom =>
    person.mother === mom.name) && person.sex === 'm');
  const result1 = children.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / children.length;
  const result2 = son.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / son.length;

  return (onlyWithSon === undefined) ? result1 : result2;
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
