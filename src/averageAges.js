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
  const males = people.filter(human => human.sex === 'm');

  const maleList = century
    ? males.filter(human => century === Math.ceil(human.died / 100))
    : males;

  const sumOfAges = maleList.reduce((sum, man) => sum + man.died - man.born, 0);

  return sumOfAges / maleList.length;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let femaleList = people.filter(human => human.sex === 'f');

  femaleList = withChildren
    ? femaleList.filter(woman => {
      return people.some(human => woman.name === human.mother);
    })
    : femaleList;

  // eslint-disable-next-line max-len
  const sumOfAges = femaleList.reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return sumOfAges / femaleList.length;
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
  const allAges = [];

  const femaleList = people.filter(human => human.sex === 'f');

  const femaleWithChildren = femaleList.filter(woman => {
    return people.some(human => woman.name === human.mother);
  });

  const allChildren = people.filter(human =>
    people.filter(child => child.mother === human.name));

  const sons = people.filter(human => {
    return femaleWithChildren.some(woman =>
      woman.name === human.mother
      && human.sex === 'm');
  });

  if (onlyWithSon) {
    femaleWithChildren.forEach(woman =>
      sons.some(son => {
        if (son.mother === woman.name) {
          allAges.push(son.born - woman.born);
        }
      })
    );
  } else {
    femaleWithChildren.forEach(woman =>
      allChildren.some(child => {
        if (child.mother === woman.name) {
          allAges.push(child.born - woman.born);
        }
      })
    );
  }

  return allAges.reduce((sum, age) => sum + age, 0) / allAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
