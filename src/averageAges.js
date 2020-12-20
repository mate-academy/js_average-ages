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
  let counter = 0;

  const totalAge = people.reduce((sum, person) => {
    if (person.sex === 'm' && century === undefined) {
      counter++;

      return sum + (person.died - person.born);
    }

    if (person.sex === 'm'
      && century
      && Math.ceil(person.died / 100) === century) {
      counter++;

      return sum + (person.died - person.born);
    }

    return sum;
  }, 0);

  return totalAge / counter;
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
  let counter = 0;
  const totalAge = people.reduce((sum, person) => {
    if (person.sex === 'f'
      && withChildren
      && people.some(potentialChild => potentialChild.mother === person.name)) {
      counter++;

      return sum + (person.died - person.born);
    }

    if (person.sex === 'f' && withChildren === undefined) {
      counter++;

      return sum + (person.died - person.born);
    };

    return sum;
  }, 0);

  return totalAge / counter;
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
  let count = 0;

  const totalAgeDiff = (sum, mother) => {
    if (mother.sex === 'f' && onlyWithSon
      && people.find(person => (
        person.mother === mother.name && person.sex === 'm'
      )
      )) {
      const childrenBoys = people.filter(person => (
        person.mother === mother.name && person.sex === 'm'
      ));

      count += childrenBoys.length;

      const diffBoys = childrenBoys.reduce((sumAge, child) => (
        sumAge + child.born - mother.born), 0
      );

      return sum + diffBoys;
    } else if (mother.sex === 'f' && !onlyWithSon
        && people.find(person => person.mother === mother.name)) {
      const children = people.filter(person => person.mother === mother.name);

      count += children.length;

      const diffAllChildren = children.reduce((sumAge, child) =>
        sumAge + child.born - mother.born, 0) + sum;

      return diffAllChildren;
    }

    return sum;
  };

  return people.reduce(totalAgeDiff, 0) / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
