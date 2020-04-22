# Stack

Exports a (stack)[https://en.wikipedia.org/wiki/Stack_(abstract_data_type)].

## Installation

**bolt or yarn**

```sh
bolt add @deepconcern/stack
```

**npm**

```sh
npm install @deepconcern/stack
```

## Usage

**Instantiation**

```typescript
import { Stack } from '@deepconcern/stack';

// Via constructor function
const stack1 = new Stack<string>('foo', 'bar');

// Via static `create` function
const stack2 = Stack.create<string>('foo', 'bar');
```

**Pushing and popping**

```typescript
import { Stack } from '@deepconcern/stack';

const stack1 = new Stack<string>();

const value = stack1.push('foo').push('bar').pop(); // Should be 'bar'
```
