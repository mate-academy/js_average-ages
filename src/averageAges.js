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

function getSumOfAverageAge(sumOfAges, age) {
  return sumOfAges + age;
}

function getAveragePeopleAge(people) {
  return people
    .map((person) => person.died - person.born)
    .reduce(getSumOfAverageAge, 0) / people.length;
}

function getPeopleByGender(people, gender) {
  return people.filter(person => person.sex === gender);
}

function calculateMenAverageAge(people, century) {
  const men = getPeopleByGender(people, 'm');
  const menInTargetCentury = men
    .filter(man => (
      Math.ceil(man.died / 100) === century)
    );

  const targetMen = century
    ? menInTargetCentury
    : men;

  return getAveragePeopleAge(targetMen);
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
  const women = getPeopleByGender(people, 'f');
  const womenWithChildren = women
    .filter((woman) => (
      people.some((child) => child.mother === woman.name))
    );

  const targetWomen = withChildren
    ? womenWithChildren
    : women;

  return getAveragePeopleAge(targetWomen);
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

function getAverageAgeDiff(children, people) {
  return children
    .map((child) => {
      const childsMom = people.find((person) => person.name === child.mother);

      return child.born - childsMom.born;
    })
    .reduce(getSumOfAverageAge, 0) / children.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(
    (child) => people.some((mother) => mother.name.includes(child.mother))
  );

  const sons = getPeopleByGender(children, 'm');

  const averageAgeDiff = onlyWithSon
    ? getAverageAgeDiff(sons, people)
    : getAverageAgeDiff(children, people);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
