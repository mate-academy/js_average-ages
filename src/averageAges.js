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
  const men = people.filter(({ sex, died }) => {
    const menOfThisCentury = Math.ceil(died / 100) === century;
    const male = sex === 'm';

    return century ? male && menOfThisCentury : male;
  });

  return men
    .map(({ died, born }) => died - born)
    .reduce((totalAge, age) => totalAge + age) / men.length;
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
  const listOfMothers = people.map(({ mother }) => mother);

  const women = people.filter(({ sex, name }) => {
    const isListedAmongstPeople = listOfMothers.includes(name);
    const female = sex === 'f';

    return withChildren ? female && isListedAmongstPeople : female;
  });

  return women
    .map(({ died, born }) => died - born)
    .reduce((totalAge, age) => totalAge + age) / women.length;
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
  const mothers = people.filter(({ name }) =>
    onlyWithSon
      ? people.find(({ mother, sex }) => mother === name && sex === 'm')
      : people.find(({ mother }) => mother === name));

  const children = people.filter(({ mother, sex }) =>
    onlyWithSon
      ? people.find(({ name }) => mother === name && sex === 'm')
      : people.find(({ name }) => mother === name));

  const agesDifference = children.map(({ born, mother }) =>
    born - mothers.find(({ name }) => name === mother).born);

  const averageAgesDifference = agesDifference
    .reduce((sum, age) => sum + age, 0);

  return averageAgesDifference / agesDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
