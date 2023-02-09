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
  const arrMan = people.filter(e => {
    return century
      ? Math.ceil(e.died / 100) === century && e.sex === 'm'
      : e.sex === 'm';
  })

  const sumAgePeople = arrMan.reduce((acc, { died, born }) => {
    return acc + died - born;
  }, 0);

  return sumAgePeople / arrMan.length;
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
  const woman = people.filter(({ sex, name }) => {
    return withChildren
      ? sex === 'f' && people.find(({ mother }) => name === mother)
      : sex === 'f';
  });

  const sumAgeWoman = woman.reduce((acc, { died, born }) => {
    return acc + died - born;
  }, 0);

  return sumAgeWoman / woman.length;
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
  const mothers = people.filter(({ mother, sex }) => {
    return onlyWithSon
      ? sex === 'm' && people.find((person) => person.name === mother)
      : people.find((person) => person.name === mother);
  });

  const ages = mothers.reduce((acc, { mother, born: ageChild }) => {
    const { born: ageMom } = people.find(({ name }) => {
      return name === mother;
    });
    const diff = ageChild - ageMom;

    return acc + diff;
  }, 0);

  return ages / mothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
