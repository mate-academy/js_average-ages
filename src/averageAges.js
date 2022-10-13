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
  const allMen = people.filter(person => person.sex === 'm');

  const filteredMenList = !century
    ? allMen
    : allMen.filter(person => Math.ceil(person.died / 100) === century);

  const menAgeList = filteredMenList.map(person => person.died - person.born);

  return menAgeList.reduce((sum, age) => (sum + age), 0) / menAgeList.length;
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
  const allWomen = people.filter(person => person.sex === 'f');
  const motherNamesList = people.map(person => person.mother);

  const filteredWomenList = !withChildren
    ? allWomen
    : allWomen.filter(person => motherNamesList.includes(person.name));

  const womenAgeList = filteredWomenList.map(person =>
    person.died - person.born);

  return womenAgeList.reduce((sum, age) =>
    (sum + age), 0) / womenAgeList.length;
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
  const bornYearByName = (name) =>
    people.find(person => person.name === name)
      ? people.find(person => person.name === name).born
      : null;

  people.forEach(person => {
    person.motherBorn = bornYearByName(person.mother);
  });

  const mothersAndChildren = onlyWithSon
    ? people.filter(person => person.motherBorn !== null && person.sex === 'm')
    : people.filter(person => person.motherBorn !== null);

  const ageDiffList = mothersAndChildren.map(person =>
    person.born - person.motherBorn);

  const ageDiffSum = ageDiffList.reduce((sum, age) => (sum + age), 0);

  return ageDiffSum / mothersAndChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
