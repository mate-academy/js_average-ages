'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const personMan = people.filter(person => (
    person.sex === 'm' && (century
      ? Math.ceil(person.died / 100) === century
      : true)
  ));
  const menAges = personMan.map(man => man.died - man.born);

  return getAverageAge(menAges, personMan.length);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const personWomen = people.filter(person => (
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  ));

  const womenAges = personWomen.map(woman => woman.died - woman.born);

  return getAverageAge(womenAges, personWomen.length);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => (
    people.find(mother => mother.name === person.mother) && (onlyWithSon
      ? person.sex === 'm'
      : true)
  ));

  const agesDifferences = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  }
  );

  return getAverageAge(agesDifferences, children.length);
}

function getAverageAge(ages, amountOfPeople) {
  return amountOfPeople
    ? ages.reduce((sum, age) => sum + age, 0) / amountOfPeople
    : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
