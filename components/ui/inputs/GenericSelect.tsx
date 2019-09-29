import * as React from 'react';

interface MyTestProps<T> {
  keys: T[];
  labels: string[];
  selectHandler: (selectedVal: T) => void;
};
class MyTest<T> extends React.Component<MyTestProps<T>, {}> {
  render() {
    return (
      <ul>
        { this.props.keys.map((val, i) =>
            <li onClick={() => this.props.selectHandler(val)}>{this.props.labels[i]}</li>
        ) }
      </ul>
    );
  }
};

export default MyTest;
