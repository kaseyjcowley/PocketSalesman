import React from 'react';
import styled from 'styled-components/native';

export enum SatisfactionLevel {
  unsatisfied = 1,
  slightlyUnsatisfied = 2,
  neutral = 3,
  slightlySatisfied = 4,
  satisfied = 5,
}

const satisfactionLevelColors: Record<SatisfactionLevel, string> = {
  [SatisfactionLevel.unsatisfied]: '#ff0033',
  [SatisfactionLevel.slightlyUnsatisfied]: '#ff6961',
  [SatisfactionLevel.neutral]: '#ffd500',
  [SatisfactionLevel.slightlySatisfied]: '#77dd77',
  [SatisfactionLevel.satisfied]: '#4caf50',
};

const satisfactionLevelLabels: Record<SatisfactionLevel, string> = {
  [SatisfactionLevel.unsatisfied]: 'Unsatisfied',
  [SatisfactionLevel.slightlyUnsatisfied]: 'Slightly Unsatisfied',
  [SatisfactionLevel.neutral]: 'Neutral',
  [SatisfactionLevel.slightlySatisfied]: 'Slightly Satisfied',
  [SatisfactionLevel.satisfied]: 'Satisfied',
};

type Props = {
  level: SatisfactionLevel;
  style?: Record<string, any>;
};

export const SatisfactionPill: React.FC<Props> = (props) => {
  return (
    <Pill style={props.style} color={satisfactionLevelColors[props.level]}>
      <Label>{satisfactionLevelLabels[props.level]}</Label>
    </Pill>
  );
};

const Pill = styled.View<{color: string}>`
  background-color: ${(props) => props.color};
  padding: 4px 8px;
  border-radius: 16px;
  margin-bottom: 8px;
`;

const Label = styled.Text`
  color: #fff;
`;
