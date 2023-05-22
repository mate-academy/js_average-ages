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

const getAverage = (data) => (
  data.reduce((accumulator, element) => (
    accumulator + element
  ), 0) / data.length || 0
);

function calculateMenAverageAge(people, century) {
  const filteredMen = century
    ? people.filter((person) =>
      person.sex === 'm' && century === Math.ceil(person.died / 100))
    : people.filter((person) => person.sex === 'm');

  const sumOfAgeMen = filteredMen.reduce((prev, item) =>
    prev + (item.died - item.born), 0);
  const averageAgeMen = sumOfAgeMen / filteredMen.length;

  return averageAgeMen;
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
  const filteredWomen = people.filter((person) =>
    person.sex === 'f' && (
      withChildren
        ? people.find(({ mother }) => mother === person.name)
        : true
    ));

  const sumOfAgeWomen = filteredWomen.reduce((prev, item) =>
    prev + (item.died - item.born), 0);

  return sumOfAgeWomen / filteredWomen.length;
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
/* people.filter(person => people.find(mother =>
     mother.name === person.mother)
     && (onlyWithSon ? person.sex === 'm' : true)); */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(({ mother: motherName, sex }) => (
    people.find(({ name }) => name === motherName) && (
      onlyWithSon
        ? sex === 'm'
        : true
    )
  ));
  const ageDifferences = children.map(({ mother, born }) => {
    const { born: motherBorn } = people.find(({ name }) => (
      name === mother
    ));

    return born - motherBorn;
  });

  return getAverage(ageDifferences);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
