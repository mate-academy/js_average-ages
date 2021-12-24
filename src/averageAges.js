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
  /* const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'); */
  let men;

  if (!century) {
    men = people.filter(person => person.sex === 'm');
  }

  if (century) {
    men = people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);
  }

  const ages = men.map(man => man.died - man.born);

  const result = ages.reduce((age1, age2) =>
    age1 + age2) / men.length;

  return result;
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
  // write code here
  /* const women = people.filter(el => withChildren
    ? people.some(child => el.name === child.mother)
    && (el.sex === 'f')
    : el.sex === 'f'); */
  let women;

  if (!withChildren) {
    women = people.filter(el => el.sex === 'f');
  }

  if (withChildren) {
    women = people.filter(el =>
      people.some(child => el.name === child.mother) && (el.sex === 'f'));
  }

  const age = women.map(year => year.died - year.born);
  const result = (age.reduce((a, b) => a + b) / women.length);

  return result;
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
  // write code here
  const mother = people.filter(person =>
    people.some(parent => person.name === parent.mother)
    && person.sex === 'f');

  /* const children = people.filter(person => onlyWithSon
    ? people.some(womanWithSon => person.mother === womanWithSon.name
      && person.sex === 'm')
    : people.some(womanWithSon => person.mother === womanWithSon.name)); */
  let children;

  if (!onlyWithSon) {
    children = people.filter(person =>
      people.some(womanWithSon => person.mother === womanWithSon.name));
  }

  if (onlyWithSon) {
    children = people.filter(person =>
      people.some(womanWithSon =>
        person.mother === womanWithSon.name && person.sex === 'm'));
  }

  const difference = children.map(child =>
    child.born - mother.find(parent =>
      child.mother === parent.name).born);

  const result = (difference.reduce((a, b) => a + b) / difference.length);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
