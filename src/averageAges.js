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
  const mens = (century === undefined)
    ? people.filter(men =>
      men.sex === 'm').map(men =>
      men.died - men.born)
    : people.filter(men =>
      men.sex === 'm').filter(men =>
      Math.ceil(men.died / 100) === century).map((men) =>
      men.died - men.born
    );

  return mens.reduce((sum, nextAverageAge) =>
    sum + nextAverageAge, 0) / mens.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  // write code here
  const women = (withChildren === undefined)
    ? people.filter(woman =>
      woman.sex === 'f').map(woman =>
      woman.died - woman.born)
    : people.filter(woman =>
      woman.sex === 'f').filter(woman =>
      people.some(children =>
        woman.name === children.mother)).map(woman =>
      woman.died - woman.born
    );

  return women.reduce((sum, nextAverageAge) =>
    sum + nextAverageAge, 0) / women.length;
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
  const children = (onlyWithSon)
    ? people.filter(child =>
      people.some(mother =>
        mother.name === child.mother)).filter(son =>
      son.sex === 'm')
    : people.filter(child =>
      people.some(mother =>
        mother.name === child.mother)
    );

  children.map(child => {
    const mother = people.find(
      ({ name }) => name === child.mother
    );

    child.motherAge = child.born - mother.born;

    return child;
  });

  return children.reduce((sum, { motherAge }) =>
    sum + motherAge, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
