'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => {
    return (
      person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century)
    );
  });

  const totalAge = men.reduce(
    (acc, person) => acc + (person.died - person.born),
    0
  );

  const amount = men.length;
  const result = totalAge / amount;

  return result;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    (person) =>
      person.sex === 'f'
      && (!withChildren || people.some((child) => child.mother === person.name))
  );

  const totalAge = women.reduce(
    (acc, person) => acc + (person.died - person.born),
    0
  );
  const amount = women.length;
  const result = totalAge / amount;

  return result;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const diffs = [];
  const findOnlyWithSon = () => {
    return people.filter((ch) => ch.sex === 'm');
  };

  const newPeople = onlyWithSon ? findOnlyWithSon() : people;

  newPeople.forEach((person) => {
    const mother = people.find((obj) => obj.name === person.mother);

    if (mother) {
      diffs.push(person.born - mother.born);
    }
  });

  const sum = diffs.reduce((acc, val) => acc + val, 0);
  const avgDiff = sum / diffs.length;
  const result = +avgDiff.toFixed(2);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
