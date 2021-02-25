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
  const firstCallback = people.filter((human) =>
    human.sex === 'm' && Math.ceil(human.died / 100) === century);
  const secondCallback = people.filter((human) => human.sex === 'm');
  const averageAges = century ? firstCallback : secondCallback;

  return averageAges.reduce((acc, man) =>
    acc + man.died - man.born, 0) / averageAges.length;
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
  const filteredList = withChildren
    ? people.filter((human) => !!haveChild(people, human) && human.sex === 'f')
    : people.filter((human) => human.sex === 'f');

  return filteredList.reduce((acc, human) => acc + human.died - human.born, 0)
  / filteredList.length;
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
  let child;
  const listOfPeople = onlyWithSon ? people.filter((human) => {
    child = (human.sex === 'f') ? haveChild(people, human) : '';

    return (human.name === child.mother && child.sex === 'm');
  })
    : people.filter((human) => {
      child = (human.sex === 'f') ? haveChild(people, human) : '';

      return (human.name === child.mother);
    });

  return listOfPeople.reduce((acc, human) => {
    child = (human.sex === 'f') ? haveChild(people, human) : '';

    return (human.name === child.mother)
      ? acc + child.born - human.born : acc;
  }, 0) / listOfPeople.length;
}

function haveChild(people, mother) {
  const child = people.find((human) => mother.name === human.mother);

  return (child !== undefined) ? child : false;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
