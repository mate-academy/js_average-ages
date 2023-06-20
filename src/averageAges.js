'use strict';

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(person => person.sex === 'm'
   && (century ? Math.ceil(person.died / 100) === century : true));

  const mensAge = allMen.map(person => person.died - person.born);

  return averageAge(mensAge);
}

function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(person => person.sex === 'f'
  && (withChildren
    ? people.some((child) => child.mother === person.name)
    : true
  ));

  const womensAge = allWomen.map(person => person.died - person.born);

  return averageAge(womensAge);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const hasMother = (child) => {
    return people.some(mother => mother.name === child.mother);
  };

  const children = (onlyWithSon)
    ? people.filter(child => hasMother(child) && child.sex === 'm')
    : people.filter(child => hasMother(child)
    );

  const ageDif = children.map(child => child.born
    - people.find(person => person.name === child.mother).born);

  return averageAge(ageDif);
}

function averageAge(age) {
  return age.reduce((acc, item) => acc + item, 0) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
