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

  if (century !== undefined) {
    const deadmen = men.filter(man => Math.ceil(man.died / 100) === century);

    return deadmen.reduce((sum, deadman) =>
      (sum + deadman.died - deadman.born), 0) / deadmen.length;
  }

  return men.reduce((sum, man) => (sum + man.died - man.born), 0) / men.length;
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

  if (withChildren !== undefined) {
    const mothers = people.map(person => person.mother);
    const mothersWithChild = women.filter(woman =>
      mothers.some(mother => mother === woman.name));

    return mothersWithChild.reduce((sum, woman) =>
      (sum + woman.died - woman.born), 0) / mothersWithChild.length;
  }

  return women.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0) / women.length;
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
  const mothersWithChild = people.filter(woman =>
    people.find(person => woman.name === person.mother));

  let children = [];

  if (onlyWithSon === undefined) {
    children = people.filter(child =>
      mothersWithChild.find(mother =>
        (mother.name === child.mother)));
  } else {
    children = people.filter(child =>
      mothersWithChild.find(mother =>
        (mother.name === child.mother) && (child.sex === 'm')));
  }

  const yearsGivenBirth = children.map(child =>
    child.born - mothersWithChild.find(mother =>
      mother.name === child.mother).born);

  return yearsGivenBirth.reduce((sum, year) =>
    sum + year) / yearsGivenBirth.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
