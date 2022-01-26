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
function countAverageAge(people) {
  const numberOfPeople = people.length;
  const totalAge = people
    .reduce((years, man) => years + (man.died - man.born), 0);

  return totalAge / numberOfPeople;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    return (person.sex === 'm')
    && (century ? Math.ceil(person.died / 100) === century : true);
  });

  return countAverageAge(men);
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
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => {
    return (person.sex === 'f')
      && (withChildren
        ? people.some(child => child.mother === person.name)
        : true);
  });

  return countAverageAge(women);
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
  const mothers = people.filter(mother => {
    return people.find(person => person.mother === mother.name);
  });

  let children = people.filter(person => {
    return mothers.find(mother => person.mother === mother.name);
  });

  if (onlyWithSon) {
    const sons = children.filter(child => child.sex === 'm');

    children = sons;
  }

  const averageDiffAges = children.map(child => {
    const motherOfASon = people.find(person => {
      return person.name === child.mother;
    });

    return child.born - motherOfASon.born;
  });

  return averageDiffAges.reduce((totalAge, diff) => totalAge + diff)
    / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
