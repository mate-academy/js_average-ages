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
  const peopleMan = people.filter(element => element.sex === 'm');
  const ManCentury = peopleMan.filter(a => Math.ceil(a.died / 100) === century);

  function calculateAge(person) {
    return person
      .map(x => x.died - x.born)
      .reduce((a, b) => a + b, 0) / person.length;
  }

  return century
    ? calculateAge(ManCentury)
    : calculateAge(peopleMan);
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
  const peopleWoman = people.filter(i => withChildren
    ? i.sex === 'f' && people.some(item => item.mother === i.name)
    : i.sex === 'f');

  return peopleWoman.map(i => i.died - i.born)
    .reduce((a, b) => a + b, 0) / peopleWoman.length;
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
  const WithMother = people.filter(x => onlyWithSon
    ? x.sex === 'm' && people.some(item => item.name === x.mother)
    : people.some(item => item.name === x.mother));

  const difference = WithMother.map(element => {
    const mother = people.find(item => element.mother === item.name);

    return element.born - mother.born;
  });

  return difference
    .reduce((a, b) => a
    + b, 0) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
