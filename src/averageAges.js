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
  const men = century !== undefined
    ? people.filter(x => x.sex === 'm' && Math.ceil(x.died / 100) === +century)
    : people.filter(x => x.sex === 'm');

  const summ = men.reduce(
    (accumulator, currentValue) =>
      accumulator + (+currentValue.died - +currentValue.born),
    0
  );

  return summ / men.length;
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
  const women = withChildren
    ? people.filter(x => x.sex === 'f' && people.some(y => x.name === y.mother))
    : people.filter(x => x.sex === 'f');

  const summ = women.reduce(
    (accumulator, currentValue) =>
      accumulator + (+currentValue.died - +currentValue.born),
    0
  );

  return summ / women.length;
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
  const women = people.filter(x => x.sex === 'f');
  let children = onlyWithSon
    ? people.filter(x => x.sex === 'm' && women.some(y => x.mother === y.name))
    : people.filter(x => women.some(y => x.mother === y.name));

  children = children.map(x => {
    x.parent = people.find(y => x.mother === y.name);

    return x;
  });

  const summ = children.reduce(
    (accumulator, currentValue) =>
      accumulator + (+currentValue.born - +currentValue.parent.born),
    0
  );

  return summ / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
