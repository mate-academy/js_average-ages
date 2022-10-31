'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const getPersonByGender = (gender, people) => {
  return people.filter(person => person.sex === gender);
};

const getAverageAge = (people) => {
  return people.reduce((sex, person) => (
    sex + (person.died - person.born)
  ), 0) / people.length;
};

function calculateMenAverageAge(people, century) {
  const males = century
    ? getPersonByGender('m', people)
      .filter(male => (Math.ceil(male.died / 100) === century))

    : getPersonByGender('m', people);

  return getAverageAge(males);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const females = withChildren
    ? getPersonByGender('f', people)
      .filter(female => (people.find(person => person.mother === female.name)))

    : getPersonByGender('f', people);

  return getAverageAge(females);
}

/**
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
