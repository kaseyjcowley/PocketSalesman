import React from 'react';
import styled from 'styled-components/native';
import {SearchBar} from './SearchBar';
import {PointOfInterest} from 'data/pois';
import {TouchableProps} from 'react-native-svg';

const MAX_VISIBLE_SEARCH_RESULTS = 5;

type Props = {
  clients: readonly PointOfInterest[];
  showClient: (clientId: number) => void;
};

export const ClientSearch: React.FC<Props> = (props) => {
  const [searchResults, setSearchResults] = React.useState<PointOfInterest[]>(
    [],
  );

  const {clients} = props;

  const search = React.useCallback(
    (searchTerm: string) => {
      if (searchTerm.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      setSearchResults(
        clients.filter((client) =>
          client.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    },
    [clients],
  );

  return (
    <Container>
      <SearchBar placeholder="Search" onChangeText={search} />
      <SearchResults>
        {searchResults
          .slice(0, MAX_VISIBLE_SEARCH_RESULTS)
          .map((client, index, {length}) => (
            <SearchResult
              key={`client_${index}`}
              {...client}
              onPress={() => props.showClient(client.id)}
              isFirstResult={index === 0}
              isLastResult={index + 1 === length}
            />
          ))}
      </SearchResults>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 16px;
  margin-top: 16px;
`;

const SearchResults = styled.View`
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 4px 8px #444;
`;

type ClientProps = {
  title: string;
  phone: string;
  onPress: TouchableProps['onPress'];
  isFirstResult: boolean;
  isLastResult: boolean;
};

const SearchResult: React.FC<ClientProps> = (props) => {
  return (
    <ClientRow
      onPress={props.onPress}
      isFirstResult={props.isFirstResult}
      isLastResult={props.isLastResult}>
      <Avatar source={{uri: 'https://i.pravatar.cc/48'}} />
      <RowContent>
        <Name>{props.title}</Name>
      </RowContent>
      <Distance>3.4 mi</Distance>
    </ClientRow>
  );
};

const ClientRow = styled.TouchableOpacity<{
  isFirstResult: boolean;
  isLastResult: boolean;
}>`
  background-color: white;
  padding: 8px 16px;
  ${(props) =>
    props.isFirstResult &&
    `border-top-left-radius: 16px; border-top-right-radius: 16px;`}
  ${(props) =>
    props.isLastResult &&
    `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;`}
  border-bottom-width: 1px;
  border-bottom-color: #c2c2c2;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Avatar = styled.Image`
  height: 48px;
  width: 48px;
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

const Distance = styled.Text`
  color: #c2c2c2;
`;
