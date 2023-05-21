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
  const menAge = people
    .filter(person => (person.sex === 'm' // filtered by sex
      && (century // if we have "century" value we check by century
        ? Math.ceil(person.died / 100) === century
        // we select only from the specified century
        : true))) // if the century is not specified, we take all
    .map(person => person.died - person.born); // create an array of lived years

  return averageAge(menAge);
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
  const womenAge = people
    .filter(person => (person.sex === 'f') // filtered by sex
      && (withChildren // if we have "withChildren" filter
        ? people.some(child => child.mother === person.name)
        // we are looking for the children of this woman
        : true)) // or take all
    .map(person => person.died - person.born);
    // create an array of lived years

  return averageAge(womenAge);
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
  const children = people
    .filter(person => (people
      .find(mother => mother.name === person.mother)
      // we are looking for children only
    && (onlyWithSon // if we have "onlyWithSon"
      ? person.sex === 'm' // we are looking for sons only
      : true))); // or take all

  const ageDifferences = children.map(child => {
    const mother = people.find(person => person.name === child.mother);
    // match the mother for each child

    return child.born - mother.born;
    // and return difference
  });

  return averageAge(ageDifferences);
}

function averageAge(people) {
  const qty = people.length;
  // we find the quantity to find the average value

  return people.reduce((sum, age) => sum + age, 0) / qty;
  // we return the average value
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
