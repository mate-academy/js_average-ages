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
  const men = people.filter(person => {
    return century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm';
  });

  men.map(man => {
    man.age = man.died - man.born;

    return man.age;
  });

  const agesSum = men.reduce((sum, man) => {
    return sum + man.age;
  }, 0);

  const averageAge = agesSum / men.length;

  return averageAge;
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
  const women = people.filter(person => {
    return withChildren
      ? person.sex === 'f'
      && people.some(child => child.mother === person.name)
      : person.sex === 'f';
  });

  women.map(woman => {
    woman.age = woman.died - woman.born;

    return woman.age;
  });

  const agesSum = women.reduce((sum, woman) => {
    return sum + woman.age;
  }, 0);

  const averageAge = agesSum / women.length;

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
  const children = people.filter(person => {
    return onlyWithSon
      ? people.find(child => child.name === person.mother) && person.sex === 'm'
      : people.find(child => child.name === person.mother);
  });

  children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    child.ageDifference = child.born - mother.born;

    return child.ageDifference;
  });

  const differenceSum = children.reduce((sum, child) => {
    return sum + child.ageDifference;
  }, 0);

  const averageAgeDifference = differenceSum / children.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
