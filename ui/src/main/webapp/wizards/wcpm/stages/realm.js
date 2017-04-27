import React from 'react'
import { connect } from 'react-redux'

import { changeStage } from '../actions'

import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

const RealmType = ({ name='Realm', description='This is a realm type.' }) => (
  <div>
    <div style={{ fontSize: '18px' }}>
      {name}
    </div>
    <div style={{ fontSize: '14px', marginLeft: '10px' }}>
      {description}
    </div>
  </div>
)

const RealmStageView = ({ changeStage }) => (
  <div>
    <Title>
      Choose Realm
    </Title>
    <Description>
      Pick from an available realm.
    </Description>
    <RadioButtonGroup name='realm' defaultSelected='Karaf'>
      <RadioButton
        value='Karaf' label={
        <RealmType
          name='Karaf'
          description="This is a possible realm type. This one is not the same as the the other one,
          and choosing this one will not cause the other one to be chosen. If you don't want to choose
          the other one, than this is the right one for you to choose. If you want for the other one
          not to be chosen, then choose this one now."/>
        }/>
      <RadioButton
        value='IDP' label={
        <RealmType
          name='IDP'
          description="This is another possible realm type. The other one is not the same as this one,
          and choosing the other one will not cause this one to be chosen. In fact, it will specifically
          cause this one to become not chosen. If the other one is the one that you want to not choose,
          then you should choose this one. However, if the other one is one you don't want to chose
          then don't not choose this one right now."/>
      }/>
      <RadioButton
        value='Custom' label={
        <RealmType
          name='Custom'
          description="Don't choose this one."/>
      }/>
    </RadioButtonGroup>
    <ActionGroup>
      <Action
        primary
        label="Next"
        onClick={() => changeStage('authTypesStage')} />
    </ActionGroup>
  </div>
)
export default connect(null, {
  changeStage: changeStage
})(RealmStageView)
