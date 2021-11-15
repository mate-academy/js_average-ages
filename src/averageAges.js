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
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  const yearsLived = men.map((person) => person.died - person.born);
  const agesSum = yearsLived.reduce((person1, person2) => {
    return person1 + person2;
  });

  return agesSum / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.find(kid => person.name === kid.mother)
      : person.sex === 'f'
  );

  const yearsLived = women.map(person => person.died - person.born);
  const agesSum = yearsLived.reduce((woman1, woman2) => {
    return woman1 + woman2;
  });

  return agesSum / women.length;
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
  const children = people.filter(person =>
    onlyWithSon
      ? person.sex === 'm' && withMother(people, person.mother)
      : withMother(people, person.mother)
  );

  const ageDifference = children.map(child =>
    child.born - motherBirth(people, child.mother));

  const averageAgeDifference = ageDifference.reduce((sum, x) => sum + x)
  / children.length;

  return averageAgeDifference;

  function motherBirth(humans, mothersName) {
    const mother = humans.find(person => person.name === mothersName);

    return mother.born;
  }

  function withMother(humans, mothersName) {
    return humans.some(person => person.name === mothersName);
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
