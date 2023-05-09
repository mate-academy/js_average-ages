'use strict';

function calculateMenAverageAge(people, century) {
  const males = getPeopleBySex(people, 'm');

  const malesInGivenCentury = century
    ? males.filter((person) => Math.ceil(person.died / 100) === century)
    : null;

  return getAvgAge(malesInGivenCentury || males);
}

function calculateWomenAverageAge(people, withChildren) {
  const womans = getPeopleBySex(people, 'f');

  const mothers = withChildren
    ? womans.filter((woman) =>
      people.find((person) => person.mother === woman.name)
    )
    : null;

  return getAvgAge(mothers || womans);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const kidsWithMothers = people.filter((kid) =>
    people.find((woman) => woman.name === kid.mother)
  );

  if (onlyWithSon) {
    const sons = getPeopleBySex(kidsWithMothers, 'm');
    const sonsAndMothersAgeDiff = calculateAgeDiff(people, sons);

    return sonsAndMothersAgeDiff / sons.length;
  }

  const kidsAndMothersAgeDiff = calculateAgeDiff(people, kidsWithMothers);

  return kidsAndMothersAgeDiff / kidsWithMothers.length;
}

function getAvgAge(people) {
  return (
    people.reduce((prev, p) => prev + (p.died - p.born), 0) / people.length
  );
}

function getPeopleBySex(people, sex) {
  return people.filter((person) => person.sex === sex);
}

function calculateAgeDiff(people, kids) {
  return kids.reduce((x, kid) => {
    const mother = people.find((person) => person.name === kid.mother);

    return x + kid.born - mother.born;
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
