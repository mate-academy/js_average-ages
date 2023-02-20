'use strict';

// function to find only men including century specifying

function filterMan(people, sex, century) {
  const man = people.filter(person => person.sex === sex);

  return century
    ? man.filter(person => century === Math.ceil(person.died / 100))
    : man;
}

// function to define average ages of men

function getManAvg(people, sex, century) {
  const filtered = filterMan(people, sex, century);
  const age = calculateAges(filtered);

  return calculateAverage(age);
}

function calculateMenAverageAge(people, century) {
  return getManAvg(people, 'm', century);
}

// function to find only women including children specifying

function filterWomen(people, sex, withChildren) {
  const women = people.filter(person => person.sex === sex);

  return withChildren
    ? women.filter(person => people
      .some(
        ({ mother }) => mother === person.name
      ))
    : women;
}

// function to define average ages of women

function getWomenAvg(people, sex, withChildren) {
  const filtered = filterWomen(people, sex, withChildren);
  const age = calculateAges(filtered);

  return calculateAverage(age);
}

function calculateWomenAverageAge(people, withChildren) {
  return getWomenAvg(people, 'f', withChildren);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(
    person => people.some(
      mother => (
        onlyWithSon
          ? person.sex === 'm' && mother.name === person.mother
          : mother.name === person.mother
      )
    )
  );

  const ageDiff = children.map((person) => {
    const personMother = people.find(mother => mother.name === person.mother);

    return person.born - personMother.born;
  });

  return calculateAverage(ageDiff);
}

// function for calculation ages

function calculateAges(filtered) {
  return filtered.map(person => person.died - person.born);
}

// function for calculating average ages

function calculateAverage(age) {
  const sum = age.reduce((year, acc) => year + acc, 0);

  return Math.round(sum / age.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
