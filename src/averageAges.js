'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const calculateAge = (person) => {
  return person.died - person.born;
};

const calculateAverage = (peopleArray) => {
  const peopleAges = peopleArray
    .map(person => calculateAge(person));
  const agesSum = peopleAges.reduce((prevPersonAge, currPersonAge) => (
    prevPersonAge + currPersonAge));
  const averageAge = (agesSum / peopleAges.length).toFixed(2);

  return Number(averageAge);
};

function calculateMenAverageAge(people, century) {
  const menFiltered = people.filter(person => person.sex === 'm');
  const getCentury = (man) => {
    return Math.ceil(man.died / 100);
  };
  const menChecked = century
    ? menFiltered.filter(man => getCentury(man) === century)
    : menFiltered;

  return calculateAverage(menChecked);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(person => person.mother);
  const womenChecked = withChildren
    ? people.filter(person => mothers.includes(person.name))
    : people.filter(person => person.sex === 'f');

  return calculateAverage(womenChecked);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person => person.sex === 'f');
  const children = people.filter(person => people
    .find(human => person.mother === human.name));
  const childrenFiltered = onlyWithSon
    ? children.filter(person => person.sex === 'm')
    : children;
  const ageDiffsSum = childrenFiltered.map(person => person.born - women
    .find(woman => person.mother === woman.name).born)
    .reduce((acc, age) => acc + age);

  return Number((ageDiffsSum / childrenFiltered.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
