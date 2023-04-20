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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  return men.reduce((sum, person) => sum + person.died - person.born, 0)
  / men.length;
}

function getAverageAge(people, condition) {
  const filteredPeople = people.filter(condition);

  return filteredPeople.reduce((sum, person) => sum
  + person.died - person.born, 0) / filteredPeople.length;
}

function calculateWomenAverageAge(people, withChildren) {
  return getAverageAge(people, person => withChildren
    ? people.some(human => human.mother === person.name)
    : person.sex === 'f'
  );
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? people.find(woman => woman.name === person.mother) && person.sex === 'm'
    : people.find(woman => woman.name === person.mother));

  return children.map(person =>
    person.born - people.find(mother => person.mother === mother.name).born)
    .reduce((a, b) => a + b, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
