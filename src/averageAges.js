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
  let men = people.filter(person => person.sex === 'm');

  if (arguments.length > 1) {
    men = men.filter(male => Math.ceil(male.died / 100) === century);
  }

  const age = men.reduce((sum, human) => sum + human.died - human.born, 0);

  return age / men.length;
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
  let women = people.filter(person => person.sex === 'f');

  if (arguments.length > 1) {
    women = women.filter(female =>
      people.some(child => child.mother === female.name));
  }

  const age = women.reduce((sum, human) => sum + human.died - human.born, 0);

  return age / women.length;
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
  const ageDiff = [];
  let mothers = people.filter(person =>
    person.sex === 'f'
    && people.some(child => child.mother === person.name));

  if (onlyWithSon) {
    mothers = mothers.filter(mother =>
      people.some(child => child.mother === mother.name && child.sex === 'm'));
  }

  mothers.map(mother => {
    const children = onlyWithSon
      ? people.filter(child =>
        child.mother === mother.name && child.sex === 'm')
      : people.filter(child => child.mother === mother.name);

    children.map(child => ageDiff.push(child.born - mother.born));
  });

  return ageDiff.reduce((sum, age) => sum + age, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
