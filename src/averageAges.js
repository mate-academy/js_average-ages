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
  const menArray = people
    .filter((person) => {
      return person.sex === 'm';
    })
    .filter((man) => {
      return !century || Math.ceil(man.died / 100) === century;
    });

  const totalAge = menArray.reduce((previous, current) => {
    return previous + current.died - current.born;
  }, 0);

  return totalAge / menArray.length;
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
  const womenArray = people
    .filter((person) => {
      return person.sex === 'f';
    })
    .filter((woman) => {
      const isMother = people.some((person) => {
        return person.mother === woman.name;
      });

      return !withChildren || isMother;
    });

  const totalAge = womenArray.reduce((previous, current) => {
    return previous + current.died - current.born;
  }, 0);

  return totalAge / womenArray.length;
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
  const peopleArray = people.filter((person) => {
    return !onlyWithSon || person.sex === 'm';
  });

  const ageDifferences = peopleArray.map((person) => {
    const mother = people.find((mom) => {
      return person.mother === mom.name;
    });

    if (mother) {
      return person.born - mother.born;
    }

    return null;
  });

  const filteredAgeDifs = ageDifferences.filter((ageDif) => {
    return ageDif !== null;
  });

  const totalAgeDifferences = filteredAgeDifs.reduce((previous, current) => {
    return previous + current;
  }, 0);

  return totalAgeDifferences / filteredAgeDifs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
