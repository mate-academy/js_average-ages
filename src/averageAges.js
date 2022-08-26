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
  // const callback = (man) => {
  //   if (!century) {
  //     return man.sex === 'm';
  //   } else {
  //     return man.sex === 'm' && Math.ceil(man.died / 100) === century;
  //   }
  // };

  const fromCentury = century
    ? people.filter(man => man.sex === 'm'
    && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  const result = fromCentury
    .map(man => man.died - man.born)
    .reduce((a, b) => a + b) / fromCentury.length;

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
  const women = withChildren
    ? people.filter(mother => people
      .find(person => (person.mother === mother.name)))
    : people.filter(person => person.sex === 'f');

  const result = women
    .map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b) / women.length;

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
  const children = onlyWithSon
    ? people.filter(son => people.find(mother => mother.name === son.mother)
    && son.sex === 'm')
    : people.filter(son => people.find(mother => mother.name === son.mother));

  const result = children.reduce((sum, child) => {
    return sum + (child.born - (people.find(mom =>
      (child.mother === mom.name)).born));
  }, 0) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
