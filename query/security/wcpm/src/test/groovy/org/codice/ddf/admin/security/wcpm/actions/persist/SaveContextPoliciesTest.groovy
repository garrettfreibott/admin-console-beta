/**
 * Copyright (c) Codice Foundation
 * <p>
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 * <p>
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 */
package org.codice.ddf.admin.security.wcpm.actions.persist

import org.codice.ddf.admin.api.action.Action
import org.codice.ddf.admin.api.action.ActionCreator
import org.codice.ddf.admin.api.action.ActionReport
import org.codice.ddf.admin.api.fields.ListField
import org.codice.ddf.admin.common.fields.base.ListFieldImpl
import org.codice.ddf.admin.common.message.DefaultMessages
import org.codice.ddf.admin.configurator.ConfigReader
import org.codice.ddf.admin.configurator.Configurator
import org.codice.ddf.admin.configurator.ConfiguratorFactory
import org.codice.ddf.admin.configurator.OperationReport
import org.codice.ddf.admin.security.common.fields.wcpm.ContextPolicyBin
import org.codice.ddf.admin.security.wcpm.actions.WcpmActionCreator
import org.codice.ddf.security.policy.context.impl.PolicyManager
import spock.lang.Specification

import static org.codice.ddf.admin.security.common.fields.wcpm.services.PolicyManagerServiceProperties.STS_CLAIMS_CONFIGURATION_CONFIG_ID
import static org.codice.ddf.admin.security.common.fields.wcpm.services.PolicyManagerServiceProperties.STS_CLAIMS_PROPS_KEY_CLAIMS
import static org.codice.ddf.admin.security.wcpm.commons.ContextPolicyServiceProperties.*

class SaveContextPoliciesTest extends Specification {
    ActionCreator actionCreator
    ConfiguratorFactory configuratorFactory
    Configurator configurator
    ConfigReader configReader
    OperationReport operationReport
    PolicyManager policyManager
    Action action
    Map<String, Object> stsConfig

    def validClaims = [
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"
    ]

    def validTestData = [
        policies: [
            [
                paths        : ['/'],
                authTypes    : ['basic'],
                realm        : 'karaf',
                claimsMapping: [
                    [
                        claim     : 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role',
                        claimValue: 'system-admin'
                    ]
                ]
            ],
            [
                paths        : ["/test"],
                authTypes    : ['SAML', 'PKI'],
                realm        : 'karaf',
                claimsMapping: [
                    [
                        claim     : "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role",
                        claimValue: "system-admin"
                    ]
                ]
            ]
        ]
    ]

    def setup() {
        operationReport = Mock(OperationReport)
        configuratorFactory = Mock(ConfiguratorFactory)
        configurator = Mock(Configurator)
        configurator.updateConfigFile({ it == POLICY_MANAGER_PID }, _, _) >> {
            args -> policyManager.setPolicies(transformServiceProps(args[1]))
        }

        stsConfig = Mock(Map)
        stsConfig.get(STS_CLAIMS_PROPS_KEY_CLAIMS) >> validClaims
        configReader.getConfig(_) >> stsConfig

        policyManager = new PolicyManager()
        ListField<ContextPolicyBin> contextPolicies = new ListFieldImpl<>(ContextPolicyBin.class);
        contextPolicies.setValue(validTestData.policies)
        policyManager.setPolicies(transformServiceProps(contextPoliciesToPolicyManagerProps(contextPolicies)))

        configurator.commit(_,_) >> operationReport
        configReader.getServiceReference(_) >> policyManager
        configuratorFactory.getConfigurator() >> configurator
        configuratorFactory.getConfigReader() >> configReader
        actionCreator = new WcpmActionCreator(configuratorFactory)
        action = actionCreator.createAction(SaveContextPolices.DEFAULT_FIELD_NAME)
    }

    def 'Should pass with valid update' () {
        setup:
        operationReport.containsFailedResults() >> false

        when:
        action.setArguments(validTestData)
        ActionReport report = action.process()

        then:
        report.messages().size() == 0
    }

    def 'Should report failed persists' () {
        setup:
        operationReport.containsFailedResults() >> true

        when:
        Action action = actionCreator.createAction('saveContextPolicies')
        action.setArguments(validTestData)
        ActionReport report = action.process()

        then:
        report.messages()[0].code == DefaultMessages.FAILED_PERSIST
    }

    def 'Fail if no root context' () {
        def noRootData = [
                policies: [
                        [
                                paths        : ['/test'],
                                authTypes    : ['basic'],
                                realm        : 'karaf',
                                claimsMapping: [
                                        [
                                                claim     : 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role',
                                                claimValue: 'system-admin'
                                        ]
                                ]
                        ]
                ]
        ]
        setup:
        operationReport.containsFailedResults() >> false

        when:
        action.setArguments(noRootData)
        ActionReport report = action.process()

        then:
        report.messages()[0].code == 'NO_ROOT_CONTEXT'
    }

    /*def 'Fail if no authType' () {
        def noRootData = [
                policies: [
                        [
                                paths        : ['/'],
                                authTypes    : [],
                                realm        : 'karaf',
                                claimsMapping: [
                                        [
                                                claim     : 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role',
                                                claimValue: 'system-admin'
                                        ]
                                ]
                        ]
                ]
        ]
        setup:
        operationReport.containsFailedResults() >> false

        when:
        Action action = actionCreator.createAction('saveContextPolicies')
        action.setArguments(noRootData)
        ActionReport report = action.process()

        then:
        report.messages()[0].code == 'NO_ROOT_CONTEXT'
    }*/

    Map<String, Object> transformServiceProps(Map<String, Object> props) {
        Map<String, String[]> transformedProps = new HashMap<>()
        transformedProps.put(REALMS, (String[]) props.get(REALMS))
        transformedProps.put(REQUIRED_ATTRIBUTES, (String[]) props.get(REQUIRED_ATTRIBUTES))
        transformedProps.put(AUTH_TYPES, (String[]) props.get(AUTH_TYPES))
        return transformedProps;
    }
}