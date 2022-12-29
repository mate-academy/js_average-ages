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
  const men = people.filter(
    century
      ? p => p.sex === 'm' && Math.ceil(p.died / 100) === century
      : p => p.sex === 'm'
  );

  return calculateAverage(men);
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
  let women = people.filter(p => p.sex === 'f');

  if (withChildren) {
    const mothers = people.map(p => p.mother);

    women = women.filter(w => !!mothers.includes(w.name));
  }

  return calculateAverage(women);
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
  const peopleWithMoms = people.map(child => ({
    ...child,
    mothersInfo: people.find(p => p.name === child.mother),
  }));
  const children = onlyWithSon
    ? peopleWithMoms.filter(p => p.sex === 'm' && p.mothersInfo)
    : peopleWithMoms.filter(p => p.mothersInfo);

  const childMotherAge = children
    .map(p => (p.born - p.mothersInfo.born));

  return calculateAverage(children, childMotherAge);
}

function calculateAverage(gropOfPeople, value) {
  let ages = value;

  if (!value) {
    ages = gropOfPeople.map(person => person.died - person.born);
  }

  const sumOfAge = ages.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAge / gropOfPeople.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
