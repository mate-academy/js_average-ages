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
  const isMan = person => person.sex === 'm';
  const isManfromCentury = person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century;
  const men = people.filter(century
    ? isManfromCentury
    : isMan);

  const years = men.map(man =>
    man.died - man.born);

  return years.reduce((a, b) => a + b) / years.length;
};

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const isWoman = person => person.sex === 'f';
  const isMother = person => people.some(
    child => child.mother === person.name
  );
  const women = people.filter(withChildren ? isMother : isWoman);

  const years = women.map(woman =>
    woman.died - woman.born);

  return years.reduce((a, b) => a + b) / years.length;
};
// write code here

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
  const isChild = person => people.some(mother =>
    mother.name === person.mother
  );
  const isSon = person => people.some(mother => mother.name === person.mother
    && person.sex === 'm'
  );
  const children = people.filter(onlyWithSon ? isSon : isChild);

  const difference = children.map(kid =>
    kid.born - people.find(mother =>
      mother.name === kid.mother).born);

  return difference.reduce((sum, x) => sum + x) / difference.length;
};

// write code here

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
