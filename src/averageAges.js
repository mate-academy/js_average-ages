'use strict';

function getAverage(arr) {
  return arr
    .map(user => user.died - user.born)
    .reduce((acc, user) => acc + user) / arr.length;
}

function calculateMenAverageAge(people, century) {
  let mans = people.filter(user => user.sex === 'm');

  if (century !== undefined) {
    mans = mans.filter(man => Math.ceil(man.died / 100) === century);
  }

  return getAverage(mans);
}

function calculateWomenAverageAge(people, withChildren) {
  let gorilas = people.filter(user => user.sex === 'f');

  if (withChildren) {
    gorilas = people
      .filter(user => people.some(little => little.mother === user.name)
      );
  }

  return getAverage(gorilas);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const momAndChild = (onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name)));

  const ages = momAndChild.map(person =>
    person.born - people.find(mother =>
      person.mother === mother.name).born);

  const ageDiff = ages.reduce((a, b) => (a + b)) / ages.length;

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
