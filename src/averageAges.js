'use strict';

const countSumAges = (filteredPeople) => {
  return filteredPeople.reduce((sum, person) => {
    const personAge = person.died - person.born;

    return sum + personAge;
  }, 0);
};

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
  const filteredMen = people.filter(({ sex, died }) => {
    const isCentury = !century || Math.ceil(died / 100) === century;

    return sex === 'm' && isCentury;
  });
  const sumOfAges = countSumAges(filteredMen);

  return sumOfAges / filteredMen.length;
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
  const onlyWomen = people.filter(({ name, sex }) => {
    const hasChildren = !withChildren
      || people.some(person => person.mother === name);

    return sex === 'f' && hasChildren;
  });
  const sumAgesWomen = countSumAges(onlyWomen);

  return sumAgesWomen / onlyWomen.length;
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
  const kidsHaveMother = people.filter((child) => {
    const isSon = !onlyWithSon || child.sex === 'm';
    const hasMother = people.some(mother => mother.name === child.mother);

    return isSon && hasMother;
  });
  const sumAgesDiff = kidsHaveMother.reduce((sum, child) => {
    const motherBorn = people.find(mother => mother.name === child.mother).born;
    const ageDiff = child.born - motherBorn;

    return sum + ageDiff;
  }, 0);

  return sumAgesDiff / kidsHaveMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
