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
  const men = people.filter(a => a.sex === 'm');

  const ages = men.map(({ born, died }) => (
    {
      age: died - born,
      centuryDied: Math.ceil(died / 100),
    }
  ));

  if (century) {
    const filteredAges = ages.filter(x => x.centuryDied === century);
    const totalC = filteredAges.reduce((sum, { age }) => sum + age, 0);
    const resultC = totalC / filteredAges.length;

    return resultC;
  }

  const total = ages.reduce((sum, { age }) => sum + age, 0);
  const result = total / ages.length;

  return result;
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
  const women = people.filter(a => a.sex === 'f');

  const agesW = women.map(({ born, died }) => (
    {
      age: died - born,
    }
  ));

  if (withChildren) {
    const motherStatus = people.filter(
      (person) =>
        person.sex === 'f' && people.some(
          (p) => p.mother === person.name
        )
    );
    const agesMoms = motherStatus.map(({ born, died }) => (
      {
        age: died - born,
      }
    ));
    const totalMoms = agesMoms.reduce((sum, { age }) => sum + age, 0);
    const resultMoms = totalMoms / agesMoms.length;

    return resultMoms;
  }

  const total = agesW.reduce((sum, { age }) => sum + age, 0);
  const result = total / agesW.length;

  return result;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ageDiffs = filteredPeople.map(person => {
    const mother = people.find(p => p.name === person.mother);

    if (!mother) {
      return null;
    };

    return person.born - mother.born;
  }).filter(ageDiff => ageDiff !== null);

  if (ageDiffs.length === 0) {
    return null;
  };

  const sum = ageDiffs.reduce((acc, curr) => acc + curr, 0);
  const result = sum / ageDiffs.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
