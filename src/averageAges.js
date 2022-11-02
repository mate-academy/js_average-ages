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
function getFilteredGender(people, gender) {
  return people.filter(genderCheck => genderCheck.sex === gender);
}

function getAverageAge(people) {
  const totalAge = people.map(person => person.died - person.born);
  const averageAge = totalAge.reduce((total, current) =>
    total + current) / totalAge.length;

  return averageAge;
};

function calculateMenAverageAge(people, century) {
  const filteredMens = getFilteredGender(people, 'm');

  const men = !century
    ? filteredMens
    : filteredMens.filter(man => (
      century === Math.ceil(man.died / 100)));

  return getAverageAge(men);
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
  const filteredWomens = getFilteredGender(people, 'f');

  const women = !withChildren
    ? filteredWomens
    : filteredWomens.filter(mother =>
      people.find(children => mother.name === children.mother));

  return getAverageAge(women);
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
  const baby = people.filter(children => (people.find(mother =>
    children.mother === mother.name)));

  const child = !onlyWithSon
    ? baby
    : getFilteredGender(baby, 'm');

  const ageDiff = child.map(children =>
    (children.born - people.find(mother =>
      (mother.name === children.mother)).born));

  return ageDiff.reduce((total, current) => total + current) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
