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
  let maleArr = people.filter(human => human.sex === 'm');

  (century) && (
    maleArr = maleArr.filter(man => (man.died > ((century - 1) * 100))
    && (man.died < ((century) * 100))));

  const maleTotalLongevity = maleArr
    .map(man => man.died - man.born)
    .reduce((total, amount) => total + amount);

  return +(maleTotalLongevity / maleArr.length).toFixed(2);
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  let femArray = people.filter(human => human.sex === 'f');

  (withChildren) && (femArray = femArray
    .filter(woman => people.find(human => human.mother === woman.name)));

  const femTotalLongevity = femArray
    .map(woman => woman.died - woman.born)
    .reduce((total, amount) => total + amount);

  return +(femTotalLongevity / femArray.length).toFixed(2);
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
  let mom;
  let counter = 0;
  let sum = 0;

  for (const person of people) {
    if (person.mother) {
      mom = people.find(elem => elem.name === person.mother);

      if (((person.sex === 'f') && (onlyWithSon)) || (!mom)) {
        continue;
      }
      mom.child = person;
      sum += person.born - mom.born;
      counter++;
    }
  };

  return +(sum / counter).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
