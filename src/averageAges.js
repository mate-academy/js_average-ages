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
  const menList = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menQuantity = menList.length;
  const totalMenAge = menList.reduce((totalAge, man) =>
    totalAge + (man.died - man.born), 0);

  return totalMenAge / menQuantity.toFixed(2);
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
    ? people.filter(person => person.sex === 'f'
      && people.find(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const womenQuantity = women.length;
  const totalWomenAge = women
    .reduce((totalAge, woman) => totalAge + (woman.died - woman.born), 0);

  return totalWomenAge / womenQuantity.toFixed(2);
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
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
       && people.find(woman => person.mother === woman.name))
    : people.filter(person => people
      .find(woman => person.mother === woman.name));

  const childrenQantity = children.length;
  const totalMothersAge = children.reduce((age, child) =>
    age + child.born - people.find(person =>
      child.mother === person.name).born, 0);

  return totalMothersAge / childrenQantity;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
