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
  // replace `if ()` statement with logical operators (&&, ||)
  // or ternary operator (?:)
  // without nesting

  let result = 0;
  const men = (century)
    ? people.filter(human => human.sex === 'm'
      && Math.ceil(human.died / 100) === century)
    : people.filter(human => human.sex === 'm');

  result = men.map(man => {
    return man.died - man.born;
  }).reduce((s, current) => s + current) / men.length;

  return result;
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
  let result = 0;
  const women = (withChildren)
    ? people.filter(human => people.some(kid => kid.mother === human.name))
    : people.filter(human => human.sex === 'f');

  result = women.map(woman => {
    return woman.died - woman.born;
  }).reduce((s, current) => s + current) / women.length;

  return result;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  let result = 0;

  const kids = (onlyWithSon)
    ? people.filter(human => people.some(kid => {
      return kid.name === human.mother && human.sex === 'm';
    }))
    : people.filter(human => people.some(kid => kid.name === human.mother));

  const callback = (r, hum) => {
    return {
      ...r,
      [hum['name']]: hum,
    };
  };

  const mothers = people
    .filter(human => people
      .some(kid => kid.mother === human.name))
    .reduce(callback, {});

  result = kids.map(item => {
    return item.born - mothers[item.mother].born;
  }).reduce((s, current) => s + current) / kids.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
