'use strict';

function calculateMenAverageAge(people, century) {
  const male = people.filter(personSex('m'));
  const filteredMales = century
    ? male.filter(person => Math.ceil(person.died / 100) === century)
    : male;
  const maleAges = filteredMales.map(man => (man.died - man.born));

  return average(maleAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const female = people.filter(personSex('f'));

  const hasChild = function(person) {
    return potentialChild => potentialChild.mother === person.name;
  };

  const mothers = female.filter(woman => people.some(hasChild(woman)));

  const age = woman => woman.died - woman.born;

  const femaleAges = !withChildren ? female.map(age) : mothers.map(age);

  return average(femaleAges);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const kids = people
    .filter(person => people.some(parent => person.mother === parent.name));

  const filteredKids = onlyWithSon
    ? kids.filter(personSex('m'))
    : kids;

  const mothers = filteredKids
    .map(kid => people.find(mother => mother.name === kid.mother));

  const differenceAges = filteredKids
    .map((kid, index) => kid.born - mothers[index].born);

  return average(differenceAges);
}

function average(val) {
  return val.reduce((sum, value) => sum + value, 0) / val.length;
}

function personSex(val) {
  return person => person.sex === val;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
