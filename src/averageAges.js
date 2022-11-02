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

const filterByGender = (gender, people) => {
  return people.filter(({ sex }) => sex === gender);
};

const getAverageAge = (people) => {
  return people.reduce((sex, person) => (
    sex + (person.died - person.born)
  ), 0) / people.length;
};

function calculateMenAverageAge(people, century) {
  const males = century
    ? filterByGender('m', people)
      .filter(male => (Math.ceil(male.died / 100) === century))

    : filterByGender('m', people);

  return getAverageAge(males);
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
  const females = withChildren
    ? filterByGender('f', people)
      .filter(female => (people.find(person => person.mother === female.name)))

    : filterByGender('f', people);

  return getAverageAge(females);
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
  const children = onlyWithSon
    ? people
      .filter(person => people
        .find(mother => person.mother === mother.name
        )

    && person.sex === 'm'
      )

    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const diff = children
    .map(person => person.born - people
      .find(mother => person.mother === mother.name).born);

  return diff.reduce((ages, current) => ages + current) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
