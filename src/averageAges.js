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
  let count = 0;

  const func = (sum, man) => {
    if (man.sex === 'm' && Math.ceil(man.died / 100) === century) {
      count++;

      return sum + (man.died - man.born);
    } else if (man.sex === 'm' && century === undefined) {
      count++;

      return sum + (man.died - man.born);
    }

    return sum;
  };

  return people.reduce(func, 0) / count;
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
  let count = 0;

  const func = (sum, woman, index, arr) => {
    if (woman.sex === 'f' && withChildren
      && arr.find(person => person.mother === woman.name)) {
      count++;

      return sum + (woman.died - woman.born);
    } else if (woman.sex === 'f' && withChildren === undefined) {
      count++;

      return sum + (woman.died - woman.born);
    }

    return sum;
  };

  return people.reduce(func, 0, 0, this) / count;
};

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

  const sumAgeDiff = (sum, mother) => {
    if (mother.sex === 'f' && onlyWithSon
      && people.find(person => (
        person.mother === mother.name && person.sex === 'm'
      )
      )) {
      const childrenBoys = people.filter(person => (
        person.mother === mother.name && person.sex === 'm'
      ));

      count += childrenBoys.length;

      const diff = childrenBoys.reduce((prev, child) => (
        prev + child.born - mother.born
      ), 0);

      return sum + diff;
    } else if (mother.sex === 'f' && !onlyWithSon
      && people.find(person => person.mother === mother.name)) {
      const children = people.filter(person => person.mother === mother.name);

      count += children.length;

      const diff = children.reduce((prev, child) =>
        prev + child.born - mother.born, 0);

      return sum + diff;
    }

    return sum;
  };

  return people.reduce(sumAgeDiff, 0) / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
