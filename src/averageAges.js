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
  const filteredMen = people.filter(
    person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century)
  );

  const menAge = filteredMen.reduce(
    (sum, { died, born }) => sum + (died - born), 0
  );

  return menAge / filteredMen.length;
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
  const filteredWomen = people.filter(withChildren
    ? (person1) => person1.sex === 'f'
      && people.find((person2) => person2.mother === person1.name)
    : (person) => person.sex === 'f'
  );

  const womenAge = filteredWomen.reduce(
    (sum, { died, born }) => sum + (died - born), 0
  );

  return womenAge / filteredWomen.length;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const filteredPeopleAgeDiff = filteredPeople.reduce((result, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return mother ? [...result, child.born - mother.born] : result;
  }, []);

  return filteredPeopleAgeDiff.reduce(
    (a, b) => a + b) / filteredPeopleAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
