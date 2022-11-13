'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menArray = people.filter(
    person =>
      person.sex === 'm'
      && (Math.ceil(person.died / 100) === century || century === undefined),
  );

  const allMenAge = menArray.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return Math.round(allMenAge / menArray.length * 100) / 100;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const relevantWomen = (
    people.filter(person => (withChildren
      ? people.some(isMother => person.name === isMother.mother)
      && person.sex === 'f'
      : person.sex === 'f'
    ))
  );

  const averageAgeForRelevantWomen = (
    relevantWomen.reduce((age, year) =>
      age + year.died - year.born, 0) / relevantWomen.length
  );

  return averageAgeForRelevantWomen;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const relevantChildren = (
    people.filter(person => onlyWithSon
      ? people.some(parent => person.mother === parent.name)
       && person.sex === 'm'
      : people.some(child => person.mother === child.name)
    )
  );

  const averageAgeBetweenChildAndMother = (
    relevantChildren.reduce((ages, year) =>
      ages + year.born - people.find(person =>
        person.name === year.mother).born, 0) / relevantChildren.length
  );

  return averageAgeBetweenChildAndMother;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
