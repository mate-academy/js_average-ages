'use strict';

function calculateAverageAge(humans) {
  const averageAges = humans.reduce(
    (sum, { born, died }) => sum + (died - born),
    0);

  return averageAges / humans.length;
}

function lastTaskReduce(humans) {
  return humans
    .reduce((acc, age) => acc + (age.born - age.mothersAge), 0) / humans.length;
}

function calculateMenAverageAge(people, century) {
  const manFilter = (person) => {
    const isMan = person.sex === 'm';
    const calculateCentury = century
      ? Math.ceil(person.died / 100) === century
      : true;

    return calculateCentury && isMan;
  };

  const filterResult = (people.filter(manFilter));

  return calculateAverageAge(filterResult);
}

function calculateWomenAverageAge(people, withChildren) {
  const womanFilter = people
    .filter(person => withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
    );

  return calculateAverageAge(womanFilter);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childesWithMotherBorn = people.map(person => {
    return {
      ...person,
      mothersAge: people
        .filter(mom => person.mother === mom.name)
        .map(user => user.born)
        .find(el => typeof el === 'number'),
    };
  }).filter(child => child.mothersAge);

  const sons = childesWithMotherBorn.filter(human => human.sex === 'm');

  return onlyWithSon
    ? lastTaskReduce(sons)
    : lastTaskReduce(childesWithMotherBorn);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
