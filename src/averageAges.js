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
  const sortCentury = century
    ? people.filter(({ died }) => Math.ceil(died / 100) === century)
    : people;

  const sortMale = sortCentury
    .filter(({ sex }) => sex === 'm');

  const maleAge = sortMale
    .reduce((sum, { died, born }) => sum + died - born, 0);

  return maleAge / sortMale.length;
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
  const mother = people.map(person => person.mother);
  const onlyWoman = people.filter(person => person.sex === 'f');

  const womanWithChildren = onlyWoman
    .filter(person => mother
      .includes(person.name));

  const womanYear = onlyWoman
    .reduce((sum, { died, born }) => sum + died - born, 0);

  const womanYearWithChildren = womanWithChildren
    .reduce((sum, { died, born }) => sum + died - born, 0);

  return withChildren
    ? womanYearWithChildren / womanWithChildren.length
    : womanYear / onlyWoman.length;
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
  const children = people.filter(({ mother, sex }) => (
    people.find(({ name }) => (
      name === mother
      && (
        onlyWithSon
          ? sex === 'm'
          : true
      )
    ))
  ));

  const differentSum = children.reduce((acc, { mother, born }) => {
    const mom = people.find(({ name }) => (
      name === mother));

    return acc + (born - mom.born);
  }, 0);

  return differentSum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
