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
  const malePeople = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => {
      return Math.ceil(person.died / 100) === century
        ? person.sex === 'm'
        : false;
    });

  const sumAge = malePeople.reduce((sum, person) => {
    const age = person.died - person.born;

    return sum + age;
  }, 0);

  return sumAge / malePeople.length;
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
  let peopleWoman = people.filter(woman => woman.sex === 'f');

  withChildren && (
    peopleWoman = peopleWoman.filter(womanWithChildren => {
      return people.find(person => {
        return womanWithChildren.name === person.mother;
      });
    })
  );

  const sumAge = peopleWoman.reduce((sum, person) => {
    const age = person.died - person.born;

    return sum + age;
  }, 0);

  return ((sumAge / peopleWoman.length) * 100) / 100;
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
  // write code here
  const childrenWithMother = people.filter(person => {
    return onlyWithSon
      ? people.some(personInner => person.sex === 'm'
        && person.mother === personInner.name)
      : people.some(personInner => person.mother === personInner.name);
  });

  const differenceAge = childrenWithMother.map(
    child => Math.abs(
      people.find(
        person =>
          child.mother === person.name
      )
        .born - child.born
    )
  );

  return differenceAge.reduce((a, b) => a + b, 0) / differenceAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
