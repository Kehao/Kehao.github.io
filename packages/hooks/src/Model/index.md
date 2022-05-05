---
nav:
  title: 'hooks'
  path: /hooks
group:
  path: /
---

# useModel

方便在 React hook 中实现状态管理和方法调用

### initModel

首先配置好各个 model 中的数据状态和相关的方法，然后传入 initModel 方法，完成初始化。

注：model 中的方法如要更新数据，需要使用 this.set 方法，该方法会在调用 initModel 时插入

TODO：以后的 model 配置可能会换成 class 的写法，并将关键方法的插入修改为继承。

```ts
import { Model } from '@b1/hooks';
const { initModel } = Model;

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
```

### useModel

在 hook 中使用 model，该 model 是全局，不同组件内使用的都是同一个 model，其状态会同步。

```ts
import { Model } from '@b1/hooks';
const { useModel } = Model;

function UserCard() {
  const user = useModel('user');

  return (
    <div>
      <title>{user.name}</title>
      <span>{user.age}</span>
      {user.friendList.map((item: string) => {
        return <div key={item}>{item}</div>;
      })}
      <button onClick={() => user.setAge(user.age + 1)}>Add age</button>
    </div>
  );
}
```

### useLocalModel

用 useLocalModel 引入 model，则该 model 只能在该组件中使用，相当于 useState，只是将状态和更改状态的方法都放在了一个对象里面。

使用方法同 useModel。

useLocalModel 还支持第二个参数，是一个对象，内容为 initState，其中的键值会覆盖默认 model 中的状态数据，作为该 localModel 的初始状态数据

```ts
import { Model } from '@b1/hooks';
const { useLocalModel } = Model;

function UserCard() {
  const user = useLocalModel('user', { name: 'Jack', age: 12 });

  // other code
}
```

### createModelHook

某些情况下，状态数据的管理会有更复杂的情况，比如：

模块 A 下的多个组件会使用同一个 model，按理只需使用 useModel 就可以做到。

但模块 B 下的多个组件也会使用相同的 model，但要求其状态数据与模块 A 下的 model 隔离。

此时可以使用 createModelHook 来根据已有的 model 配置，来创建一个新的 model。

```ts
import { Model } from '@b1/hooks';
const { initModel, useModel, createModelHook } = Model;

const user = {
  name: 'Veta'
  // other props and method
};

type UserModelType = typeof user;

interface IModelConfigMapByName {
  user: UserModelType;
}

const modelMapByName: IModelConfigMapByName = {
  user
};

initModel<IModelConfigMapByName>(modelMapByName);

createModelHook('admin', 'user');
createModelHook('guest', 'user');

// 接下来就可将 admin 和 guest 当作独立的 model 来使用了

function HookComponentA() {
  const admin = useModel('admin');

  // other code
}

function HookComponentB() {
  const guest = useModel('guest');

  // other code
}
```

TODO：在之后的更新中，createModelHook 函数会支持第二个参数传 model 的配置对象，这样就可以使用该函数更灵活的创建 model hook 了，而不需要根据原有的，已存在的 model 来创建。

### getModel

该函数可以在 hook 组件之外获取到 model

```ts
import { Model } from '@b1/hooks';
const { getModel } = Model;

const userModel = getModel('user');

console.log(userModel.name, userModel.age);

userModel.addFriend('Tina');
```

### 其他

初始化后的 model 会拥有 set，addListener，removeListener 三个方法，可以主动在 hook 内外调用，但相关的测试并不完全，如出现问题请联系开发者

```ts
import { Model } from '@b1/hooks';
const { getModel } = Model;

const userModel = getModel('user');

userModel.set({ name: 'Vee' });

function callWhenUserDataChanged(newState) {
  console.log(newState);
}

// 会在 user 中的状态数据变化时调用
userModel.addListener(callWhenUserDataChanged);

// 移除监听，需传入添加监听时的回调
userModel.removeListener(callWhenUserDataChanged);
```
