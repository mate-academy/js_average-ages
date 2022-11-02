'use strict';

function arrayAverage(arr) {
  const fullSum = arr.reduce((sum, a) => sum + a, 0);

  return fullSum / arr.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menOfTheCentury = !century ? men
    : men.filter(person => Math.ceil(person.died / 100) === century);
  const ages = menOfTheCentury.map(man => man.died - man.born);

  return arrayAverage(ages);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const filteredWomen = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;
  const ages = filteredWomen.map(woman => woman.died - woman.born);

  return arrayAverage(ages);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithMother = people.filter(person => person.mother !== null);
  const women = people.filter(woman => woman.sex === 'f');

  const getNameAndBirth = (prev, woman) => {
    return {
      ...prev,
      [woman.name]: woman.born,
    };
  };

  const mothersObj = women.reduce(getNameAndBirth, {});

  const targetAudience = onlyWithSon
    ? peopleWithMother.filter(man => man.sex === 'm')
    : peopleWithMother;

  const ageDiff = targetAudience
    .map(person => person.born - mothersObj[person.mother])
    .filter(element => !isNaN(element));

  return arrayAverage(ageDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
