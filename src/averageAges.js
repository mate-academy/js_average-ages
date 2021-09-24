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
  const filteredPeople = century ? (
    people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
  ) : (
    people.filter(person => person.sex === 'm')
  );

  return filteredPeople.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0) / filteredPeople.length;
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
  const filteredPeople = withChildren ? (
    people.filter(woman =>
      woman.sex === 'f' && people.some(child => child.mother === woman.name))
  ) : (
    people.filter(person => person.sex === 'f')
  );

  return filteredPeople.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0) / filteredPeople.length;
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
  const mothers = people.filter(woman =>
    people.find(person => woman.name === person.mother)
  );

  const children = onlyWithSon ? (
    people.filter(child =>
      child.sex === 'm'
      && mothers.find(mother =>
        (mother.name === child.mother)))
  ) : (
    people.filter(child =>
      mothers.find(mother =>
        (mother.name === child.mother)))
  );

  const yearsDifferrent = children.map(child =>
    child.born - mothers.find(mother =>
      mother.name === child.mother).born);

  return yearsDifferrent.reduce((sum, year) =>
    sum + year) / yearsDifferrent.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
