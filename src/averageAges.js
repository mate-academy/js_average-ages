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
  const pickMen = century
    ? listPeopleBySex(people, 'm').filter(men =>
      Math.ceil(men.died / 100) === century)
    : listPeopleBySex(people, 'm');

  return calculateAverageAge(pickMen);
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
  const getMothersList = people.map(person => person.mother);

  const pickWomen = withChildren
    ? listPeopleBySex(people, 'f').filter(women =>
      getMothersList.includes(women.name))
    : listPeopleBySex(people, 'f');

  return calculateAverageAge(pickWomen);
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
  const listOfChildren = people.filter(child =>
    people.find(person => person.name === child.mother));

  const pickChildren = onlyWithSon
    ? listPeopleBySex(listOfChildren, 'm')
    : listOfChildren;

  const ageDifference = pickChildren.reduce(
    (sum, child) => sum + child.born - people.find(
      mother => mother.name === child.mother).born, 0)
    / pickChildren.length;

  return ageDifference;
}

const listPeopleBySex = (people, sex) => {
  return people.filter(person => person.sex === sex);
};

const calculateAverageAge = (people) => {
  return people.reduce((sumOfAges, person) =>
    (person.died - person.born) + sumOfAges, 0) / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
