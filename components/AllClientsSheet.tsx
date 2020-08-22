import React from 'react';
import {Modal, Text} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from './SearchBar';
import {pointsOfInterest} from '../data/pois';
import {Sheet} from './Sheet';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AllClientsSheet: React.FC<Props> = (props) => {
  return (
    <Sheet visible={props.visible} onClose={props.onClose} header="All Clients">
      <Container>
        <TopBar>
          <SearchBar placeholder="Search" />
        </TopBar>
        <ClientListContainer contentContainerStyle={{flexGrow: 1}}>
          {pointsOfInterest.map((poi, index) => (
            <Client key={index} {...poi} />
          ))}
        </ClientListContainer>
      </Container>
      <CloseButton onPress={props.onClose}>
        <Icon name="close" size={24} />
      </CloseButton>
    </Sheet>
  );
};

type ClientProps = {
  title: string;
  phone: string;
};

const Client: React.FC<ClientProps> = (props) => {
  return (
    <ClientRow>
      <Avatar source={{uri: 'https://i.pravatar.cc/64'}} />
      <RowContent>
        <Name>{props.title}</Name>
        <Scoring>
          <ScoringText>Satisfied</ScoringText>
        </Scoring>
        <Phone>
          <Icon name="phone" size={16} />
          <Text style={{marginLeft: 4}}>{props.phone}</Text>
        </Phone>
      </RowContent>
      <Distance>3.4 mi</Distance>
    </ClientRow>
  );
};

const ClientRow = styled.View`
  background-color: white;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 16px;
  box-shadow: 2px 2px 4px #ccc;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Avatar = styled.Image`
  height: 64px;
  width: 64px;
  border-radius: 100px;
  margin-right: 16px;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const RowContent = styled.View`
  flex: 1;
`;

const Scoring = styled.View`
  background-color: #4caf50;
  padding: 4px 8px;
  border-radius: 16px;
  margin-bottom: 8px;
  align-self: flex-start;
`;

const ScoringText = styled.Text`
  color: white;
`;

const Phone = styled.View`
  flex-direction: row;
`;

const Distance = styled.Text`
  color: #c2c2c2;
`;

const Container = styled.View`
  flex: 1;
`;

const TopBar = styled.View`
  padding: 0 16px;
  flex-grow: 1;
  margin-bottom: 16px;
`;

const ClientListContainer = styled.ScrollView`
  flex-grow: 1;
  background-color: #f2f2f2;
  padding: 16px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
`;
