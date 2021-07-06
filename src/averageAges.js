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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = century
    ? people.filter(person => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    })
    : people.filter(person => person.sex === 'm');

  const menAge = men.map(man => man.died - man.born);

  return menAge.reduce((sum, age) => sum + age, 0) / men.length;
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
  const mothers = people.filter((person, i, arr) => {
    return arr.find(child => child.mother === person.name);
  });

  const womenWithoutChildren = people.filter(person => person.sex === 'f');

  const women = withChildren ? mothers : womenWithoutChildren;

  const womenAge = women.map(woman => woman.died - woman.born);

  return womenAge.reduce((sum, age) => sum + age, 0) / women.length;
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
  const children = people.filter(child => onlyWithSon
    ? people.find(mother => mother.name === child.mother) && child.sex === 'm'
    : people.find(mother => mother.name === child.mother)
  );

  const ageDiff = children.map(child => {
    const mom = people.find(mother => mother.name === child.mother);

    if (mom) {
      return child.born - mom.born;
    }
  });

  return ageDiff.reduce((sum, age) => sum + age, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
