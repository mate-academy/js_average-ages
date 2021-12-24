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
const findAverage = (previousValue, currentValue) => {
  return previousValue + currentValue;
};

function calculateMenAverageAge(people, century) {
  const men = century ? people.filter(man =>
    (Math.ceil(man.died / 100)) === century && man.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const ageOfMen = men.map(man => man.died - man.born);

  const averageLifespan = ageOfMen.reduce(findAverage, 0) / ageOfMen.length;

  return averageLifespan;
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
  const women = withChildren ? people.filter(person =>
    people.some(child => child.mother === person.name) && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  const ageOfWomen = women.map(woman =>
    woman.died - woman.born);

  const averageLifespan = ageOfWomen.reduce(findAverage, 0) / ageOfWomen.length;

  return averageLifespan;
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
  const children = people.filter(person => onlyWithSon
    ? people.some(mother => person.mother === mother.name
      && person.sex === 'm')
    : people.some(mother => person.mother === mother.name));

  const mothers = people.filter(person =>
    children.some(child => child.mother === person.name));

  const motherOfChild = (child) => {
    return mothers.find(mother =>
      child.mother === mother.name);
  };

  return children.reduce((previousValue, nextValue) =>
    previousValue + (nextValue.born - motherOfChild(nextValue).born), 0)
    / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
