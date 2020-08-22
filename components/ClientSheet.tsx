import React from 'react';
import {Text, Linking} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Sheet, SheetProps} from './Sheet';
import {PointOfInterest} from 'data/pois';
import {Avatar} from './Avatar';
import {SatisfactionPill, SatisfactionLevel} from './SatisfactionPill';
import {Tabs} from './Tabs';

type Props = Omit<SheetProps, 'header'> & {
  client: PointOfInterest;
};

const Placeholder = () => <Text>Placholder</Text>;

export const ClientSheet: React.FC<Props> = (props) => {
  const {client} = props;
  return (
    <Sheet visible={props.visible} onClose={props.onClose}>
      <Center>
        <Avatar source={{uri: 'https://i.pravatar.cc/84'}} />
        <Satisfaction level={SatisfactionLevel.satisfied} />
        <Name>{client.title}</Name>
        <Subtitle>Last Contacted: 1 month ago</Subtitle>

        <ContactOptions>
          <ContactOption onPress={() => Linking.openURL(`tel:${client.phone}`)}>
            <Icon name="phone" size={32} color="#3a86ff" />
            <ContactOptionText>Phone</ContactOptionText>
          </ContactOption>
          <ContactOption>
            <Icon name="sms" size={32} color="#3a86ff" />
            <ContactOptionText>Message</ContactOptionText>
          </ContactOption>
          <ContactOption>
            <Icon name="email" size={32} color="#3a86ff" />
            <ContactOptionText>Email</ContactOptionText>
          </ContactOption>
          <ContactOption>
            <Icon name="navigation" size={32} color="#3a86ff" />
            <ContactOptionText>Navigate</ContactOptionText>
          </ContactOption>
        </ContactOptions>

        <TabsContainer>
          <Tabs
            tabs={[
              {title: 'Foo', Component: Placeholder},
              {title: 'Bar', Component: Placeholder},
              {title: 'Baz', Component: Placeholder},
            ]}
          />
        </TabsContainer>
      </Center>
    </Sheet>
  );
};

const Center = styled.View`
  align-items: center;
`;

const Name = styled.Text`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Satisfaction = styled(SatisfactionPill)`
  position: relative;
  top: -16px;
`;

const Subtitle = styled.Text`
  color: gray;
  margin-bottom: 16px;
`;

const ContactOptions = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

const ContactOption = styled.TouchableOpacity`
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 16px 0;
  width: 80px;
  align-items: center;
  justify-content: center;
`;

const ContactOptionText = styled.Text`
  color: #3a86ff;
`;

const TabsContainer = styled.View`
  margin-top: 16px;
`;
