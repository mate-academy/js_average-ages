'use strict';

function calculateMenAverageAge(people, century = people) {
  let calculateCentury = century;

  if (Number(century)) {
    calculateCentury = people
      .filter(peopleCentury => Math.ceil(peopleCentury.died / 100) === century);
  }

  const mans = calculateCentury
    .filter(peopleSex => peopleSex.sex === 'm');
  const calculateManAverageAge = mans
    .reduce((sum, a) => sum + (a.died - a.born), 0) / mans.length;

  return calculateManAverageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = people
    .filter(peopleSex => peopleSex.sex === 'f');

  const calculateWomanAverageAge = woman
    .reduce((sum, a) => sum + (a.died - a.born), 0) / woman.length;

  const withChild = people
    .filter(name => people.find(child => child.mother === name.name));

  const calculateAverageAgeWithChild = withChild
    .reduce((sum, a) => sum + (a.died - a.born), 0) / withChild.length;

  if (withChildren) {
    return calculateAverageAgeWithChild;
  }

  return calculateWomanAverageAge;
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
  }).filter(child => child.mothersAge !== undefined);

  const sons = childesWithMotherBorn.filter(human => human.sex === 'm');

  return onlyWithSon
    ? sons
      .reduce((acc, age) => acc + (age.born - age.mothersAge), 0) / sons.length
    : childesWithMotherBorn
      .reduce((acc, age) => acc + (age.born - age.mothersAge), 0)
        / childesWithMotherBorn.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
