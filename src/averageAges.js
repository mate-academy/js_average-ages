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
  const man = people.filter(person => person.sex === 'm');

  if (century) {
    const manThisCentory = man.filter(person =>
      Math.ceil(person.died / 100) === century);

    return manThisCentory.reduce((sum, { born, died }) =>
      sum + (died - born), 0) / manThisCentory.length;
  };

  return man.reduce((sum, { born, died }) =>
    sum + (died - born), 0) / man.length;
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
  const woman = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const mothers = people.map(person => person.mother);
    const womanWithChildren = woman.filter(women =>
      mothers.includes(women.name));

    return womanWithChildren.reduce((sum, { born, died }) =>
      sum + (died - born), 0) / womanWithChildren.length;
  }

  return woman.reduce((sum, { born, died }) =>
    sum + (died - born), 0) / woman.length;
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
  const ageDifferences = [];

  if (onlyWithSon) {
    const man = people.filter(person => person.sex === 'm');

    for (const men of man) {
      const menBorn = men.born;
      const menMother = men.mother;
      let motherBorn = 0;

      for (const human of people) {
        if (menMother === human.name) {
          motherBorn = human.born;
          ageDifferences.push(menBorn - motherBorn);
        }
      }
    }

    return ((ageDifferences.reduce((sum, x) => sum + x, 0))
    / ageDifferences.length);
  }

  for (const person of people) {
    const personBorn = person.born;
    const personMother = person.mother;
    let motherBorn = 0;

    for (const human of people) {
      if (personMother === human.name) {
        motherBorn = human.born;
        ageDifferences.push(personBorn - motherBorn);
      }
    }
  }

  return ((ageDifferences.reduce((sum, x) => sum + x, 0))
    / ageDifferences.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
