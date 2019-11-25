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
  // replace `if ()` statement with logical operators (&&, ||) or ternary operator (?:)
  // without nesting
  const men = people.filter(elem => elem.sex === 'm'
    && (century ? Math.ceil(elem.died / 100) === century : true)
  );
  const menAverageAge = men.reduce((sum, elem) => sum + elem.died - elem.born, 0) / men.length;

  return menAverageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const mothers = people.filter(elem => elem.mother !== null).map(elem => elem.mother);
  const women = people.filter(elem => elem.sex === 'f'
    && (withChildren ? mothers.includes(elem.name) : true)
  );
  const womenAverageAge = women.reduce((sum, elem) => sum + elem.died - elem.born, 0) / women.length;

  return womenAverageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  // write code here
  const mothers = people
    .filter(mother => people.some(person => mother.name === person.mother)
    );
  const children = people
    .filter(child => mothers.some(mother => mother.name === child.mother))
    .map(child => {
      const mom = mothers.find(mother => mother.name === child.mother);
      child.motherBorn = mom.born;
      return child;
    })
    .filter(child => (onlyWithSon) ? child.sex === 'm' : true);

  const averageAgeDiff = children.reduce((sum, child) => sum + child.born - child.motherBorn, 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
