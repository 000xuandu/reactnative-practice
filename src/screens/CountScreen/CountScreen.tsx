import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as countActions from '~stores/count/countAction';

const CountScreen = ({
  count,
  todoAdded,
}: {
  count: number;
  todoAdded: Function;
}) => {
  return (
    <View>
      <Text>This is count screen{count}</Text>
      <Button title="Increment" onPress={() => todoAdded(2)} />
    </View>
  );
};

const mapStateToProps = (state: any) => ({count: state.countReducer.number});
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      ...countActions,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CountScreen);
