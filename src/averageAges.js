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
  const menSelector = people.filter(person => century
    ? choosePersonGender(person, 'm') && chooseCentury(person, century)
    : choosePersonGender(person, 'm'));

  return countAvarageAge(menSelector);
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
  const womenSelector = people.filter(person => withChildren
    ? choosePersonGender(person, 'f') && checkHasChildren(people, person)
    : choosePersonGender(person, 'f'));

  return countAvarageAge(womenSelector);
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
  const children = people.filter(person => onlyWithSon
    ? people.some(woman => woman.name === person.mother)
      && choosePersonGender(person, 'm')
    : people.some(woman => woman.name === person.mother));

  const difference = children.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  return difference.reduce((total, age) => total + age, 0) / difference.length;
}

function countAvarageAge(people) {
  return people.reduce((total, person) =>
    total + (person.died - person.born), 0) / people.length;
}

function choosePersonGender(person, gender) {
  return person.sex === gender;
}

function chooseCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function checkHasChildren(people, person) {
  return people.some(child => child.mother === person.name);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
