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
function getAverageAge(people) {
  const ageArray = people.map(person => person.died - person.born);

  return ageArray.reduce(
    (sum, curr) => sum + curr, 0) / ageArray.length;
}

function filterBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function calculateMenAverageAge(people, century) {
  let onlyMen = filterBySex(people, 'm');

  const onlyMenInSpecificCentury = onlyMen.filter(
    men => Math.ceil(men.died / 100) === century);

  onlyMen = century
    ? onlyMenInSpecificCentury
    : onlyMen;

  return getAverageAge(onlyMen);
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
  let onlyWomen = filterBySex(people, 'f');

  const onlyWomenWithChildren = onlyWomen.filter(
    women => people.some(person => person.mother === women.name));

  onlyWomen = withChildren
    ? onlyWomenWithChildren
    : onlyWomen;

  return getAverageAge(onlyWomen);
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
  let haveMother = people.filter(
    person => people.some(
      possibleMother => possibleMother.name === person.mother
    )
  );

  const onlySons = filterBySex(haveMother, 'm');

  haveMother = !onlyWithSon
    ? haveMother
    : onlySons;

  const agesDiff = haveMother.map(
    child => child.born - people.find(
      person => person.name === child.mother
    ).born
  );

  return agesDiff.reduce(
    (sum, curr) => sum + curr, 0
  ) / haveMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
