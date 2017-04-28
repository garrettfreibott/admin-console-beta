import React from 'react'
import { connect } from 'react-redux'
import { nextStage, prevStage } from '../actions'
import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Paper from 'material-ui/Paper'

const RealmType = ({ name = 'Realm', children }) => (
  <div>
    <div style={{ fontSize: '18px' }}>
      {name}
    </div>
    <div style={{ fontSize: '14px', marginLeft: '10px' }}>
      {children}
    </div>
  </div>
)

const RealmView = ({ nextStage, prevStage }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Title>
      Realm
    </Title>
    <Description>
      Choose which realm you would like to use from the options below.
    </Description>
    <RadioButtonGroup name='profile' defaultSelected='idp'>
      <RadioButton
        value='idp' label={
          <RealmType
            name='IdP'>
            Authenticates users against all configured realms.
        </RealmType>
      } />
      <RadioButton
        value='karaf' label={
          <RealmType
            name='Karaf'>
            Authenticates users against flat files.
        </RealmType>
      } />
      <RadioButton
        value='ldap' label={
          <RealmType
            name='LDAP'>
            Authenticates users against a configured LDAP server or Active Directory for LDAP.
        </RealmType>
      } />
    </RadioButtonGroup>
    <ActionGroup>
      <Action
        secondary
        label='Back'
        onClick={() => prevStage()} />
      <Action
        primary
        label='Next'
        onClick={() => nextStage('summaryStage')} />
    </ActionGroup>
  </Paper>
)
export default connect(null, {
  nextStage,
  prevStage
}
)(RealmView)
