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
  const men = [];
  const filteredMen = people.filter(person => {
    person.sex === 'm' && men.push(person);

    return person.sex === 'm'
      && Math.ceil(person.died / 100) === century;
  });
  const menList = century ? filteredMen : men;

  return calculateAverageAge(menList);
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
  const mothersNames = [];
  const women = people.filter(person => {
    person.mother && mothersNames.push(person.mother);

    return person.sex === 'f';
  });
  const womenWithChildren = withChildren && women.filter(
    woman => mothersNames.includes(woman.name),
  );
  const selectedWomenList = withChildren ? womenWithChildren : women;

  return calculateAverageAge(selectedWomenList);
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
  const mothers = {};
  const sons = [];
  const children = people.filter(person => {
    if (person.mother) {
      onlyWithSon && person.sex === 'm' && sons.push(person);

      mothers[person.mother] = 0;
    }

    return person.mother;
  });

  people.forEach(person => {
    if (mothers.hasOwnProperty(person.name)) {
      mothers[person.name] = person.born;
    }
  });

  const ageDiffWithSons = getAverageAgeDiff(sons, mothers);
  const ageDiff = getAverageAgeDiff(children, mothers);

  return onlyWithSon ? ageDiffWithSons : ageDiff;
}

function calculateAverageAge(people) {
  const averageAge = people.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / people.length;

  return +averageAge.toFixed(2);
}

function getAverageAgeDiff(children, mothers) {
  const ageDiff = children
    .map(child => mothers[child.mother]
      ? child.born - mothers[child.mother]
      : null
    )
    .filter(age => age !== null);

  const averageAgeDiff = ageDiff
    .reduce((sum, age) => sum + age, 0) / ageDiff.length;

  return +averageAgeDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
