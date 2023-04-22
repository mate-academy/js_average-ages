'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(({sex, died}) => century
    ? Math.ceil(died / 100) === century && sex === 'm'
    : sex === 'm'
  );

  const ages = men.reduce((sum, {died, born}) => {
    return sum + died - born;
  }, 0);

  return ages / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(({sex, name}) => withChildren
    ? people.some(child => child.mother === name)
    : sex === 'f'
  );

  const sumWomenAge = women.reduce((sum, {died, born}) => 
    sum + died - born, 0
  );

  return sumWomenAge / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? people.some(child => child.name === person.mother && person.sex === 'm')
    : people.some(child => child.name === person.mother)
  );

  const ageDiff = children.reduce((sum, child) => {
    const mother = people.find(mom => 
      child.mother === mom.name
    );

    const diff = child.born - mother.born;

    return sum + diff
  }, 0);

  return ageDiff / children.length
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
