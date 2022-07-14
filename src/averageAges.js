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
  // eslint-disable-next-line prefer-const
  let filtredMen = filterByGender(people, 'm');

  const filtredMenCentury = filtredMen.filter(
    men => Math.ceil(men.died / 100) === century);

  filtredMen = century
    ? filtredMenCentury
    : filtredMen;

  return calculateAverageAge(filtredMen);
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
  let filtredWomen = filterByGender(people, 'f');

  const filtredWomenWithChildren = filtredWomen.filter(
    women => people.some(person => person.mother === women.name));

  filtredWomen = withChildren
    ? filtredWomenWithChildren
    : filtredWomen;

  return calculateAverageAge(filtredWomen);
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
    person => people.some(mom => mom.name === person.mother));

  const sons = filterByGender(haveMother, 'm');

  haveMother = onlyWithSon
    ? sons
    : haveMother;

  const ageDifference = haveMother.map(
    child => child.born - people.find(
      person => person.name === child.mother
    ).born
  );

  return ageDifference.reduce(
    (prev, current) => prev + current, 0) / haveMother.length;
}

function filterByGender(array, gender) {
  return array.filter(person => person.sex === gender);
}

function calculateAverageAge(array) {
  const ageArray = array.map(person => person.died - person.born);

  return ageArray.reduce(
    (prev, current) => prev + current, 0) / ageArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
