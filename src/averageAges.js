'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let result = 0;
  let summBirthDate = 0;
  let summDeathDate = 0;
  const man = people.filter(el => (el.sex === 'm'));

  switch (arguments.length) {
    case 0: {
      return 0;
    }

    case 1: {
      const avAge = 0;

      result = man.reduce(
        (accum, curr) => accum + (curr.died - curr.born),
        avAge);

      result /= man.length;

      return result;
    }

    case 2: {
      const centuryMan = man.filter(
        el => (Math.ceil(el.died / 100) === century)
      );

      centuryMan.forEach(e => {
        summBirthDate += e.born;
        summDeathDate += e.died;
      });

      result = (summDeathDate - summBirthDate) / centuryMan.length;

      return result;
    }
  }
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  let result = 0;
  let summBirthDate = 0;
  let summDeathDate = 0;
  let count = 0;
  const woman = people.filter(el => (el.sex === 'f'));

  switch (arguments.length) {
    case 0: {
      return 0;
    }

    case 1: {
      woman.forEach(e => {
        summBirthDate += e.born;
        summDeathDate += e.died;
      });

      result = (summDeathDate - summBirthDate) / woman.length;

      return result;
    }

    case 2: {
      woman.forEach(e => {
        const isMother = people.find(el => e.name === el.mother);

        if (isMother !== undefined) {
          summBirthDate += e.born;
          summDeathDate += e.died;
          count++;
        }
      });
      result = (summDeathDate - summBirthDate) / count;

      return result;
    }
  }
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  let result = 0;
  let averageAgeDiff = 0;
  let count = 0;
  const man = people.filter(el => (el.sex === 'm'));

  // const woman = people.filter(el => (el.sex === 'f'));

  /* woman.forEach(e => {
    const isMother = people.find(el => e.name === el.mother);

    if (isMother !== undefined) {
      mother.push(e);
    }
  }); */

  switch (arguments.length) {
    case 0: {
      return 0;
    }

    case 1: {
      people.forEach(e => {
        const isMother = people.find(el => e.mother === el.name);

        if (isMother !== undefined) {
          averageAgeDiff += (e.born - isMother.born);
          count++;
        }
      });
      result = averageAgeDiff / count;

      return result;
    }

    case 2: {
      man.forEach(e => {
        const isMother = people.find(el => e.mother === el.name);

        if (isMother !== undefined) {
          averageAgeDiff += (e.born - isMother.born);
          count++;
        }
      });
      result = averageAgeDiff / count;

      return result;
    }
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
