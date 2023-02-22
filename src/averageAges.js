'use strict';

// function to find only men including century specifying

function filterMen(people, century) {
  return people.filter(person => {
    const isMan = person.sex === 'm';
    const isSameCentury = century
      ? century === Math.ceil(person.died / 100)
      : isMan;

    return isMan && isSameCentury;
  });
}

function calculateMenAverageAge(people, century) {
  const filteredMen = filterMen(people, century);

  return calculateAverageAges(filteredMen);
}

// function to find only women including children specifying

function filterWomen(people, withChildren) {
  return people.filter(person => {
    const isWoman = person.sex === 'f';
    const hasChildren = withChildren
      ? people.some(
        ({ mother }) => mother === person.name
      )
      : isWoman;

    return isWoman && hasChildren;
  });
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = filterWomen(people, withChildren);

  return calculateAverageAges(filteredWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(
    person => people.some(
      mother => {
        const isMother = mother.name === person.mother;
        const hasOnlySon = onlyWithSon
          ? person.sex === 'm'
          : isMother;

        return isMother && hasOnlySon;
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
  return filtered.reduce((acc, { born, died }) => acc + died - born
    , 0) / (filtered.length || 1);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
