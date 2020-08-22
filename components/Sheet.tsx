import React from 'react';
import {Modal, ModalBaseProps} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type SheetProps = {
  visible: ModalBaseProps['visible'];
  onClose: ModalBaseProps['onRequestClose'];
  header?: string;
};

export const Sheet: React.FC<SheetProps> = (props) => {
  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={props.onClose}>
      <Container>
        {props.header && <Header>{props.header}</Header>}
        {props.children}
      </Container>
      <CloseButton onPress={props.onClose}>
        <Icon name="close" size={24} />
      </CloseButton>
    </Modal>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px 0;
`;

const Header = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
`;
