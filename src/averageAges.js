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
  const filteredMen = people.filter(person => {
    return getMen(person, century, 'm');
  });

  return calculateAverageAge(filteredMen);
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
  const filteredWomen = people.filter(({ name, sex }) => {
    const women = sex === 'f';

    return (withChildren)
      ? women
      && people.find(({ mother }) => name === mother)
      : women;
  });

  return calculateAverageAge(filteredWomen);
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
  const children = people.filter(({ mother, sex }) => (onlyWithSon)
    ? people.find(({ name }) => name === mother && sex === 'm')
    : people.find(({ name }) => name === mother)
  );

  const womenAgeDiff = getWomenAge(children, people) / children.length;

  return womenAgeDiff;
}

function getMen(person, varIsTrue, valueForPerson) {
  const men = (varIsTrue)
    ? (person.sex === valueForPerson)
    && (Math.ceil(person.died / 100) === varIsTrue)
    : person.sex === valueForPerson;

  return men;
}

function calculateAverageAge(humans) {
  const humansAge = humans.map(person =>
    (person.died - person.born));

  return humansAge.reduce((ageA, ageB) =>
    (ageA + ageB), 0) / humansAge.length;
}

function getWomenAge(kids, humans) {
  return kids.reduce((years, child) =>
    years + (child.born - humans.find(mother =>
      child.mother === mother.name).born), 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
