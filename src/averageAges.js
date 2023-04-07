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

  const males = people.filter(person => person.sex === 'm');
  const returnedValue = century
    ? males
      .filter(person => {
        return Math.ceil(person.died / 100) === century;
      })
    : males;

  return returnedValue
    .reduce((totalAge, male) => {
      return totalAge + (male.died - male.born);
    }, 0) / returnedValue.length;
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
  // write code here
  const females = people.filter(person => person.sex === 'f');
  const returnedValue = withChildren
    ? females
      .filter(mother => {
        return people.some(child => child.mother === mother.name);
      })
    : females;

  return returnedValue
    .reduce((totalAge, female) => {
      return totalAge + (female.died - female.born);
    }, 0) / returnedValue.length;
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
  // write code here
  const mothers = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const childrens = mothers.map(mother => {
    const children = people.filter(child => child.mother === mother.name);

    return children;
  }).reduce((total, current) => total.concat(current), []);

  const returnedValue = onlyWithSon
    ? childrens
      .filter(child => child.sex === 'm')
    : childrens;

  return returnedValue
    .map(boy => {
      const boyMother = mothers.find(mother => mother.name === boy.mother);

      return boy.born - boyMother.born;
    })
    .reduce((total, current) => {
      return total + current;
    }, 0) / returnedValue.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
