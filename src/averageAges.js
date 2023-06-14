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
  const filterPeople = century === undefined
    ? people.filter(man => man.sex === 'm')
    : people.filter(man => man.sex === 'm'
    && Math.ceil(man.died / 100) === century);

  const allMan = filterPeople.map(man => man.died - man.born);

  const middleAge = allMan
    .reduce((accumulator, curentValue) =>
      accumulator + curentValue, 0) / allMan.length;

  return middleAge;
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
  const filterPeople = withChildren === undefined
    ? people.filter(woman => woman.sex === 'f')
    : people.filter(woman => {
      return people.some(person => person.mother === woman.name);
    });

  const allWoman = filterPeople.map(woman => woman.died - woman.born);

  const middleAge = allWoman.reduce((accumulator, curentValue) =>
    accumulator + curentValue, 0) / allWoman.length;

  return middleAge;
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
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  const averageAgeDiff = children.reduce((sum, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return sum + ((child.born - mother.born));
  }, 0) / children.length;

  return Math.round(averageAgeDiff * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
