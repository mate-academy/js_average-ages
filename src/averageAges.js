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
  let menArr = (century)
    ? people.filter(el => Math.ceil(el.died / 100) === century)
    : people;

  menArr = menArr.filter(el => el.sex === 'm');

  const age = menArr.map(men => men.died - men.born);

  return getAverageAge(age);
}

function getAverageAge(age) {
  const ageSum = age.reduce((sum, el) => sum + el, 0);

  return ageSum / age.length;
}

function getPeopleOnCondition(peopleArr, mainField, relatedField) {
  // if we need to find kids, "mainField" is 'mother'
  // and "relatedField" is 'name'.
  // if we need to find mothers, "mainField" is 'name'
  // and "relatedField" is 'mother'.
  return peopleArr.filter(person =>
    (peopleArr.some((relatedPerson) =>
      (person[mainField] === relatedPerson[relatedField]))));
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
  const womenArr = (withChildren)
    ? getPeopleOnCondition(people, 'name', 'mother')
    : people.filter(el => el.sex === 'f');

  const age = womenArr.map(women => women.died - women.born);

  return getAverageAge(age);
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
  const mothersArr = getPeopleOnCondition(people, 'name', 'mother');
  let kids = getPeopleOnCondition(people, 'mother', 'name');

  if (onlyWithSon) {
    kids = kids.filter(el => el.sex === 'm');
  }

  const diffAgeArr = kids.map(child =>
    (child.born - mothersArr.find((mom) =>
      (mom.name === child.mother)).born));

  return getAverageAge(diffAgeArr);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
