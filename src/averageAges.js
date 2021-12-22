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
  let men = people.filter(human => human.sex === 'm');
  let totalAge = 0;

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  for (const man of men) {
    totalAge += (man.died - man.born);
  }

  return totalAge / men.length;
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
  let women = people.filter(human => human.sex === 'f');
  let totalAge = 0;

  if (withChildren) {
    women = women.filter(woman =>
      people.some(human => human.mother === woman.name));
  }

  for (const woman of women) {
    totalAge += (woman.died - woman.born);
  }

  return totalAge / women.length;
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
  let children = people
    .map(human => ({
      ...human,
      mother: people.find(mother => human.mother === mother.name),
    })).filter(child => child.mother !== undefined);

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const totalAge = children
    .reduce((total, child) => total + (child.born - child.mother.born), 0);

  return totalAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
