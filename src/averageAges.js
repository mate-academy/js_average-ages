'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If century is specified then
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
  // replace if () statement with &&, || or ?:
  // without nesting
  const men = people.filter(man => {
    return man.sex === 'm';
  });

  const manDiedInCentury = men.filter(person => {
    return Math.ceil(person.died / 100) === century;
  });

  const ages = century > 0
    ? manDiedInCentury.map(person => person.died - person.born)
    : men.map(person => person.died - person.born);

  const avarageAge = ages.reduce((sum, x) => sum + x);

  return avarageAge / ages.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If withChildren is
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
  const women = people.filter(woman => woman.sex === 'f');

  const isWithChildren = withChildren
    ? women.filter(mother => {
      return people.some(person => person.mother === mother.name);
    })
    : women;

  const ages = isWithChildren.map(person => person.died - person.born);

  const avarageAge = ages.reduce((sum, x) => sum + x) / ages.length;

  return avarageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If onlyWithSon is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const men = people.filter(man => man.sex === 'm');

  const children = onlyWithSon
    ? men.filter(child => {
      return people.some(person => person.name === child.mother);
    })
    : people.filter(child => {
      return people.some(person => person.name === child.mother);
    });

  const ageDifference = children.map(child => {
    const motherOfChild = people.find(person => person.name === child.mother);

    return motherOfChild.born - child.born;
  });

  const avarageAge = ageDifference.reduce((sum, x) => sum + x);

  return Math.abs(avarageAge / children.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
