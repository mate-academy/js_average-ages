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
  let man = people.filter(p => p.sex === 'm');

  if (century) {
    man = people.filter(p => p.sex === 'm'
    && century === Math.ceil(p.died / 100));
  }

  const life = man.map(male => male.died - male.born);
  const ageSum = life.reduce((sum, age) => sum + age);
  const averageAge = ageSum / life.length;

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
  let woman = people.filter(p => p.sex === 'f');

  if (withChildren) {
    woman = people.filter(p => p.sex === 'f'
    && people.some(child => p.name === child.mother));
  }

  const life = woman.map(female => female.died - female.born);
  const ageSum = life.reduce((sum, age) => sum + age);
  const averageAge = ageSum / life.length;

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
  let children = people.filter(child => {
    return people.some(p => p.name === child.mother);
  });

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const totalAge = children.reduce((divSum, child) => {
    const mother = people.find(p => p.name === child.mother);

    return divSum + (child.born - mother.born);
  }, 0);

  return totalAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
