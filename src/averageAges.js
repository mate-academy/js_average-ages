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
    const manWillBeCalculated = century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';

    return manWillBeCalculated;
  });
  const sumOfAges = men.reduce((a, b) => a + (b.died - b.born), 0);

  return sumOfAges / men.length;
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
  const women = people.filter(person => {
    const womanName = person.name;
    const womenWillBeCalculated = withChildren
      ? person.sex === 'f' && (people.find((a) => a.mother === womanName))
      : person.sex === 'f';

    return womenWillBeCalculated;
  });
  const sumOfAges = women.reduce((a, b) => a + (b.died - b.born), 0);

  return sumOfAges / women.length;
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
  const mothers = people.filter(person => {
    const { name } = person;

    const womenWillBeCalculated = onlyWithSon
      ? people.find((child) => child.mother === name && child.sex === 'm')
      : people.find((child) => child.mother === name);

    return womenWillBeCalculated;
  });

  const children = people.filter(child => {
    const result = onlyWithSon
      ? child.sex === 'm'
        && mothers.find(mother => child.mother === mother.name)
      : mothers.find(mother => child.mother === mother.name);

    return result;
  });

  const agesDiff = children.map(child => {
    const getMotherBorn = () => {
      const mother = mothers.find(mom => mom.name === child.mother);

      return mother.born;
    };

    return child.born - getMotherBorn();
  });

  return agesDiff.reduce((a, b) => a + b) / agesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
