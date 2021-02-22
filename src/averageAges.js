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
  const findMale = (element) =>
    element.sex === 'm';

  const findMaleWithCentury = (element) =>
    element.sex === 'm' && Math.ceil(element.died / 100) === century;

  const menArray = people.filter(century ? findMaleWithCentury : findMale);

  const averageManAge = menArray.reduce((accumulator, man) => {
    return accumulator + man.died - man.born;
  }, 0) / menArray.length;

  return averageManAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const findFemale = (element) =>
    element.sex === 'f';

  const findFemaleWithChild = (element) =>
    element.sex === 'f' && people.some(
      person => person.mother === element.name
    );

  const womenArray = people.filter(
    withChildren ? findFemaleWithChild : findFemale
  );

  const averageWomanAge = womenArray.reduce((accumulator, woman) => {
    return accumulator + woman.died - woman.born;
  }, 0) / womenArray.length;

  return averageWomanAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMomWithChild = (element) =>
    people.some(woman => element.mother === woman.name);

  const findMomWithSon = (element) =>
    element.sex === 'm' && people.some(woman => element.mother === woman.name);

  const averageAgeDiffArray = people.filter(
    onlyWithSon ? findMomWithSon : findMomWithChild
  );

  const averageAgeDiff = averageAgeDiffArray.map(person =>
    person.born - people.find(woman => woman.name === person.mother).born
  ).reduce((a, b) => a + b) / averageAgeDiffArray.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
