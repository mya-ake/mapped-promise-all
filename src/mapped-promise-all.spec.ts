import { mappedPromiseAll } from './mapped-promise-all';

const task1 = () => 'task1';
const task2 = async () => 'task2';
const task3 = async () => ({
  message: 'task3',
});
const task4 = () => Promise.resolve(true);
const task5 = () => Promise.reject(false);
const task6 = () => {
  throw new Error('task6');
};
const task7 = async () => {
  throw new Error('task7');
};

describe('normal behavior', () => {
  it.each`
    name                                    | task     | expected
    ${'returns a string without a promise'} | ${task1} | ${'task1'}
    ${'returns a string with a promise'}    | ${task2} | ${'task2'}
    ${'returns a object with a promise'}    | ${task3} | ${{ message: 'task3' }}
    ${'returns a boolean with a promise'}   | ${task4} | ${true}
  `('single task, $name', async ({ task, expected }) => {
    const { response1 } = await mappedPromiseAll({
      response1: task(),
    });
    expect(response1).toEqual(expected);
  });

  it('multiple tasks', async () => {
    const {
      response1,
      response2,
      response3,
      response4,
    } = await mappedPromiseAll({
      response1: task1(),
      response2: task2(),
      response3: task3(),
      response4: task4(),
    });
    expect(response1).toBe('task1');
    expect(response2).toBe('task2');
    expect(response3).toEqual({ message: 'task3' });
    expect(response4).toBe(true);
  });
});

describe('error behavior', () => {
  it('Promise.reject', async () => {
    await expect(mappedPromiseAll({ response1: task5() })).rejects.toBe(false);
  });

  it('throw a error without a promise', () => {
    expect(() => mappedPromiseAll({ response1: task6() })).toThrow('task6');
  });

  it('throw a error with a promise', async () => {
    await expect(mappedPromiseAll({ response1: task7() })).rejects.toThrow(
      'task7'
    );
  });
});
