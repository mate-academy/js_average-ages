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
  const filteredMen = people.filter(person =>
    person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true)
  );

  const totalAge = filteredMen.reduce((acum, man) =>
    acum + (man.died - man.born), 0);

  return totalAge / filteredMen.length;
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
  const mothers = people.map(person => person.mother);

  const filterWomen = people.filter(person =>
    person.sex === 'f'
    && (withChildren ? mothers.includes(person.name) : true)
  );

  const sumAge = filterWomen.reduce((prev, person) =>
    prev + (person.died - person.born), 0
  );

  return sumAge / filterWomen.length;
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
  let count = 0;

  const childAndMoms = people.reduce((perv, child) => {
    return perv + people.reduce((prev, mom) => {
      const checking = child.mother === mom.name
        && ((onlyWithSon && child.sex === 'm') || !onlyWithSon);

      if (checking) {
        const difference = child.born - mom.born;

        count++;

        return prev + difference;
      }

      return prev;
    }, 0);
  }, 0);

  return childAndMoms / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
