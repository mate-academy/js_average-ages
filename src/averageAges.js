'use strict';

function calculateMenAverageAge(people, century) {
  if (!century) {
    const result

      = people.map(function(person) {
        if (person.sex === 'm') {
          const ageDiff = person.died - person.born;

          return ageDiff;
        } else {
          return 0;
        }
      });

    let mensAge = result.filter((person) => person > 0);

    mensAge = (mensAge.reduce((prev, current) =>
      prev + current) / mensAge.length);

    return mensAge;
  } else {
    const result = people.map(function(person) {
      if (person.sex === 'm' && Math.ceil(person.died / 100) === century) {
        const ageDiff = person.died - person.born;

        return ageDiff;
      } else {
        return 0;
      }
    });
    let mensAge = result.filter((person) => person > 0);

    mensAge = (mensAge.reduce((prev, current) =>
      prev + current) / mensAge.length);

    return mensAge;
  }
}

function calculateWomenAverageAge(people, withChildren) {
  if (!withChildren) {
    const result

      = people.map(function(person) {
        if (person.sex === 'f') {
          const ageDiff = person.died - person.born;

          return ageDiff;
        } else {
          return 0;
        }
      });

    let womensAge = result.filter((person) => person > 0);

    womensAge = (womensAge.reduce((prev, current) =>
      prev + current) / womensAge.length);

    return womensAge;
  } else {
    const result

      = people.filter((person) => person.sex === 'f');
    const mothers = [];
    const mothersArray = people.map((woman) => woman.mother);

    result.forEach(function(woman) {
      if (mothersArray.includes(woman.name)) {
        mothers.push(woman);
      }
    });

    const mothersAge = mothers.map((mother) => mother.died - mother.born);

    return (mothersAge.reduce(
      (prev, current) => prev + current) / mothersAge.length);
  }
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  if (!onlyWithSon) {
    const result

      = people.filter((person) => person.sex === 'f');
    const mothers = [];
    const women = result.map((woman) => woman);
    const mothersNames = people.map((woman) => woman.mother);

    women.forEach(function(woman) {
      if (mothersNames.includes(woman.name)) {
        mothers.push(woman);
      }
    });

    const childrenArray = [];

    const children = [];

    for (let i = 0; i < people.length; i++) {
      if (mothers.some((mother) => mother.name === people[i].mother)) {
        childrenArray.push(people[i]);

        mothers.some(function(mother) {
          if (mother.name === people[i].mother) {
            const age = people[i].born - mother.born;

            children.push(age);
          }
        });
      }
    }

    const ageDiff = (children.reduce(
      (prev, current) => prev + current)) / children.length;

    return ageDiff;
  } else {
    const result

      = people.filter((person) => person.sex === 'f');
    const mothers = [];
    const women = result.map((woman) => woman);
    const mothersNames = people.map((woman) => woman.mother);

    women.forEach(function(woman) {
      if (mothersNames.includes(woman.name)) {
        mothers.push(woman);
      }
    });

    const childrenArray = [];

    const children = [];

    for (let i = 0; i < people.length; i++) {
      if (mothers.some((mother) => mother.name === people[i].mother)) {
        childrenArray.push(people[i]);

        mothers.some(function(mother) {
          if (mother.name === people[i].mother && people[i].sex === 'm') {
            const age = people[i].born - mother.born;

            children.push(age);
          }
        });
      }
    }

    const ageDiff = (children.reduce(
      (prev, current) => prev + current)) / children.length;

    return ageDiff;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
