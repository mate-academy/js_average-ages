'use strict';

function calculateMenAverageAge(people, century) {
  const callBackFilter = (person) =>
    century > 0
      ? (person.sex === 'm' && Math.ceil(person.died / 100) === century)
      : person.sex === 'm';

  const callBackReduce = (sum, person) => sum + (person.died - person.born);
  const mens = people.filter(callBackFilter);
  const result = mens.reduce(callBackReduce, 0) / mens.length;

  return result;
}

function calculateWomenAverageAge(people, withChildren) {
  const callBackFilter = (person) =>
    withChildren === true
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f';

  const callBackReduce = (sum, person) => sum + (person.died - person.born);
  const womens = people.filter(callBackFilter);
  const result = womens.reduce(callBackReduce, 0) / womens.length;

  return result;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const callBackFilter = (child) =>
    onlyWithSon === true
      ? people.some(mother => child.mother === mother.name
        && child.sex === 'm')
      : people.some(mother => child.mother === mother.name);

  const callBackReduce = (sum, child) =>
    sum + (child.born
      - people.find(mother => mother.name === child.mother).born);

  const children = people.filter(callBackFilter);
  const result = children.reduce(callBackReduce, 0) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
