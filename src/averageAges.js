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
    if (century) {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    } else {
      return person.sex === 'm';
    }
  });

  const ages = men.map(person => person.died - person.born);

  return ages.reduce((sum, age) => sum + age) / ages.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter(person => {
    if (withChildren) {
      return person.sex === 'f' && hasChild(people, person.name);
    } else {
      return person.sex === 'f';
    }
  });

  const ages = women.map(person => person.died - person.born);

  return ages.reduce((sum, age) => sum + age) / ages.length;
}

function hasChild(people, name) {
  return people.some(person => person.mother === name);
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
  const children = people.filter(person => {
    if (onlyWithSon) {
      return person.sex === 'm' && hasMother(people, person.mother);
    } else {
      return hasMother(people, person.mother);
    }
  });

  const ageDiffes = children.map(child =>
    child.born - motherBorn(people, child.mother));

  const averageDiff = ageDiffes.reduce((sum, age) => sum + age);

  return averageDiff / ageDiffes.length;
}

function hasMother(people, motherName) {
  return people.some(person => person.name === motherName);
}

function motherBorn(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
