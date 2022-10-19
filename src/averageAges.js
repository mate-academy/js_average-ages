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
  let men = filterBySex(people, 'm');

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  const menAge = men.map(man => man.died - man.born);

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
  let women = filterBySex(people, 'f');

  if (withChildren) {
    women = filterByWithChild(people, women);
  }

  const womenAge = women.map(woman => woman.died - woman.born);

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
  const women = filterBySex(people, 'f');

  const children = onlyWithSon
    ? people.filter(person => {
      return filterByWithChild(people, women)
        .some(mother => mother.name === person.mother && person.sex === 'm');
    })
    : people.filter(person => {
      return filterByWithChild(people, women)
        .some(mother => mother.name === person.mother);
    });

  const diffAge = children.map(child => {
    const motherBorn = filterByWithChild(people, women)
      .find(woman => woman.name === child.mother).born;
    const childBorn = child.born;

    return childBorn - motherBorn;
  });

  return averageAge(diffAge);
}

function averageAge(arr) {
  return arr.reduce((sum, age) => sum + age, 0) / arr.length;
}

function filterBySex(arr, sex) {
  return arr.filter(el => el.sex === sex);
}

function filterByWithChild(arr, persons) {
  return persons.filter((person) =>
    arr.some(el => person.name === el.mother));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
