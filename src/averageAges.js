'use strict';

function getAvarageAge(array) {
  return array.reduce((sum, index) => sum + index) / array.length;
}

function getAge(array) {
  return array.map(person => person.died - person.born);
}

function getChildren(people) {
  return people.filter(child => (
    people.some(person => child.mother === person.name))
  );
}

function getBoys(children) {
  return children.filter(child => child.sex === 'm');
}

function calculateAgeDifference(childrenArray, people) {
  return childrenArray.map(child => child.born - people.find(mother =>
    child.mother === mother.name).born);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menDiedCentury = men.filter(person => (
    Math.ceil(person.died / 100) === century)
  );

  const menAge = (!century)
    ? getAge(men)
    : getAge(menDiedCentury);

  const avarageMenAge = getAvarageAge(menAge);

  return avarageMenAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = people.filter(woman => (
    people.some(person => person.mother === woman.name))
  );

  const womenAge = (!withChildren)
    ? getAge(women)
    : getAge(womenWithChildren);

  const avarageWomenAge = getAvarageAge(womenAge);

  return avarageWomenAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = getChildren(people);

  const boys = getBoys(children);

  const ageDifference = (!onlyWithSon)
    ? calculateAgeDifference(children, people)
    : calculateAgeDifference(boys, people);

  const avarageAgeDifference = getAvarageAge(ageDifference);

  return avarageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
