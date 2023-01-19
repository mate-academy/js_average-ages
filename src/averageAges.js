'use strict';

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(man => man.sex === 'm');

  if (!century) {
    return +(onlyMen.reduce((sum, obj) =>
      (sum + (obj.died - obj.born)), 0)
    / onlyMen.length).toFixed(2);
  }

  if (century) {
    const menAgeOfCentury = onlyMen.filter(man =>
      Math.ceil(man.died / 100) === century);

    return +(menAgeOfCentury.reduce((sum, obj) =>
      (sum + (obj.died - obj.born)), 0)
    / menAgeOfCentury.length).toFixed(2);
  }
}

function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter(woman => woman.sex === 'f');

  if (!withChildren) {
    return +(onlyWomen.reduce((sum, obj) =>
      (sum + (obj.died - obj.born)), 0)
    / onlyWomen.length).toFixed(2);
  }

  if (withChildren) {
    const womenWithChildren = onlyWomen.filter(woman =>
      people.some(({ mother }) => woman.name === mother));

    return +(womenWithChildren.reduce((sum, obj) =>
      (sum + (obj.died - obj.born)), 0)
      / womenWithChildren.length).toFixed(2);
  }
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => (
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  ));

  const calculateAge = children.map(person =>
    (person.born - people.find(mother => mother.name === person.mother).born));

  return calculateAge.reduce((sum, age) =>
    sum + age) / calculateAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
