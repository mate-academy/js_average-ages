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
  const menAverage = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const amountOfMen = menAverage.length;

  return menAverage.reduce((sum, men) =>
    sum + (men.died - men.born), 0) / amountOfMen;
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
  const womenAverage = withChildren
    ? people.filter(person => people.some(kid => person.name === kid.mother))
    : people.filter(person => person.sex === 'f');

  const amountOfWomen = womenAverage.length;

  return womenAverage.reduce((sum, women) =>
    sum + (women.died - women.born), 0) / amountOfWomen;
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
  const childrenWithMom = onlyWithSon
    ? people.filter(children => children.sex === 'm'
      && people.some(mother => mother.name === children.mother))
    : people.filter(children =>
      people.some(mother => mother.name === children.mother));

  const motherAgeWhenChildrenBorn = childrenWithMom.map(children =>
    children.born - people.find(mother =>
      mother.name === children.mother).born);

  return motherAgeWhenChildrenBorn.reduce((sum, age) =>
    sum + age, 0) / motherAgeWhenChildrenBorn.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
