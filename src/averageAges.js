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
  const men = century
    ? findGender(people, 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
    : findGender(people, 'm');

  return calculateAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? findGender(people, 'f')
      .filter(mother => people.find(child => child.mother === mother.name))
    : findGender(people, 'f');

  return calculateAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenAndChildren = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const calculateDifference = womenAndChildren.map(child =>
    (child.born - people.find(mother => child.mother === mother.name).born));

  return calculateDiff(calculateDifference);
}

const findGender = (people, gender) => {
  return people.filter(person => person.sex === gender);
};

const calculateAverageAge = filteredPeople => {
  return filteredPeople.reduce((sum, person) =>
    person.died - person.born + sum, 0) / filteredPeople.length;
};

const calculateDiff = filteredPeople => {
  return filteredPeople.reduce((a, b) => a + b, 0) / filteredPeople.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
