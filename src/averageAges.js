'use strict';
/*
@param {object[]} people
@param {number} century - optional
@return {number}
*/

function calculateMenAverageAge(people, century) {
  const menArray = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAverageAge = menArray.reduce(function(average, man) {
    return average + (man.died - man.born);
  }, 0) / menArray.length;

  return menAverageAge;
}

/*
@param {object[]} people
@param {boolean} withChildren - optional
@return {number}
*/

function calculateWomenAverageAge(people, withChildren) {
  const womenArray = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return womenArray.reduce(function(average, woman) {
    return average + (woman.died - woman.born);
  }, 0) / womenArray.length;
}

/*
@param {object[]} people
@param {boolean} onlyWithSon - optional
@return {number}
*/

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    onlyWithSon
      ? people.some(item => item.name === person.mother && person.sex === 'm')
      : people.some(item => item.name === person.mother));

  const ageDiff = children.map(child => {
    return child.born
      - (people.find(mother => child.mother === mother.name).born);
  }
  );

  return (ageDiff.reduce((womenAverageAge, item) => womenAverageAge + item))
  / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
