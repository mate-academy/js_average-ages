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
  const peopleSexFilter = people.filter(x => x.sex === 'm');

  if (century === undefined || typeof century !== 'number') {
    const ages = peopleSexFilter.map(person => {
      return person.died - person.born;
    });
    const everageAge = ages.reduce((sum, x) => sum + x);

    return everageAge / ages.length;
  } else {
    const ageFilter = peopleSexFilter.filter((person) => {
      const ageCounter = Math.ceil(person.died / 100);

      return ageCounter === century;
    });

    const ages = ageFilter.map(person => {
      return person.died - person.born;
    });

    const everageAge = ages.reduce((sum, x) => sum + x);

    return everageAge / ages.length;
  }
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
  const filteredPeople = !withChildren
    ? people.filter(el => (el.sex !== 'm'))
    : people.filter(el => (people.find(child => el.name === child.mother)));

  return filteredPeople.reduce((total, female) => (
    total + (female.died - female.born)), 0) / filteredPeople.length;
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
  const children = people.filter(person => {
    const hasMother = people.some(potentialMother => (
      potentialMother.name === person.mother
    ));

    if (!onlyWithSon || !hasMother) {
      return hasMother;
    }

    const isSon = person.sex === 'm';

    return isSon;
  });

  const avarageAgeDifference = children.reduce((ageDiffSum, child) => {
    const childMother = people.find(mother => mother.name === child.mother);
    const ageDiff = child.born - childMother.born;

    return ageDiffSum + ageDiff;
  }, 0) / children.length;

  return avarageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
