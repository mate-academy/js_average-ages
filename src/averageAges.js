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
  let men = [];

  if (century) {
    men = people.filter(person => (
      person.sex === 'm' && (Math.ceil(person.died / 100) === century)));
  } else {
    men = people.filter(person => person.sex === 'm');
  }

  const totalAgeMen = men
    .reduce((total, man) => total + (man.died - man.born), 0);

  return totalAgeMen / men.length;
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
  let women = [];

  if (withChildren) {
    women = people.filter(woman => woman.sex === 'f'
    && (people.some(person => woman.name === person.mother)));
  } else {
    women = people.filter(woman => woman.sex === 'f');
  }

  const totalAgeWomen = women
    .reduce((total, woman) => total + (woman.died - woman.born), 0);

  return totalAgeWomen / women.length;
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
  let ageDiff = [];

  if (onlyWithSon) {
    ageDiff = people.filter(kid => kid.sex === 'm')
      .map(kid => {
        const mother = people.find(mom => mom.name === kid.mother);

        return mother ? kid.born - mother.born : undefined;
      }).filter(Boolean);
  } else {
    ageDiff = people.map(kid => {
      const mother = people.find(mom => mom.name === kid.mother);

      return mother ? kid.born - mother.born : undefined;
    }).filter(Boolean);
  }

  const sumOfAgeDiff = ageDiff.reduce((total, diff) => total + diff, 0);

  return sumOfAgeDiff / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
