'use strict';

function calculate(workPlace) {
  const totalYear = (sum, person) => {
    return sum + (person.died - person.born);
  };
  const аverage = workPlace.reduce(totalYear, 0);

  return +(аverage / workPlace.length).toFixed(2);
}

function calculateMenAverageAge(people, century) {
  const findMen = (man) => {
    return !century ? (man.sex === 'm') : (
      (man.sex === 'm') && (Math.ceil(man.died / 100) === century));
  };
  const onlyCorrectMen = people.filter(findMen);

  return calculate(onlyCorrectMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const findWomen = (woman) => {
    return !withChildren ? (woman.sex === 'f') : (
      (woman.sex === 'f')
      && people.some((mother) => mother.mother === woman.name));
  };
  const onlyCorrectWomen = people.filter(findWomen);

  return calculate(onlyCorrectWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const findChild = (baby) => {
    return !onlyWithSon ? (
      people.some((mother) =>
        (mother.name === baby.mother))) : (people.some((mother) =>
      ((mother.name === baby.mother) && (baby.sex === 'm'))));
  };
  const onlyCorrectMother = people.filter(findChild);

  const totalYear = (sum, child) => {
    const findMother = people.find((mother) =>
      (child.mother === mother.name));

    return sum + (child.born - findMother.born);
  };
  const coupleAverage = onlyCorrectMother.reduce(totalYear, 0);

  return (coupleAverage / onlyCorrectMother.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
