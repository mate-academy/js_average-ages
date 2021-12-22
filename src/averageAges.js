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
 // write code here
 // learn how to use array methods like .filter .map .some .every .find .reduce
 // avoid using loop and forEach
 // replace `if ()` statement with &&, || or ?:
 // without nesting
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    person.sex === 'm');

  const menCentury = men.filter(person =>
    (Math.ceil(person.died / 100) === century));

  const averageAge = (sum, person) =>
    (sum + (person.died - person.born));

  const menAverageAge
    = men.reduce(averageAge, 0) / men.length;

  const menAverageAgeCentury
    = menCentury.reduce(averageAge, 0) / menCentury.length;

  return century ? menAverageAgeCentury : menAverageAge;
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
  const averageAge = (sum, person) =>
    (sum + (person.died - person.born));

  const women = people.filter(person =>
    person.sex === 'f');

  const mothers = women.filter(woman =>
    people.some(person =>
      person.mother === woman.name));

  const womenAveragreAge
    = women.reduce(averageAge, 0) / women.length;

  const mothersAveragreAge
    = mothers.reduce(averageAge, 0) / mothers.length;

  return withChildren ? mothersAveragreAge : womenAveragreAge;
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
  const women = people.filter(person =>
    person.sex === 'f');

  const children = people.filter(child =>
    women.some(mother =>
      child.mother === mother.name));

  const sons = people.filter(person =>
    women.some(mother =>
      person.mother === mother.name && person.sex === 'm'));

  const diffMotherChild = children.map(child => {
    const motherChild = women.find(mother =>
      mother.name === child.mother);

    return child.born - motherChild.born;
  });

  const diffMotherSon = sons.map(son => {
    const motherChild = women.find(mother =>
      mother.name === son.mother);

    return son.born - motherChild.born;
  });

  const averageAgeMotherChild
    = diffMotherChild.reduce((a, b) =>
      a + b) / children.length;

  const averageAgeMotherSon
    = diffMotherSon.reduce((a, b) =>
      a + b) / sons.length;

  return onlyWithSon ? averageAgeMotherSon : averageAgeMotherChild;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
