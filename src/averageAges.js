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
  const man = people.filter(persone =>
    persone.sex === 'm');

  let manOfTheCentury;

  typeof century === 'undefined'
    ? manOfTheCentury = man
    : manOfTheCentury = man.filter(persone =>
      Math.ceil(persone.died / 100) === century
    );

  const ageOfMan = manOfTheCentury.map(persone => ({
    ...persone, age: persone.died - persone.born,
  }));

  const averageAge = ageOfMan.reduce((prev, curr) =>
    prev + curr.age, 0) / manOfTheCentury.length;

  return averageAge;

  // eslint-disable-next-line no-console
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
    ? people.filter(persone => persone.sex === 'f'
    && people.find(child => child.mother === persone.name))
    : people.filter(persone => persone.sex === 'f');

  const ageOfWomen = women.map(persone => ({
    ...persone, age: persone.died - persone.born,
  }));

  const averageAge = ageOfWomen.reduce((prev, curr) =>
    prev + curr.age, 0) / women.length;

  return averageAge;
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
    ? people.filter(persone => persone.sex === 'm'
    && people.find(mother => mother.name === persone.mother))
    : people.filter(persone =>
      people.find(mother => mother.name === persone.mother));

  const ageDifference = children.reduce((totalAge, child) =>
    totalAge + child.born - people.find(persone =>
      persone.name === child.mother).born, 0) / children.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
