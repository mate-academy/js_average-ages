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
  const sexMen = people.filter(person => person.sex === 'm');

  const centuryMen = century !== undefined ? sexMen
    .filter(person => Math
      .ceil(person.died / 100) === century) : sexMen;

  const count = sexMen.map(person => person.died - person.born);

  const countCenturyMen = centuryMen.map(person => person.died - person.born);

  const totalCountDead = countCenturyMen
    .reduce((acc, number) => acc + number, 0);

  const totalCount = count.reduce((acc, number) => acc + number, 0);

  const averageAgeDead = (totalCountDead / countCenturyMen.length);

  const averageAge = (totalCount / count.length);

  return century !== undefined ? averageAgeDead : averageAge;
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
  const sexWomen = people.filter(person => person.sex === 'f');

  const centuryWomen = withChildren !== undefined ? people
    .filter(person => people
      .some(child => child.mother === person.name)) : sexWomen;

  const count = sexWomen.map(person => person.died - person.born);

  const countCenturyWomen = centuryWomen
    .map(person => person.died - person.born);

  const totalCountWithChild = countCenturyWomen
    .reduce((acc, number) => acc + number, 0);

  const totalCount = count.reduce((acc, number) => acc + number, 0);

  const averageAgeWithCild = (totalCountWithChild / countCenturyWomen.length);

  const averageAge = (totalCount / count.length);

  return withChildren !== undefined ? averageAgeWithCild : averageAge;
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
  const onlyMothers = people.filter(person => people.some(child => child.mother
    === person.name));

  const childMothers = people
    .filter(person => onlyMothers
      .some(child => child.name === person.mother));

  const onlySon = onlyWithSon !== undefined ? people
    .filter(person => person.sex === 'm' && onlyMothers
      .some(child => child.name === person.mother)) : childMothers;

  const diff = childMothers
    .map(person => person.born - onlyMothers
      .find(mother => mother.name === person.mother).born);

  const diffWithSon = onlySon
    .map(person => person.born - onlyMothers
      .find(mother => mother.name === person.mother).born);

  const totalAge = diff
    .reduce((acc, number) => acc + number, 0);

  const totalAgeWithSon = diffWithSon
    .reduce((acc, number) => acc + number, 0);

  const averageAge = (totalAge / diff.length);

  const averageAgeWithSon = (totalAgeWithSon / diffWithSon.length);

  return onlyWithSon !== undefined ? averageAgeWithSon : averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
