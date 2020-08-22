import React from 'react';
import styled from 'styled-components/native';
import {Sheet, SheetProps} from './Sheet';
import {Dimensions} from 'react-native';
import {AtoB} from '../svgs/AtoB';

const {width} = Dimensions.get('window');

type Props = SheetProps & {};

export const NavigationOptionsSheet: React.FC<Props> = (props) => {
  return (
    <Sheet
      visible={props.visible}
      onClose={props.onClose}
      header="Begin Navigation">
      <Row>
        <NavigationOption>
          <AtoB />
          <Label>Shortest Distance</Label>
        </NavigationOption>
        <NavigationOption />
      </Row>
    </Sheet>
  );
};

const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const NavigationOption = styled.TouchableOpacity`
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 16px 0;
  height: 200px;
  width: ${width / 2 - 16 * 3}px;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  color: blue;
`;
