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
 * @param {number} century
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const man = people.filter((person) =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );
  const lifeMan = man.map((person) => person.died - person.born);

  return lifeMan.reduce((sum, person) => sum + person, 0) / lifeMan.length;
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
 * @param {boolean} withChildren
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter((girl) =>
    withChildren
      ? girl.sex === 'f' && people.some((person) => person.mother === girl.name)
      : girl.sex === 'f'
  );
  const lifeWoman = woman.map((person) => person.died - person.born);

  return lifeWoman.reduce((sum, person) => sum + person, 0) / lifeWoman.length;
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
  const children = people.filter((child) =>
    onlyWithSon
      ? child.sex === 'm'
        && people.some((person) => person.name === child.mother)
      : people.some((person) => person.name === child.mother)
  );
  const diff = children.map(
    (child) => child.born - people.find((mom) => child.mother === mom.name).born
  );

  return diff.reduce((sum, person) => sum + person, 0) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
