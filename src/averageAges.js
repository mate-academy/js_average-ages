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
  const onlyMales = people.filter(({ sex, died }) => {
    if (century) {
      return sex === 'm' && Math.ceil(died / 100) === century;
    }

    return sex === 'm';
  });

  const summaryAge = onlyMales.reduce(
    (acc, male) => acc + (male.died - male.born),
    0
  );

  const averageAge = +(summaryAge / onlyMales.length).toFixed(2);

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
  const onlyFemales = people.filter(({ name, sex }) => {
    if (withChildren) {
      return people.some((child) => child.mother === name);
    }

    return sex === 'f';
  });

  const summaryAge = onlyFemales.reduce(
    (acc, female) => acc + (female.died - female.born),
    0
  );

  const averageAge = +(summaryAge / onlyFemales.length).toFixed(2);

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
  const onlyMothers = people.filter((person) => {
    return people.some((child) => child.mother === person.name);
  });

  const onlyChildrens = people.filter(({ mother, sex }) => {
    return people.some(({ name }) => {
      if (onlyWithSon) {
        return mother === name && sex === 'm';
      }

      return mother === name;
    });
  });

  const averageAge
    = onlyChildrens.reduce((acc, children) => {
      const mother = onlyMothers.find((person) => {
        return person.name === children.mother;
      });

      const diff = children.born - mother.born;

      return acc + diff;
    }, 0) / onlyChildrens.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
