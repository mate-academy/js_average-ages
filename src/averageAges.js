'use strict';

// function to find only men including century specifying

function filterMen(people, sex, century) {
  return people.filter(person => {
    return person.sex === sex && century
      ? century === Math.ceil(person.died / 100)
      : person.sex === sex;
  });
}

function calculateMenAverageAge(people, century) {
  const filteredMen = filterMen(people, 'm', century);

  return calculateAverageAges(filteredMen);
}

// function to find only women including children specifying

function filterWomen(people, sex, withChildren) {
  return people.filter(person => {
    return person.sex === sex && withChildren
      ? people.some(
        ({ mother }) => mother === person.name
      )
      : person.sex === sex;
  });
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = filterWomen(people, 'f', withChildren);

  return calculateAverageAges(filteredWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(
    person => people.some(
      mother => {
        return mother.name === person.mother && onlyWithSon
          ? person.sex === 'm'
          : mother.name === person.mother;
      })
  );

  const sum = children.reduce((acc, child) => {
    const mother = people.find(parent => parent.name === child.mother);

    return acc + child.born - mother.born;
  }, 0);

  return Math.round(sum / children.length * 100) / 100;
}

// function for calculation average ages

function calculateAverageAges(filtered) {
  const sum = filtered.reduce((acc, { born, died }) => acc + died - born, 0);

  return Math.round(sum / filtered.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
