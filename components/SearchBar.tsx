import React from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends TextInputProps {}

export const SearchBar: React.FC<Props> = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Container isFocused={isFocused}>
      <Icon name="search" size={24} color="lightgray" />
      <TextInput
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
    </Container>
  );
};

const Container = styled.View<{isFocused: boolean}>`
  flex-direction: row;
  padding: 12px;
  border: 2px solid
    ${(props) => (props.isFocused ? 'rgb(10,132,255)' : 'lightgray')};
  border-radius: 8px;
  background-color: white;
`;

const TextInput = styled.TextInput`
  font-size: 18px;
  margin-left: 8px;
`;
