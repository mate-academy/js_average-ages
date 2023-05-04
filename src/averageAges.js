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
  const findMen = (man) => {
    return (century === undefined) ? (man['sex'] === 'm') : (
      (man['sex'] === 'm') && (Math.ceil(man['died'] / 100) === century));
  };
  const onlyCorrectMen = people.filter(findMen);
  const totalYear = (sum, person) => {
    return sum + (person['died'] - person['born']);
  };
  const menAverage = onlyCorrectMen.reduce(totalYear, 0);

  return (menAverage / onlyCorrectMen.length);
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
  const findWomen = (woman) => {
    return (withChildren === undefined) ? (woman['sex'] === 'f') : (
      (woman['sex'] === 'f')
      && people.some((mother) => mother['mother'] === woman['name']));
  };
  const onlyCorrectWomen = people.filter(findWomen);
  const totalYear = (sum, person) => {
    return sum + (person['died'] - person['born']);
  };
  const womenAverage = onlyCorrectWomen.reduce(totalYear, 0);

  return (womenAverage / onlyCorrectWomen.length);
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
  const findChild = (baby) => {
    return (onlyWithSon === undefined) ? (
      people.some((mother) =>
        (mother['name'] === baby['mother']))) : (people.some((mother) =>
      ((mother['name'] === baby['mother']) && (baby['sex'] === 'm'))));
  };
  const onlyCorrectMother = people.filter(findChild);

  const totalYear = (sum, child) => {
    const findMother = people.find((mother) =>
      (child['mother'] === mother['name']));

    return sum + (child['born'] - findMother['born']);
  };
  const coupleAverage = onlyCorrectMother.reduce(totalYear, 0);

  return (coupleAverage / onlyCorrectMother.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
