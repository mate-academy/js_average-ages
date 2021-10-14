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
  const men = people.filter(person => !century
    ? person.sex === 'm'
    : Math.ceil(person.died / 100)
      === century && person.sex === 'm'
  );

  const age
    = (!century)
      ? men.map(man => man.died - man.born)
      : men.map(man => man.died - man.born);

  const result = age.reduce((sum, r) => sum + r, 0) / age.length;

  return result;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
};

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
  const women = people.filter(person => !withChildren
    ? person.sex === 'f'
    : people.find(kid => kid.mother
        === person.name && person.sex === 'f')
  );

  const age
    = (!withChildren)
      ? women.map(woman => woman.died - woman.born)
      : women.map(woman => woman.died - woman.born);

  const result = age.reduce((sum, r) => sum + r, 0) / age.length;

  return result;
};

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
  const diffMothers = people.filter(person => !onlyWithSon
    ? people.find(mother => mother.name === person.mother)
    : people.find(mother => mother.name === person.mother && person.sex === 'm')
  );

  const diffAges = diffMothers.map(person => !onlyWithSon
    ? person.born - (people.find(mother => mother.name === person.mother).born)
    : person.born - (people.find(mother => mother.name === person.mother).born)
  );

  const result
    = (!onlyWithSon)
      ? diffAges.reduce((sum, r) => sum + r, 0) / diffAges.length
      : diffAges.reduce((sum, r) => sum + r, 0) / diffAges.length;

  return result;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
