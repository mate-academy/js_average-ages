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

const getAverage = (filterPeople) => {
  return filterPeople.reduce((sum, person) => {
    const peopleAge = person.died - person.born;

    return sum + peopleAge;
  }, 0);
};

function calculateMenAverageAge(people, century) {
  const filterMen = people.filter(({ sex, died }) => {
    const isMale = (sex === 'm');
    const inWhatCentury = Math.ceil(died / 100) === century;

    return century
      ? isMale && inWhatCentury
      : isMale;
  });

  return getAverage(filterMen) / filterMen.length;
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
  const filterWoman = people.filter(({ name, sex }) => {
    const isFemale = (sex === 'f');
    const hasChildren = people.some(person => person.mother === name);

    return withChildren
      ? isFemale && hasChildren
      : isFemale;
  });

  return getAverage(filterWoman) / filterWoman.length;
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
  const kidsWithMother = people.filter((child) => {
    const hasMother = people.some(mother => mother.name === child.mother);
    const isSon = (child.sex === 'm');

    return onlyWithSon
      ? isSon && hasMother
      : hasMother;
  });

  const sumAges = kidsWithMother.reduce((ageSum, kid) => {
    const motherBirthYear = people.find(mother =>
      mother.name === kid.mother).born;
    const agesDifference = kid.born - motherBirthYear;

    return ageSum + agesDifference;
  }, 0);

  return sumAges / kidsWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
