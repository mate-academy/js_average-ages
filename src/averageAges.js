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
  const filteredMen = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = filteredMen.reduce((accumulator, person) => {
    const age = person.died - person.born;

    return accumulator + age;
  }, 0);

  return filteredMen.length > 0 ? totalAge / filteredMen.length : 0;
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
  const filteredWomen = people.filter(person => person.sex === 'f');
  let averageFemaleSum = 0;

  if (withChildren) {
    const femaleWithChild = filteredWomen.filter(person =>
      people.some(child => child.mother === person.name));

    averageFemaleSum = femaleWithChild.reduce((all, person) =>
      all + (person.died - person.born), 0);

    const averageAgeFemaleChild = averageFemaleSum / femaleWithChild.length;

    return averageAgeFemaleChild;
  }

  averageFemaleSum = filteredWomen.reduce((all, person) =>
    all + (person.died - person.born), 0);

  const averageAgeFemale = averageFemaleSum / filteredWomen.length;

  return averageAgeFemale;
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
  const women = people.filter(person => !!person.mother
    && (!onlyWithSon || person.sex === 'm'));

  const { totalAgeDiff, count } = women.reduce((accumulator, child) => {
    const mother = people.find(person => person.name === child.mother);

    if (mother) {
      const ageDiff = child.born - mother.born;

      return {
        totalAgeDiff: accumulator.totalAgeDiff + ageDiff,
        count: accumulator.count + 1,
      };
    } else {
      return accumulator;
    }
  }, {
    totalAgeDiff: 0, count: 0,
  });

  const averageAgeDiff = count > 0 ? totalAgeDiff / count : 0;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
