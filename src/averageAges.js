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
  const menArray = people.filter(object => object.sex === 'm');

  const men = century
    ? menArray.filter(object => Math.ceil(object.died / 100) === century)
    : menArray;

  const totalAge = men.reduce((sum, item) => {
    const age = item.died - item.born;

    return sum + age;
  }, 0);

  const totalMen = men.length;

  const averageAge = totalAge / totalMen;

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
  const womenArray = people.filter(object => object.sex === 'f');

  const women = withChildren
    ? womenArray.filter(mom => people.some(person => person
      .mother === mom.name))
    : womenArray;

  const totalAge = women.reduce((sum, item) => {
    const age = item.died - item.born;

    return sum + age;
  }, 0);

  const totalWomen = women.length;

  const averageAge = totalAge / totalWomen;

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
  const childrenArray = onlyWithSon
    ? people.filter(child => people.some(mom => child.mother === mom.name)
      && child.sex === 'm')
    : people.filter(child => people.some(mom => child.mother === mom.name));

  const differenceAge = childrenArray.map(child => {
    const mom = people.find(mother => child.mother === mother.name);

    return child.born - mom.born;
  });

  const totalPerson = differenceAge.length;

  const averageDiffAge = differenceAge.reduce((sum, age) =>
    (sum + age)) / totalPerson;

  return averageDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
