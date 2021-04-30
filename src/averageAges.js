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
  const men = people.filter(person => person.sex === 'm');
  const menInCentury = men.filter(
    person => Math.ceil(person.died / 100) === century
  );
  const averageAge = (arguments.length < 2)
    ? men.reduce(
      (acc, person) => acc + person.died - person.born, 0)
      / men.length
    : menInCentury
      .reduce(
        (acc, person) => acc + person.died - person.born, 0)
        / menInCentury.length;

  return +averageAge.toFixed(2);
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = women.filter(
    person => people.some((child) => child.mother === person.name)
  );
  const averageAge = (arguments.length < 2)
    ? women.reduce(
      (acc, person) => acc + person.died - person.born, 0)
      / women.length
    : womenWithChildren.reduce(
      (acc, person) => acc + person.died - person.born, 0)
      / womenWithChildren.length;

  return +averageAge.toFixed(2);
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
  const mothers = people.filter(
    (person) => people.some((child) => person.name === child.mother)
  );
  const children = people.filter(
    (person) => people.some((mother) => person.mother === mother.name)
  );
  const mothersWithSon = mothers.filter(
    (person) => children.some(
      (child) => child.sex === 'm' && child.mother === person.name)
  );
  const sons = children.filter(
    (person) => person.sex === 'm');
  const avarageDifference = (onlyWithSon)
    ? sons.reduce(
      (acc, son) => acc + son.born
      - mothersWithSon.find((mother) => son.mother === mother.name).born, 0)
      / sons.length
    : children.reduce(
      (acc, child) => acc + child.born
      - mothers.find((mother) => child.mother === mother.name).born, 0)
      / children.length;

  return +avarageDifference.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
