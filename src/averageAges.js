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
  const allMens = (century) ? people.filter((person) => {
    return person.sex === 'm' && Math.ceil(person.died / 100) === century;
  })
    : people.filter((person) => {
      return person.sex === 'm';
    });

  const allMensAge = allMens.map((man) => {
    const manAge = man['died'] - man['born'];

    return manAge;
  });

  const number = allMensAge.reduce((sum, cur) => {
    return sum + cur;
  }, 0) / allMensAge.length;

  return number;
};

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
  const allWomen = (withChildren)
    ? people.filter((person) => {
      return person.sex === 'f' && people.some((onePerson) => {
        return onePerson.mother === person.name;
      });
    })
    : people.filter((person) => {
      return person.sex === 'f';
    });

  const allWomenAge = allWomen.map((woman) => {
    const womanAge = woman['died'] - woman['born'];

    return womanAge;
  });

  const number = allWomenAge.reduce((sum, cur) => {
    return sum + cur;
  }, 0) / allWomenAge.length;

  return number;
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
  const kids = !onlyWithSon
    ? people.filter(kid => (
      people.find(
        person => kid.mother === person.name)
    ))
    : people.filter(kid => (
      people.find(
        person => kid.mother === person.name)
          && kid.sex === 'm'
    ));

  const kidAgeDiff = kids.map(
    kid => (
      kid.born - people.find(
        person => (
          person.name === kid.mother
        )).born));

  return kidAgeDiff.reduce((gen, cur) => gen + cur, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
