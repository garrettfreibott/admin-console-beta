import React from 'react'
import { connect } from 'react-redux'
import { nextStage, prevStage } from '../actions'
import Title from 'components/Title'
import Description from 'components/Description'
import Action from 'components/Action'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Flexbox from 'flexbox-react'
import Paper from 'material-ui/Paper'

import WcpmUi from '../../../adminTools/webContextPolicyManager'

const CustomView = ({ nextStage, prevStage }) => (
  <div>
    <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
      <Title>
        Custom Policy
      </Title>
      <Description>
        Below is the Web Context Policy Manager where you can make changes to any specific context or
        add sub-contexts for fine-grained control. Use the profile list to load any profile into the
        WCPM to be edited.
      </Description>
      <Flexbox justifyContent='space-between'>
        <div>
          <div>
            <SelectField floatingLabelText='Profile'>
              <MenuItem value='saml' primaryText='SAML 2.0 Web SSO' />
              <MenuItem value='sso+pki' primaryText='SSO + PKI' />
              <MenuItem value='sso+basic' primaryText='SSO + Basic' />
              <MenuItem value='sso+guest' primaryText='SSO + Guest' />
            </SelectField>
          </div>
          <div>
            <Action
              primary
              label='Apply Profile'
              onClick={() => {}}
            />
          </div>
        </div>
        <div>
          <div>
            <Action
              primary
              label='Finish & Save'
              onClick={() => nextStage('completedStage')} />
          </div>
          <div>
            <Action
              secondary
              label='Back'
              onClick={() => prevStage()} />
          </div>
        </div>
      </Flexbox>
    </Paper>
    <WcpmUi />
  </div>
)
export default connect(null, {
  nextStage,
  prevStage
}
)(CustomView)
