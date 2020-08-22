import React from 'react';
import {Text, Dimensions, Animated, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

const {width} = Dimensions.get('window');

type TabProps = {
  onPress: TouchableOpacityProps['onPress'];
};

const Tab: React.FC<TabProps> = (props) => {
  return (
    <TabButton onPress={props.onPress}>
      <Text>{props.children}</Text>
    </TabButton>
  );
};

type Tab = {
  title: React.ReactNode;
  Component: React.ComponentType<any>;
};

type Props = {
  tabs: Tab[];
};

export const Tabs: React.FC<Props> = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const {Component} = props.tabs[activeTab];

  const borderX = React.useRef(new Animated.Value(0));

  const onPressTab = (idx: number) => {
    Animated.spring(borderX.current, {
      toValue: (width / props.tabs.length) * idx,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(idx);
    });
  };

  return (
    <Container>
      <TabsContainer>
        {props.tabs.map((tab, idx) => (
          <Tab key={tab.title} onPress={() => onPressTab(idx)}>
            {tab.title}
          </Tab>
        ))}
      </TabsContainer>
      <BottomBorder
        style={{transform: [{translateX: borderX.current}]}}
        totalTabs={props.tabs.length}
      />
      <Content>
        <Component />
      </Content>
    </Container>
  );
};

const Container = styled.View``;

const TabsContainer = styled.View`
  flex-direction: row;
  width: ${width}px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 16px;
`;

const Content = styled.View`
  padding: 16px;
`;

const BottomBorder = styled(Animated.View)<{totalTabs: number}>`
  height: 3px;
  width: ${(props) => width / props.totalTabs}px;
  background-color: #3a86ff;
`;
