'use strict';
/* eslint-disable */
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
  const men = findOutGender(people, 'm');
  const menAges = century
    ? men.filter(guy => Math.ceil(guy.died / 100) === century).map(guy => guy.died - guy.born)
    : calculateAge(men);

  const sumOfMenAges = calculateAverageAge(menAges);

  return sumOfMenAges / menAges.length;

  // write code here
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
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = findOutGender(people, 'f');
  const womenAreMothers = women.filter(
    women => people.some(person => person.mother === women.name)
  );
  const womenAges = withChildren
    ? calculateAge(womenAreMothers)
    : calculateAge(women);

  const sumOfWomanAges = calculateAverageAge(womenAges);


  return sumOfWomanAges / womenAges.length;
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
  const isChild = people.filter(
    person => people.some(mother => mother.name === person.mother))
  const sons = findOutGender(isChild, 'm');

  const haveMothers = onlyWithSon
    ? sons
    : isChild;

  const agesDiff = haveMothers.map(
    child => child.born - people.find(
      person => person.name === child.mother
    ).born
  )

  const sumOfChildsAge = calculateAverageAge(agesDiff);

  return sumOfChildsAge / agesDiff.length;
}



function findOutGender(people, sex) {
  return people.filter(person => person.sex === sex);
}

function calculateAge(people) {
  return people.map(person => person.died - person.born)
}

function calculateAverageAge(people) {
  return people.reduce((sum, x) => sum + x)
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
