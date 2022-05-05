import { renderHook, act } from '@testing-library/react-hooks';
import Model from '../index';

const { initModel, useModel, useLocalModel, createModelHook, getModel } = Model;

const user = {
  name: 'Veta',
  age: 18,
  friendList: ['Jack', 'Tom', 'Andy'],
  setAge(age: number) {
    this.set({ age });
  },
  addFriend(name: string) {
    if (this.friendList.includes(name)) {
      return;
    }
    this.set({ friendList: [...this.friendList, name] });
  }
};

type UserModelType = typeof user;

interface IModelConfigMapByName {
  user: UserModelType;
}

const modelMapByName: IModelConfigMapByName = {
  user
};

initModel<IModelConfigMapByName>(modelMapByName);

test('test useModel, useLocalModel, createModelHook and getModel', () => {
  const { result: user1 } = renderHook(() => useModel('user'));
  const { result: user2 } = renderHook(() => useModel('user'));
  const { result: localUser1 } = renderHook(() => useLocalModel('user'));
  const { result: localUser2 } = renderHook(() => useLocalModel('user'));
  const userModel = getModel('user'); // 获取全局的 user model

  createModelHook('person', 'user');

  const { result: person1 } = renderHook(() => useModel('person'));
  const { result: person2 } = renderHook(() => useModel('person'));
  const { result: localAdmin1 } = renderHook(() => useLocalModel('person'));
  const { result: localAdmin2 } = renderHook(() => useLocalModel('person'));
  const personModel = getModel('person'); // 获取全局的 person model

  function checkInitState(model: any) {
    expect(model.name).toBe(user.name);
    expect(model.age).toBe(user.age);
    expect(model.friendList).toEqual(user.friendList);
  }

  // 测试初始状态
  checkInitState(user1.current);
  checkInitState(user2.current);
  checkInitState(localUser1.current);
  checkInitState(localUser2.current);
  checkInitState(person1.current);
  checkInitState(person2.current);
  checkInitState(localAdmin1.current);
  checkInitState(localAdmin2.current);

  // 测试基本类型的状态变更
  act(() => user1.current.setAge(20));
  act(() => localUser1.current.setAge(21));
  act(() => person1.current.setAge(22));
  act(() => localAdmin1.current.setAge(23));

  expect(user1.current.age).toBe(20);
  expect(user2.current.age).toBe(20);
  expect(userModel.age).toBe(20);
  expect(localUser1.current.age).toBe(21);
  expect(localUser2.current.age).toBe(18);
  expect(person1.current.age).toBe(22);
  expect(person2.current.age).toBe(22);
  expect(personModel.age).toBe(22);
  expect(localAdmin1.current.age).toBe(23);
  expect(localAdmin2.current.age).toBe(18);

  // 测试引用数据类型的状态变更
  act(() => user1.current.addFriend('Tina'));
  act(() => localUser1.current.addFriend('Sia'));
  act(() => person1.current.addFriend('John'));
  act(() => localAdmin1.current.addFriend('Anna'));

  expect(user1.current.friendList).toEqual([...user.friendList, 'Tina']);
  expect(user2.current.friendList).toEqual([...user.friendList, 'Tina']);
  expect(userModel.friendList).toEqual([...user.friendList, 'Tina']);
  expect(localUser1.current.friendList).toEqual([...user.friendList, 'Sia']);
  expect(localUser2.current.friendList).toEqual(user.friendList);
  expect(person1.current.friendList).toEqual([...user.friendList, 'John']);
  expect(person2.current.friendList).toEqual([...user.friendList, 'John']);
  expect(personModel.friendList).toEqual([...user.friendList, 'John']);
  expect(localAdmin1.current.friendList).toEqual([...user.friendList, 'Anna']);
  expect(localAdmin2.current.friendList).toEqual(user.friendList);

  // 测试非 hook 下的状态变更
  act(() => userModel.set({ name: 'Vee' }));
  act(() => personModel.set({ name: 'Lee' }));

  expect(user1.current.name).toBe('Vee');
  expect(user2.current.name).toBe('Vee');
  expect(userModel.name).toBe('Vee');
  expect(localUser1.current.name).toBe('Veta');
  expect(localUser2.current.name).toBe('Veta');
  expect(person1.current.name).toBe('Lee');
  expect(person2.current.name).toBe('Lee');
  expect(personModel.name).toBe('Lee');
  expect(localAdmin1.current.name).toBe('Veta');
  expect(localAdmin2.current.name).toBe('Veta');

  // 测试 useLocalModel 的自定义初始状态功能
  const { result: customUser } = renderHook(() => useLocalModel('user', { age: 10, friendList: ['A', 'B', 'C'] }));
  expect(customUser.current.age).toBe(10);
  expect(customUser.current.friendList).toEqual(['A', 'B', 'C']);
});
