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
  let sumOfAgeMan = 0;
  let man = [];

  man = people.filter(person => {
    const menCalculated = century
      ? (person.sex === 'm') && (Math.ceil(person.died / 100) === century)
      : (person.sex === 'm');

    return menCalculated;
  });
  sumOfAgeMan = man.reduce((sum, age) => sum + (age.died - age.born), 0);

  const ageAver = sumOfAgeMan / man.length;

  return ageAver;
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
  let women = [];

  women = people.filter(person => {
    const womenCalc = withChildren
      ? (person.sex === 'f') && (people.find(mam => mam.mother === person.name))
      : (person.sex === 'f');

    return womenCalc;
  });

  const sumOfAgeWoman = women.reduce((sum, age) =>
    sum + (age.died - age.born), 0);

  const ageAverWoman = sumOfAgeWoman / women.length;

  return ageAverWoman;
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
  const mothers = people.filter(person => {
    const womenCalculated = onlyWithSon
      ? people.find((child) => (
        child.mother === person.name && child.sex === 'm')
      )
      : people.find((child) => child.mother === person.name);

    return womenCalculated;
  });

  const babies = people.filter(child => {
    const result = onlyWithSon
      ? child.sex === 'm' && mothers.find(mother =>
        child.mother === mother.name)
      : mothers.find(mother => child.mother === mother.name);

    return result;
  });

  const difference = babies.map(person => person.born - mothers.find(mother =>
    mother.name === person.mother).born);

  if (!difference.length) {
    return 0;
  }

  const total = difference.reduce((sum, curV) => sum + curV, 0);

  return total / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
