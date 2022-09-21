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
  const agesOfMen = people
    .filter(person => {
      return century
        ? person.sex === 'm' && Math.ceil(person.died / 100) === century
        : person.sex === 'm';
    })
    .map(man => man.died - man.born);

  const sumOfAges = agesOfMen.reduce((acc, curr) => acc + curr, 0);

  const average = sumOfAges / agesOfMen.length;

  return Number(average.toFixed(2));
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
  const momNames = people
    .filter(person => person.mother)
    .map(person => person.mother);

  const womenToCalculateAge = people.filter(person => {
    return withChildren
      ? person.sex === 'f' && momNames.includes(person.name)
      : person.sex === 'f';
  });

  const sumOfAges = womenToCalculateAge
    .map(woman => woman.died - woman.born)
    .reduce((acc, curr) => acc + curr, 0);

  const averageAge = sumOfAges / womenToCalculateAge.length;

  return Number(averageAge.toFixed(2));
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
  const peopleWithMoms = people.filter(person => {
    return onlyWithSon
      ? person.mother && person.sex === 'm'
      : person.mother;
  });

  const momsAndChildren = peopleWithMoms
    .map(person => {
      const mom = people.find(p => p.name === person.mother);
      const child = person;

      return {
        mom,
        child,
      };
    })
    .filter(momAndChild => momAndChild.mom);

  const ageDiffs = momsAndChildren.map(momAndChild => {
    const diff = momAndChild.child.born - momAndChild.mom.born;

    return diff;
  });

  const sumOfAgeDiffs = ageDiffs.reduce((acc, curr) => acc + curr, 0);

  const averageDiff = sumOfAgeDiffs / ageDiffs.length;

  return Number(averageDiff.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
