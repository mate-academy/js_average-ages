'use strict';

function findAvarage(array) {
  return array.reduce((acc, item) => {
    return acc + item;
  }, 0) / array.length;
}

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
  const isBornInCentury = person => Math.ceil(person.died / 100) === century;

  const men = people.filter(person => {
    return century
      ? person.sex === 'm' && isBornInCentury(person)
      : person.sex === 'm';
  });

  return findAvarage(men.map(man => man.died - man.born));
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
  const hasChildren = woman => {
    return people.some(child => child.mother === woman.name);
  };

  const women = people.filter(woman => {
    return withChildren
      ? woman.sex === 'f' && hasChildren(woman)
      : woman.sex === 'f';
  });

  return findAvarage(women.map(woman => woman.died - woman.born));
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
  const findMother = child => people.find(woman => woman.name === child.mother);

  const children = people.filter(child => {
    return onlyWithSon
      ? findMother(child) && child.sex === 'm'
      : findMother(child);
  });

  const differences = children.map(child => {
    return child.born - findMother(child).born;
  });

  return findAvarage(differences);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
