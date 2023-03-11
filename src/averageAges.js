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
function calculateAverageAge(people, filterFunction) {
  const filteredPeople
    = filterFunction ? people.filter(filterFunction) : people;

  const ages = filteredPeople.map(({ born, died }) => (
    {
      age: died - born,
    }
  ));

  const total = ages.reduce((sum, { age }) => sum + age, 0);
  const result = total / ages.length;

  return result;
}

function calculateMenAverageAge(people, century) {
  const filterFunction = (a) => a.sex === 'm';

  if (century) {
    const filteredFunction = (x) => Math.ceil(x.died / 100) === century;

    return calculateAverageAge(people, (a) =>
      filterFunction(a) && filteredFunction(a));
  }

  return calculateAverageAge(people, filterFunction);
};

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
  const filterFunction = (a) => a.sex === 'f';

  if (withChildren) {
    const filteredFunction = (a) => people.some((p) => p.mother === a.name);

    return calculateAverageAge(people, (a) =>
      filterFunction(a) && filteredFunction(a));
  }

  return calculateAverageAge(people, filterFunction);
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

  const ageDiffs = filteredPeople.map(person => {
    const mother = people.find(p => p.name === person.mother);

    if (!mother) {
      return null;
    };

    return person.born - mother.born;
  }).filter(ageDiff => ageDiff !== null);

  if (ageDiffs.length === 0) {
    return null;
  };

  const sum = ageDiffs.reduce((acc, curr) => acc + curr, 0);
  const result = sum / ageDiffs.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
